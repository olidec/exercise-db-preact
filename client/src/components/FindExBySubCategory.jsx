import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { subcat, loadSubCat } from "../signals/categories.js";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { useState, useEffect } from "preact/hooks";
export default function FindExBySearchText() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const searchSubCategory = signal("");
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    cartSearch.value = exerciseList;
  }, [exerciseList]);

  useEffect(() => {
    loadSubCat();
  }, []);

  console.log(subcat.value);

  const element = document.getElementById("exSubCat");
  if (element) {
    subcat.value.map((c) => {
      const el = document.createElement("option");
      el.innerHTML = c.name;
      el.value = c.name;
      element.appendChild(el);
    });
  }
  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    searchSubCategory.value = value;
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?subcat=${searchSubCategory.value}`;

    const res = await askServer(route, "GET");

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
          <label htmlFor="exSubCat">Search Exercises by Sub-Category</label>
          <select id="exSubCat" onChange={onChange}>
            <option value=""> -- SubKategorie auswählen -- </option>
          </select>
          <button className="pure-button">Find Sub-Category</button>
        </div>
      </form>
    </>
  );
}
