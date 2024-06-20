import Card from "./Card";

import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
import { cat, loadCat } from "../signals/categories.js";
const AufgDetails = ({ id }) => {
  const { addToKorb, handleDelete, getIndex } = useContext(WarenkorbContext);

  const [exDetails, setExDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubCategoryName] = useState("");

  useEffect(() => {
    loadCat().then((c) => {
      // Definiert eine IIFE (Immediately Invoked Function Expression), um die asynchrone Logik auszuführen
      (async () => {
        const route = `/api/ex?id=${id}`;
        const exDetails = await askServer(route, "GET");
        if (exDetails) {
          setExDetails(exDetails);

          const categ = cat.value.find((c) => c.id === exDetails.categoryId);
          if (categ) {
            setCategoryName(categ.name); // Speichern des Kategorienamens
          }

          const subcateg = categ.subcategories.find(
            (sub) => sub.id === exDetails.subcategoryId
          );
          if (subcateg) {
            setSubCategoryName(subcateg.name); // Speichern des Kategorienamens
          }
        }
        setLoading(false);

        setExDetails(exDetails);
      })();
    });
  }, [id]); // Stellt sicher, dass dieser Effekt erneut ausgeführt wird, wenn sich `id` ändert

  useEffect(() => {
    if (exDetails) {
      MathJax.typeset();
    }
  }, [exDetails]);

  const index = getIndex({ id: exDetails?.id });

  // Überprüfen, ob die Daten noch geladen werden
  if (loading) {
    return <div>Lädt...</div>;
  }
  if (!exDetails) {
    return <h2>Aufgabe mit ID {id} existiert nicht mehr in Datenbank</h2>;
  }
  function edit({ id }) {
    window.location.href = `/exercise-db-preact/edit/${id}`;
  }
  console.log(exDetails);

  return (
    <>
      <div className="inhalt">
        <h1>Details der Aufgabe mit ID {id}</h1>

        <div>
          <Card
            key={exDetails.id}
            id={exDetails.id}
            summary={exDetails.summary}
            content={exDetails.content}
            solution={exDetails.solution}
            difficulty={exDetails.difficulty}
            author={exDetails.authorId}
            categories={categoryName}
            subcategories={subcategoryName}
            isModal={true}
          />

          {index === -1 ? (
            <button
              className="pure-button"
              onClick={() =>
                addToKorb({
                  id: exDetails.id,
                  content: exDetails.content,
                  summary: exDetails.summary,
                })
              }
            >
              Zum Warenkorb
            </button>
          ) : (
            <button
              className="pure-button"
              onClick={() => handleDelete({ id: exDetails.id })}
            >
              Löschen aus Warenkorb
            </button>
          )}

          <button
            className="pure-button"
            onClick={() => edit({ id: exDetails.id })}
          >
            Edit Aufgabe
          </button>
        </div>
      </div>
    </>
  );
};

export default AufgDetails;
