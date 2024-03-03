import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";

const Card = ({ key, id, summary, content }) => {
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
            <input
              type="checkbox"
              onChange={() => addToCart({ id, summary, content })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
