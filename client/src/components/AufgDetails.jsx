import { h } from "preact";
import { signal } from "@preact/signals";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { useContext } from "preact/hooks";
const AufgDetails = ({ id }) => {
  const {
    cartItems,

    addToKorb,
    handleDelete,
    getIndex,
  } = useContext(WarenkorbContext);

  const [exDetails, setExDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Definiert eine IIFE (Immediately Invoked Function Expression), um die asynchrone Logik auszuführen
    (async () => {
      const route = `/api/ex?id=${id}`;
      const exDetails = await askServer(route, "GET");
      if (exDetails) {
        setExDetails(exDetails);
      }
      setLoading(false);
      //console.log(exDetails);
      //console.log(cartItems.value);
      setExDetails(exDetails);
    })();
  }, [id]); // Stellt sicher, dass dieser Effekt erneut ausgeführt wird, wenn sich `id` ändert

  useEffect(() => {
    if (exDetails) {
      MathJax.typeset();
    }
  }, [exDetails]);

  const index = getIndex({ id: exDetails?.id });
  console.log(index);
  console.log(cartItems.value);
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
        <h1>Aufgabe Details mit ID {id}</h1>

        <div>
          <Card
            key={exDetails.id}
            id={exDetails.id}
            summary={exDetails.summary}
            content={exDetails.content}
            solution={exDetails.solution}
            difficulty={exDetails.difficulty}
            author={exDetails.authorId}
            //categories={exDetails.categories.map((cat) => cat.name)}
            currentPath={window.location.pathname}
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
