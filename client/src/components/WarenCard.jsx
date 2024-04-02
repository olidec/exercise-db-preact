import { h } from "preact";
import { signal } from "@preact/signals";
//import { handleDelete } from "../signals/warenkorb";
import Card from "./Card";
import { useContext, useState } from "preact/hooks";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
const WarenCard = ({ key, id, content, summary }) => {
  const { handleDelete } = useContext(WarenkorbContext);
  return (
    <>
      <div key={key} className="kartenContainer">
        <Card key={id} id={id} summary={summary} content={content} />

        <div className="warenkorbColumn">
          <button className="pure-button" onClick={() => handleDelete({ id })}>
            Löschen aus Warenkorb
          </button>
        </div>
      </div>
    </>
  );
};

export default WarenCard;
