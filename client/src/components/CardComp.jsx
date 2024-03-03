import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";
import Card from "./Card";
import AddCard from "./AddCard";

const CardComp = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card id={id} summary={summary} content={content} />

          <AddCard id={id} summary={summary} content={content} />
        </div>
      </div>
    </>
  );
};

export default CardComp;
