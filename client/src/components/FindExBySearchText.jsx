import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";
import AddCard from "./AddCard";
import CardList from "./CardList";

export default function FindExBySearchText() {
  const [exerciseList, setExerciseList] = useState([]);
  const searchText = signal("");

  const [cartItems, setcartItems] = useState([]);
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

      <div>
        <CardList
          cards={exerciseList.map((ex, index) => (
            <AddCard
              key={ex.id}
              id={ex.id}
              content={ex.content}
              summary={ex.summary}
            />
          ))}
        />
      </div>
    </>
  );
}
