import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function EditForm({ id }) {
  const [ex, setEx] = useState({
    id: id,
    summary: "",
    content: "",
    solution: "",
    category: "",
    subcategory: "",
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

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    subcategories[0][0]
  );

  useEffect(() => {
    setSelectedSubcategory(
      subcategories[categories.indexOf(selectedCategory)][0]
    );
  }, [selectedCategory]);

  const updateEx = async (e) => {
    if (!ex.id || !ex.summary || !ex.content || !ex.solution) {
      console.log("Validation error: Some required fields are missing");
      return;
    }

    e.preventDefault();
    const exWithCategory = {
      id: parseInt({ id }), // Stelle sicher, dass die id hier eingefügt wird
      summary: ex.summary,
      content: ex.content,
      solution: ex.solution,
      category: selectedCategory,
      subcategory: selectedSubcategory,
    };
    try {
      const res = await askServer("/api/ex", "PUT", exWithCategory);

      console.log(res);

      console.log(res.error);
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

  const onChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    const fetchExDetails = async () => {
      const exDetails = await askServer(`/api/ex?id=${id}`, "GET");
      if (exDetails) {
        setEx({
          id: exDetails.id,
          summary: exDetails.summary,
          content: exDetails.content,
          solution: exDetails.solution,
          category: exDetails.category,
          subcategory: exDetails.subcategory,
          // Füge weitere Felder hinzu, falls vorhanden
        });
      }
    };

    if (id) {
      fetchExDetails();
    }
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
              <select required id="language" name="language">
                <option selected> Deutsch </option>
                <option> English </option>
              </select>
            </div>
            <div className="pure-control-group">
              <label htmlFor="difficulty"> Schwierigkeitsgrad: </label>
              <select required id="difficulty" name="difficulty">
                <option selected> Leicht </option>
                <option> Mittel </option>
                <option> Schwer </option>
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
                      <option disabled selected key={index}>
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
                {subcategories[categories.indexOf(selectedCategory)].map(
                  (subcategory, index) => {
                    if (index === 0) {
                      return (
                        <option disabled selected key={index}>
                          {" "}
                        </option>
                      );
                    } else {
                      return (
                        <option key={index} value={subcategory}>
                          {subcategory}
                        </option>
                      );
                    }
                  }
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
