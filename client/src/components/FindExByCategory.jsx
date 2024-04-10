import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { cat, loadCat } from "../signals/categories.js";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { useState, useEffect } from "preact/hooks";
export default function FindExBySearchText() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const searchCategory = signal("");
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    cartSearch.value = exerciseList;
    console.log(exerciseList);
  }, [exerciseList]);

  useEffect(() => {
    loadCat();
  }, []);

  console.log(cat.value);

  const element = document.getElementById("exid-4");
  if (element) {
    cat.value.map((c) => {
      const el = document.createElement("option");
      el.innerHTML = c.name;
      el.value = c.name;
      element.appendChild(el);
    });
  }
  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    searchCategory.value = value;
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?cat=${searchCategory.value}`;
    // console.log(route)
    const res = await askServer(route, "GET");
    // console.log(res)
    if (res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      return;
    } else {
      setExerciseList(res);
      window.location.href = "/exercise-db-preact/search";
    }
  };

  return (
    <>
      <form className="pure-form pure-form-aligned" onSubmit={(e) => getEx(e)}>
        <div className="pure-control-group">
          <label htmlFor="exid-4">Search Exercises by Category</label>
          <select id="exid-4" onChange={onChange}>
            <option value=""> -- Kategorie auswählen -- </option>
          </select>
          <button className="pure-button">Find Category</button>
        </div>
      </form>
    </>
  );
}
