import { h } from "preact";
import { signal } from "@preact/signals";
import { handleDelete } from "../signals/warenkorb";

const DelC = ({ id }) => {
  return (
    <>
      <div className="warenkorbColumn">
        <label>Aus Warenkorb entfernen</label>
        <input type="checkbox" onChange={() => handleDelete({ id })} />
      </div>
    </>
  );
};

export default DelC;
