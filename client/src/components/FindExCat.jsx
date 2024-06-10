import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { cat, loadCat } from "../signals/categories.js";
import { useContext, useState, useEffect } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import SearchKorb from "./SearchKorb.jsx";

export default function FindExByCategory() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const searchCategory = signal("");
  const [exerciseList, setExerciseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const onCategoryClick = async (categoryName) => {
    searchCategory.value = categoryName;
    setSelectedCategory(categoryName); // Setze die ausgewählte Kategorie
    const route = `/api/ex?cat=${searchCategory.value}`;

    const res = await askServer(route, "GET");

    if (res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      return;
    } else {
      setExerciseList(res);
    }
  };

  return (
    <div className="main-container" style={{ display: "flex" }}>
      <div
        className="categories-column"
        style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <h3>Kategorien</h3>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`category-item ${selectedCategory === category.name ? "selected" : ""}`}
              onClick={() => onCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="content-column" style={{ width: "80%", padding: "10px" }}>
        <h1>Suchresultate ({exerciseList.length})</h1>
        <hr />
        <SearchKorb exercises={cartSearch.value} />
      </div>
    </div>
  );
}
