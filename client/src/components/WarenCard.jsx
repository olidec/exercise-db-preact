import { h } from "preact";
import { signal } from "@preact/signals";
import { handleDelete } from "../signals/warenkorb";
import Card from "./Card";

const WarenCard = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card key={id} id={id} summary={summary} content={content} />

          <div className="warenkorbColumn">
            <label>Aus Warenkorb entfernen</label>
            <input type="checkbox" onChange={() => handleDelete({ id })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WarenCard;
