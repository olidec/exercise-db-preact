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
    language: "Deutsch",
    difficulty: 1,
  });

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

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  useEffect(() => {
    loadCat();
  }, []);

  const addNewEx = async (e) => {
    e.preventDefault();

    const categoryObject = cat.value.find((c) => c.name === selectedCategory);
    const subcategoryObject = selectedSubcategory
      ? categoryObject.subcategories.find(
          (sub) => sub.name === selectedSubcategory
        )
      : null;

    // console.log(subcategoryObject.id);

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
        difficulty: 1,
      });
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

  const onChange = (e) => {
    setSelectedCategory(e.target.value);
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
                onChange={onChange}
              >
                {categories.map((category, index) => {
                  if (index === 0) {
                    return (
                      <option disabled selected key={index} value={category}>
                        {" "}
                      </option>
                    );
                  } else {
                    return (
                      <option key={index} value={category}>
                        {" "}
                        {category}{" "}
                      </option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="subcategory">Unterkategorie: </label>
              <select
                required
                id="subcategory"
                name="subcategory"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                {selectedCategory &&
                categories.indexOf(selectedCategory) > 0 ? (
                  subcategories[categories.indexOf(selectedCategory)].map(
                    (subcategory, index) => (
                      <option
                        key={index}
                        value={subcategory}
                        disabled={index === 0}
                      >
                        {subcategory}
                      </option>
                    )
                  )
                ) : (
                  <option disabled>
                    -- Wähle bitte zuerst eine Kategorie --
                  </option>
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
                Add new exercise
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}
