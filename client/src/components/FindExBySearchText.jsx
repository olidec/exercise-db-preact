import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
export default function FindExBySearchText() {
  const { cartSearch } = useContext(SearchContext);
  const [exerciseList, setExerciseList] = useState([]);
  const searchText = signal("");

  // // Annahme, dass cartSearch ein signal aus @preact/signals ist
  useEffect(() => {
    cartSearch.value = exerciseList;
    // Aktualisiert cartSearch, wenn exerciseList sich ändert
  }, [exerciseList]); // Abhängigkeiten, die den Effekt auslösen

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
      window.location.href = "/exercise-db-preact/search";
    }
  };

  return (
    <>
      <form className="pure-form pure-form-aligned" onSubmit={(e) => getEx(e)}>
        <div className="pure-control-group">
        <label htmlFor="exid-3">Search Exercises for contents</label>
        <input id="exid-3" value={searchText} onChange={onChange} />
        <button className="pure-button">Find Exercises containing</button>
        </div>
      </form>
    </>
  );
}
