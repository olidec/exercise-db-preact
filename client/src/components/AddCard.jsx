import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";

const AddCard = ({ key, id, summary, content }) => {
  return (
    <>
      <div className="warenkorbColumn">
        <label>Zum Warenkorb hinzufügen</label>
        <input
          type="checkbox"
          onChange={() => addToCart({ id, summary, content })}
        />
      </div>
    </>
  );
};

export default AddCard;
