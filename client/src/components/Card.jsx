import { h } from "preact";
import { signal } from "@preact/signals";
import { addToCart } from "../signals/warenkorb";

const Card = ({ key, id, summary, content }) => {
  return (
    <>
      <div className="karte">
        <h3>Summary</h3>
        <hr />
        <div className="summary">{summary}</div>
        <hr />
        <h3>Content</h3>
        <hr />
        <div className="content">{content}</div>
        <hr />
      </div>
    </>
  );
};

export default Card;
