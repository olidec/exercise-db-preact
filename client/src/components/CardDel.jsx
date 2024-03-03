import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";
import Card from "./Card";
import DeleteCard from "./DeleteCard";

const CardDel = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card id={id} summary={summary} content={content} />

          <DeleteCard index={key} id={id} summary={summary} content={content} />
        </div>
      </div>
    </>
  );
};

export default CardDel;
