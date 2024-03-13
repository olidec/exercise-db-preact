import { h } from "preact";
import { signal } from "@preact/signals";
import Card from "./Card";
import { useParams } from "react-router-dom";
import Menu from "./Menu";

import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
const AufgDetails = ({ id }) => {
  const [exDetails, setExDetails] = useState(null);

  useEffect(() => {
    // Definiert eine IIFE (Immediately Invoked Function Expression), um die asynchrone Logik auszuführen
    (async () => {
      const route = `/api/ex?id=${id}`;
      const exDetails = await askServer(route, "GET");
      console.log(exDetails);
      setExDetails(exDetails);
    })();
  }, [id]); // Stellt sicher, dass dieser Effekt erneut ausgeführt wird, wenn sich `id` ändert

  useEffect(() => {
    MathJax.typeset();
  }, [exDetails]);

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
      </div>
    </>
  );
};

export default AufgDetails;
