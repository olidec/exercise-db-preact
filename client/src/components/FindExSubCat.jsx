import { askServer } from "../utils/connector";
import { cat, loadCat } from "../signals/categories.js";
import { useContext, useState, useEffect } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import SearchKorb from "./SearchKorb.jsx";

export default function FindExSubCat() {
  const { showNotification, setCartSearch, searchText, categor } =
    useContext(SearchContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

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
    } else {
      setCartSearch(res);
      searchText.value = "";
      categor.value[0] = categoryName;
      categor.value[1] = "";
    }
  };

  const onSubcategoryClick = async (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);

    const route = `/api/ex?cat=${selectedCategory}&subcat=${subcategoryName}`;

    const res = await askServer(route, "GET");

    if (res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setSelectedSubcategory("");
    } else {
      setCartSearch(res);
      searchText.value = "";
      categor.value[1] = subcategoryName;
    }
  };

  return (
    <div className="main-container" style={{ display: "flex" }}>
      <div
        className="categories-column"
        style={{ width: "20%", padding: "10px", borderRight: "1px solid #ccc" }}
      >
        <h2>Kategorien/Subkategorien</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {categories.map((category) => (
            <li key={category.id}>
              <div
                className={`category-item ${
                  selectedCategory === category.name && selectedSubcategory
                    ? "underline"
                    : selectedCategory === category.name
                      ? "selected"
                      : ""
                }`}
                onClick={() => onCategoryClick(category.name)}
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
        <SearchKorb
          selectedCategory={selectedCategory}
          selectedSubcategory={selectedSubcategory}
        />
      </div>
    </div>
  );
}
