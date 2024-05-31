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
    loadCat();
  }, []);

  let categories = [
    "-- Wähle bitte eine Kategorie --",
    "Zahlen",
    "Arithmetik und Algebra",
    "Geometrie",
    "Analysis",
    "Stochastik",
    "Vertiefende Themen",
  ];
  const subcategories = [
    ["-- Wähle bitte zuerst eine Kategorie --"],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Zahlensysteme",
      "Spezielle Zahlen",
      "Zahlenmengen",
      "Sonstiges",
    ],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Rechenarten",
      "Gleichungen und Ungleichungen",
      "Funktionen",
      "Sonstiges",
    ],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Allgemeine Geometrie der Ebene",
      "Trigonometrie",
      "Allgemeine Geometrie des Raums",
      "Vektorgeometrie",
      "Sonstiges",
    ],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Grundlagen",
      "Differentialrechnung",
      "Integralrechnung",
      "Sonstiges",
    ],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Wahrscheinlichkeitstheorie",
      "Kombinatorik",
      "Statistik",
      "Sonstiges",
    ],
    [
      "-- Wähle bitte eine Unterkategorie --",
      "Komplexe Zahlen",
      "Kegelschnitte",
      "Differentialgleichungen",
      "Lineare Abbildungen und Matrizen",
      "Graphentheorie",
      "Sonstiges",
    ],
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategories[0][0]
  );

  useEffect(() => {
    if (selectedCategory !== categoryName) {
      setSelectedSubcategory("-- Wähle bitte eine Unterkategorie --");
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
      if (!res.err) {
        console.log(res);
        showNotification("Exercise updated successfully", "green");

        setTimeout(() => {
          window.location.href = `/exercise-db-preact/${id}`;
        }, 1000); // Warte 1 Sekunde (1000 Millisekunden)
      } else {
        console.log(res.err);
        showNotification(
          "Fehler beim Aktualisieren, Aufgabe existiert schon in DB",
          "red"
        );
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

  useEffect(() => {
    loadCat().then((c) => {
      const fetchExDetails = async () => {
        const exDetails = await askServer(`/api/ex?id=${id}`, "GET");
        if (exDetails) {
          console.log(exDetails);
          const categ = cat.value.find((c) => c.id === exDetails.categoryId);
          if (categ) {
            setCategoryName(categ.name);
            setSelectedCategory(categ.name); // Speichern des Kategorienamens
          }
          const subcateg = categ.subcategories.find(
            (sub) => sub.id === exDetails.subcategoryId
          );
          if (subcateg) {
            setSubCategoryName(subcateg.name);
            setSelectedSubcategory(subcateg.name); // Speichern des Kategorienamens
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
    });
  }, [id]); // Führe den Effekt aus, wenn sich die ID ändert

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
                {categories.map((category, index) => (
                  <option key={index} value={category} disabled={index === 0}>
                    {category}
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
                {subcategories[categories.indexOf(selectedCategory)].map(
                  (subcategory, index) => (
                    <option key={index} value={subcategory}>
                      {subcategory}
                    </option>
                  )
                )}
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
                Edit
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
