import { askServer } from "../utils/connector";
import { cat, loadCat } from "../signals/categories.js";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { useState, useEffect } from "preact/hooks";

export default function FindExBySubCategory() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const [searchCategory, setSearchCategory] = useState("");
  const [searchSubCategory, setSearchSubCategory] = useState("");
  const [exerciseList, setExerciseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

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

  useEffect(() => {
    if (selectedCategory) {
      const category = categories.find((c) => c.name === selectedCategory);
      setSubcategories(category ? category.subcategories : []);
    } else {
      setSubcategories([]);
    }
  }, [selectedCategory, categories]);

  const onChangeCategory = (e) => {
    const { value } = e.target;
    setSelectedCategory(value);
    setSearchCategory(value);
    setSelectedSubcategory("");
    setSearchSubCategory("");
  };

  const onChangeSubcategory = (e) => {
    const { value } = e.target;
    setSelectedSubcategory(value);
    setSearchSubCategory(value);
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?cat=${searchCategory}&subcat=${searchSubCategory}`;

    console.log(searchCategory, searchSubCategory);
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
      <form className="pure-form pure-form-aligned" onSubmit={getEx}>
        <div className="pure-control-group">
          <label htmlFor="exCat">Search Exercises by Category</label>
          <select
            id="exCat"
            onChange={onChangeCategory}
            value={selectedCategory}
          >
            <option value=""> -- Kategorie auswählen -- </option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="pure-control-group">
          <label htmlFor="exSubCat">Search Exercises by Subcategory</label>
          <select
            id="exSubCat"
            onChange={onChangeSubcategory}
            value={selectedSubcategory}
          >
            <option value=""> -- Unterkategorie auswählen -- </option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>

          <button className="pure-button">Find Category</button>
        </div>
      </form>
    </>
  );
}
