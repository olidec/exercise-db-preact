import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import DeleteButton from "./DeleteButton";

export default function FindExBySearchText() {
  const searchText = signal("");
  const [exerciseList, setExerciseList] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    searchText.value = value;
    // unccoment line below to update view immediately on change
    // getEx(e)
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?search=${searchText.value}`;
    const res = await askServer(route, "GET");
    if (res.errors || res.length === 0) {
      alert("No exercises match the search term.");
      return;
    } else {
      setExerciseList(res);
    }

    exsearchlist.innerHTML = "";
    exerciseList.value.map((ex, key) => {
      const el = document.createElement("tr");
      el.setAttribute("key", key);
      el.innerHTML = `<td>${ex.id}</td><td>${ex.content}</td><td>${ex.solution}</td>`;
      exsearchlist.appendChild(el);
      MathJax.typeset([el]);
    });
  };

  const handleDelete = (index) => {
    const updatedList = [...exerciseList];
    updatedList.splice(index, 1);
    setExerciseList(updatedList);
    MathJax.typeset();
  };
  useEffect(() => {
    MathJax.typeset();
  }, [exerciseList]);

  return (
    <>
      <form onSubmit={(e) => getEx(e)}>
        <label htmlFor="exid-3">Search Exercises for contents</label>
        <input id="exid-3" value={searchText} onChange={onChange} />
        <button className="pure-button">Find Exercises containing</button>
      </form>
      <hr />
      <div>
        <table id="exfromtext" className="pure-table pure-table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Content</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody id="exsearchlist">
            {exerciseList.map((ex, index) => (
              <tr key={index}>
                <td>{ex.id}</td>
                <td>{ex.content}</td>
                <td>{ex.solution}</td>
                <td>
                  <DeleteButton onDelete={() => handleDelete(index)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
