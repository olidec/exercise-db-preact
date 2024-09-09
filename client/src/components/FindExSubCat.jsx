import { askServer } from "../utils/connector";
import { cat, loadCat, subcat } from "../signals/categories.js";
import { useContext, useState, useEffect } from "preact/hooks";
import { createContext } from "preact";
import { SearchContext } from "../signals/exercise.jsx";
import SearchKorb from "./SearchKorb.jsx";
import Modal from "./Modal.jsx";
import AufgDetails from "./AufgDetails.jsx";

export const FindExContext = createContext();

export default function FindExSubCat({ children }) {
  const { showNotification, setCartSearch, searchText, categor } =
    useContext(SearchContext);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);

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
    const excat = res.response;

    if (res.status != 200 || excat.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setCartSearch([]);
      setSelectedCategory("");
      searchText.value = "";
      categor.value[0] = categoryName;
      categor.value[1] = "";
    } else {
      setCartSearch(excat);
      searchText.value = "";
      categor.value[0] = categoryName;
      categor.value[1] = "";
    }
  };

  const onSubcategoryClick = async (subcategoryName) => {
    setSelectedSubcategory(subcategoryName);

    const route = `/api/ex?cat=${selectedCategory}&subcat=${subcategoryName}`;
    const res = await askServer(route, "GET");
    const exsubcat = res.response;

    if (res.status != 200 || exsubcat.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      setCartSearch([]);
      searchText.value = "";
      categor.value[1] = subcategoryName;
    } else {
      setCartSearch(exsubcat);
      searchText.value = "";
      categor.value[1] = subcategoryName;
    }
  };

  const resetSelection = () => {
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  const openModal = (id) => {
    setSelectedExercise(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <FindExContext.Provider value={{ resetSelection }}>
      {children}
      <div className="main-container">
        <div className="categories-column">
          <h2>Kategorien/Subkategorien</h2>
          <ul className="categories-list">
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
                  <ul className="subcategories-list">
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
        <div className="content-column">
          <SearchKorb openModal={openModal} />
        </div>
        <Modal isOpen={modalOpen} onClose={closeModal}>
          {selectedExercise && <AufgDetails id={selectedExercise} />}
        </Modal>
      </div>
    </FindExContext.Provider>
  );
}
