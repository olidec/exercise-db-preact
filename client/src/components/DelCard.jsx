import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";
import Card from "./Card";
import DelC from "./DelC";

const DelCard = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card key={id} id={id} summary={summary} content={content} />

          <DelC id={id} />
        </div>
      </div>
    </>
  );
};

export default DelCard;
