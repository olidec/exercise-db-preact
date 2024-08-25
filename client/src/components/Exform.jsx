import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { cat, loadCat } from "../signals/categories.js";

export default function ExForm() {
  const { showNotification } = useContext(SearchContext);
  const [ex, setEx] = useState({
    content: "",
    solution: "",
    language: "",
    difficulty: "",
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Lade die Kategorien beim Initialisieren der Komponente
    loadCat().then(() => {
      setCategories(cat.value);
    });
  }, []);

  const userId = JSON.parse(localStorage.getItem("user"));

  // Effekt, der die ausgewählte Unterkategorie zurücksetzt, wenn die Kategorie sich ändert
  useEffect(() => {
    if (selectedCategory) {
      const categoryObject = categories.find(
        (c) => c.name === selectedCategory
      );
      setSubcategories(categoryObject ? categoryObject.subcategories : []);
      setSelectedSubcategory("");
    }
  }, [selectedCategory, categories]);

  const addNewEx = async (e) => {
    e.preventDefault();

    const categoryObject = categories.find((c) => c.name === selectedCategory);
    const subcategoryObject = subcategories.find(
      (sub) => sub.name === selectedSubcategory
    );

    const categoryId = categoryObject ? categoryObject.id : null;
    const subcategoryId = subcategoryObject ? subcategoryObject.id : null;

    if (!categoryId || !subcategoryId) {
      console.error("Kategorie oder Unterkategorie nicht gefunden");
      return;
    }

    const exWithCategory = {
      ...ex,
      difficulty: parseInt(ex.difficulty),
      categories: { id: categoryId },
      subcategories: { id: subcategoryId },
      author: { id: userId.id },
    };

    const res = await askServer("/api/ex", "POST", exWithCategory);
    console.log(res);

    if (res.err) {
      console.log("Error: ", res.err);
    } else {
      setEx({
        content: "",
        solution: "",
        language: "",
        difficulty: "",
      });

      setSelectedCategory(""); // Zurücksetzen der Kategorie
      setSelectedSubcategory(""); // Zurücksetzen der Unterkategorie
      showNotification("Exercise added successfully", "green");
    }
  };

  const updateExHandler = (e) => {
    const { name, value } = e.target;
    setEx((prevEx) => ({
      ...prevEx,
      [name]: value,
    }));
  };

  const onChangeCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onChangeSubcategory = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  return (
    <>
      <div className="pure-g">
        <form
          className="pure-form pure-form-aligned pure-u-4-5"
          onSubmit={(e) => addNewEx(e)}
        >
          <legend>Füge deine eigene Aufgabe hinzu</legend>
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="language"> Sprache: </label>
              <select
                required
                id="language"
                name="language"
                value={ex.language}
                onChange={updateExHandler}
              >
                <option value="" disabled selected>
                  -- Bitte wählen --
                </option>
                <option value={"Deutsch"}> Deutsch </option>
                <option value={"English"}> English </option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="difficulty"> Schwierigkeitsgrad: </label>
              <select
                required
                id="difficulty"
                name="difficulty"
                value={ex.difficulty}
                onChange={updateExHandler}
              >
                <option value="" disabled selected>
                  -- Bitte wählen --
                </option>
                <option value={1}> Leicht </option>
                <option value={2}> Mittel </option>
                <option value={3}> Schwer </option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="category">Kategorie: </label>
              <select
                required
                id="category"
                name="category"
                value={selectedCategory}
                onChange={onChangeCategory}
              >
                <option value="" disabled>
                  -- Bitte wähle eine Kategorie --
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="subcategory">Unterkategorie: </label>
              <select
                required
                id="subcategory"
                name="subcategory"
                value={selectedSubcategory}
                onChange={onChangeSubcategory}
              >
                <option value="" disabled>
                  -- Wähle bitte eine Unterkategorie --
                </option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="content">Aufgabentext: </label>
              <textarea
                required
                rows="10"
                cols="100"
                name="content"
                id="content"
                value={ex.content}
                onChange={updateExHandler}
                placeholder="Schreibe deine Aufgabe im LaTeX Format"
              />
            </div>
            <div className="pure-control-group">
              <label htmlFor="solution">Lösung: </label>
              <textarea
                required
                rows="5"
                cols="100"
                name="solution"
                id="solution"
                value={ex.solution}
                onChange={updateExHandler}
                placeholder="Schreibe deine Lösung im LaTeX Format"
              />
            </div>
            <div className="pure-controls">
              <button type="submit" className="pure-button pure-button-primary">
                Add new exercise
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
