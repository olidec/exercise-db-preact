import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { cat, loadCat } from "../signals/categories.js";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { useState, useEffect } from "preact/hooks";

export default function FindExByCategory() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const searchCategory = signal("");
  const [exerciseList, setExerciseList] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    cartSearch.value = exerciseList;
  }, [exerciseList]);

  useEffect(() => {
    const fetchCategories = async () => {
      await loadCat();
      setCategories(cat.value);
    };
    fetchCategories();
  }, []);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    searchCategory.value = value;
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?cat=${searchCategory.value}`;

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
          <label htmlFor="exCat">Search Exercises by Category</label>
          <select id="exCat" onChange={onChange}>
            <option value=""> -- Kategorie auswählen -- </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button className="pure-button">Find Category</button>
        </div>
      </form>
    </>
  );
}
