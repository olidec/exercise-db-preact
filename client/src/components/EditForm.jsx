import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import { cat, loadCat } from "../signals/categories.js";
export default function EditForm({ id }) {
  const { showNotification } = useContext(SearchContext);

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubCategoryName] = useState("");

  const [ex, setEx] = useState({
    content: "",
    solution: "",
    language: "Deutsch",
    difficulty: 1,
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    // Lade die Kategorien beim Initialisieren der Komponente
    loadCat().then(() => {
      setCategories(cat.value);
    });
  }, [categoryName]);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    if (selectedCategory) {
      const categoryObject = categories.find(
        (c) => c.name === selectedCategory
      );
      setSubcategories(categoryObject ? categoryObject.subcategories : []);
      setSelectedSubcategory("");
    }
  }, [selectedCategory]);

  const updateEx = async (e) => {
    if (
      !ex.id ||
      !ex.content ||
      !ex.solution ||
      !ex.language ||
      !ex.difficulty
    ) {
      console.log("Validation error: Some required fields are missing");
      return;
    }

    e.preventDefault();

    const categoryObject = cat.value.find((c) => c.name === selectedCategory);
    const subcategoryObject = selectedSubcategory
      ? categoryObject.subcategories.find(
          (sub) => sub.name === selectedSubcategory
        )
      : null;

    const categoryId = categoryObject ? categoryObject.id : null;
    const subcategoryId = subcategoryObject ? subcategoryObject.id : null;

    const exWithCategory = {
      ...ex,
      difficulty: parseInt(ex.difficulty),
      categories: { id: categoryId },
      subcategories: { id: subcategoryId },
    };
    try {
      const res = await askServer("/api/ex", "PUT", exWithCategory);
      if (res.status === 401) {
        console.log(res.err);
        showNotification("Fehler beim Aktualisieren", "red");
        // setTimeout(() => {
        //   window.location.href = `/exercise-db-preact/edit/${id}`;
        // }, 1000); // Warte 1 Sekunde (1000 Millisekunden)
      } else {
        showNotification("Exercise updated successfully", "green");
      }
    } catch (error) {
      console.error("Error updating exercise:", error); // Ändere die Bestätigungsnachricht
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

  const { deleteCart } = useContext(SearchContext);

  useEffect(() => {
    const fetchExDetails = async () => {
      const res = await askServer(`/api/ex?id=${id}`, "GET");
      const exDetails = res.response;
      if (exDetails) {
        console.log(exDetails);
        const categ = cat.value.find((c) => c.id === exDetails.categoryId);
        if (categ) {
          setCategoryName(categ.name);
          setSelectedCategory(categ.name); // Speichern des Kategorienamens

          console.log(categ.name);
        }
        const subcateg = categ.subcategories.find(
          (sub) => sub.id === exDetails.subcategoryId
        );
        if (subcateg) {
          setSubCategoryName(subcateg.name);
          setSelectedSubcategory(subcateg.name); // Speichern des Kategorienamens

          console.log(subcateg.name);
        }

        setEx({
          id: exDetails.id,
          content: exDetails.content,
          solution: exDetails.solution,
          language: exDetails.language,
          difficulty: exDetails.difficulty,
          category: categ ? categoryName : "",
          subcategory: subcateg ? subcategoryName : "",
          // Füge weitere Felder hinzu, falls vorhanden
        });
      }
    };

    if (id) {
      fetchExDetails();
    }
  }, [id, categories]); // Führe den Effekt aus, wenn sich die ID ändert

  return (
    <>
      <div className="pure-g">
        <form
          className="pure-form pure-form-aligned pure-u-4-5"
          onSubmit={(e) => updateEx(e)}
        >
          <legend>Editiere die Aufgabe</legend>
          <fieldset>
            <div className="pure-control-group">
              <label htmlFor="language"> Sprache: </label>
              <select
                required
                id="language"
                name="language"
                value={ex.language}
                onChange={(e) => setEx({ ...ex, language: e.target.value })}
              >
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
                onChange={(e) => setEx({ ...ex, difficulty: e.target.value })}
              >
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
              <label htmlFor="subcategory">: {subcategoryName} (vorher)</label>
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
                Save Changes
              </button>

              <button
                className="button-error pure-button"
                onClick={() => deleteCart({ id })}
              >
                Delete aus DB
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
