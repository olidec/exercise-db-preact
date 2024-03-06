import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";
import Card from "./Card";
import AddC from "./AddC";

const AddCard = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card key={id} id={id} summary={summary} content={content} />

          <AddC id={id} summary={summary} content={content} />
        </div>
      </div>
    </>
  );
};

export default AddCard;
