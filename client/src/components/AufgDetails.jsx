import { h } from "preact";
import { signal } from "@preact/signals";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { WarenkorbContext } from "../signals/warenkorb.js";
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

  useEffect(() => {
    // Definiert eine IIFE (Immediately Invoked Function Expression), um die asynchrone Logik auszuführen
    (async () => {
      const route = `/api/ex?id=${id}`;
      const exDetails = await askServer(route, "GET");
      //console.log(exDetails);
      //console.log(cartItems.value);
      setExDetails(exDetails);
    })();
  }, [id]); // Stellt sicher, dass dieser Effekt erneut ausgeführt wird, wenn sich `id` ändert

  useEffect(() => {
    MathJax.typeset();
  }, [exDetails]);

  const index = getIndex({ id: exDetails?.id });
  console.log(index);
  console.log(cartItems.value);
  // Überprüfen, ob die Daten noch geladen werden
  if (!exDetails) {
    return <div>Lädt...</div>;
  }

  return (
    <>
      <h1>Aufgabe Details mit ID {id}</h1>

      <div>
        <Card
          key={exDetails.id}
          id={exDetails.id}
          summary={exDetails.summary}
          content={exDetails.content}
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
      </div>
    </>
  );
};

export default AufgDetails;
