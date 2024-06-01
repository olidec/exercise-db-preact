import { h } from "preact";
import { signal } from "@preact/signals";
//import { handleDelete } from "../signals/warenkorb";
import Card from "./Card";
import { useContext, useState } from "preact/hooks";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
const WarenCard = ({ key, id, content, summary }) => {
  const { handleDelete } = useContext(WarenkorbContext);
  const [isFadingOut, setIsFadingOut] = useState(false); // Zustand, um das Ausblenden zu steuern

  const handleFadeOutAndDelete = () => {
    setIsFadingOut(true); // Startet den Ausblendeffekt
    setTimeout(() => handleDelete({ id }), 600); // Wartet, bis die Animation abgeschlossen ist, um zu löschen
  };
  const detailPath = `/exercise-db-preact/${id}`;
  return (
    <>
      <div
        key={key}
        className={`kartenContainer ${isFadingOut ? "card-fade-out" : ""}`}
      >
        <Card key={id} id={id} summary={summary} content={content} />
        <div className="warenkorbColumn">
          <button className="pure-button" onClick={handleFadeOutAndDelete}>
            Löschen aus Warenkorb
          </button>

          <button
            className="pure-button"
            onClick={() => (window.location.href = detailPath)}
          >
            Details/ Edit Aufgabe
          </button>
        </div>
      </div>
    </>
  );
};

export default WarenCard;
