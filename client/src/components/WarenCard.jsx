import Card from "./Card";
import { useContext, useState } from "preact/hooks";
import { WarenkorbContext } from "../signals/warenkorb.jsx";

const WarenCard = ({ index, id, content, summary, swapItems }) => {
  const { handleDelete, cartItems } = useContext(WarenkorbContext);
  const [isFadingOut, setIsFadingOut] = useState(false); // Zustand, um das Ausblenden zu steuern

  const handleFadeOutAndDelete = () => {
    setIsFadingOut(true); // Startet den Ausblendeffekt
    setTimeout(() => handleDelete({ id }), 600);
    setIsFadingOut(false); // Wartet, bis die Animation abgeschlossen ist, um zu löschen
  };

  const handleSwap = (targetIndex) => {
    setIsFadingOut(true);
    setTimeout(() => {
      swapItems(index, targetIndex);
      setIsFadingOut(false); // Rücksetzen des Fade-Out-Zustands
    }, 600);
  };

  const detailPath = `/exercise-db-preact/${id}`;

  return (
    <div
      key={id}
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
        <div className="swap-buttons">
          <button
            className="pure-button"
            onClick={() => handleSwap(index - 1)}
            disabled={index === 0} // Deaktiviert den Button, wenn es das erste Element ist
          >
            ▲
          </button>
          <button
            className="pure-button"
            onClick={() => handleSwap(index + 1)}
            disabled={index === cartItems.value.length - 1} // Deaktiviert den Button, wenn es das letzte Element ist
          >
            ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarenCard;
