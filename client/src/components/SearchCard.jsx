import { h } from "preact";
import { signal } from "@preact/signals";
import Card from "./Card";

import { addToKorb } from "../signals/warenkorb";
const SearchCard = ({ key, id, content, summary }) => {
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card key={id} id={id} summary={summary} content={content} />

          <div className="warenkorbColumn">
            <label>Zum Warenkorb hinzufügen</label>
            <input
              type="checkbox"
              onChange={() => addToKorb({ id, summary, content })}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
