import { h } from "preact";
//import style from "./Karte.css"; // Stelle sicher, dass die CSS-Datei für die Komponente existiert

const Card = ({ key, summary, content }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div className="karte">
          <h3>Summary</h3>
          <hr />
          <div className="summary">{summary}</div>
          <hr />
          <h3>Content</h3>
          <hr />
          <div className="content">{content}</div>
          <hr />
          <div className="warenkorbColumn">
            <label>Zum Warenkorb hinzufügen</label>
            <input type="checkbox" onChange={() => addToCart(id)} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Card;
