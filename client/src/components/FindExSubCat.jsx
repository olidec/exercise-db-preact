import { askServer } from "../utils/connector";
import { cat, loadCat } from "../signals/categories.js";
import { useContext, useState, useEffect } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import SearchKorb from "./SearchKorb.jsx";

export default function FindExByCategory() {
  const { cartSearch, showNotification } = useContext(SearchContext);

  const [exerciseList, setExerciseList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

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

  const onCategoryClick = async (categoryName) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(""); // Reset subcategory when selecting a new category

    const route = `/api/ex?cat=${categoryName}`;

    const res = await askServer(route, "GET");

    if (res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setExerciseList([]);
    } else {
      setExerciseList(res);
    }
  };

  const onSubcategoryClick = async (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);

    const route = `/api/ex?cat=${selectedCategory}&subcat=${subcategoryName}`;

    const res = await askServer(route, "GET");

    if (res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setExerciseList([]);
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
            <li key={category.id}>
              <div
                className={`category-item ${selectedCategory === category.name ? "selected" : ""}`}
                onClick={() => onCategoryClick(category.name)}
                style={{
                  cursor: "pointer",
                  padding: "10px 15px",
                  width: "fit-content",
                  marginBottom: "10px",
                  fontSize:
                    selectedCategory === category.name ? "1em" : "0.9em",
                }}
              >
                {category.name}
              </div>
              {selectedCategory === category.name && (
                <ul style={{ listStyleType: "none", paddingLeft: "25px" }}>
                  {subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <div
                        className={`subcategory-item ${selectedSubcategory === subcategory.name ? "selected" : ""}`}
                        onClick={() => onSubcategoryClick(subcategory.name)}
                        style={{
                          cursor: "pointer",
                          padding: "5px 15px",
                          width: "fit-content",
                          marginBottom: "5px",
                          paddingLeft: "25px",
                          fontSize: "1.1em",
                        }}
                      >
                        {subcategory.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="content-column" style={{ width: "80%", padding: "10px" }}>
        <h1>Suchresultate ({exerciseList.length})</h1>
        <hr />
        <SearchKorb />
      </div>
    </div>
  );
}
