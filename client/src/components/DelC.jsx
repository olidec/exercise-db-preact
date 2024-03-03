import { h } from "preact";
import { signal } from "@preact/signals";
import { handleDelete } from "../signals/warenkorb";

const DelC = ({ index, id, summary, content }) => {
  return (
    <>
      <div className="warenkorbColumn">
        <label>Aus Warenkorb entfernen</label>
        <input
          type="checkbox"
          onChange={() => handleDelete({ id, summary, content })}
        />
      </div>
    </>
  );
};

export default DelC;
