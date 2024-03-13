import { h } from "preact";
import { signal } from "@preact/signals";
import Card from "./Card";

import { cartItems, addToKorb, handleDelete } from "../signals/warenkorb";
const SearchCard = ({ key, id, content, summary }) => {
  let index = cartItems.value.findIndex((item) => item.id === id);
  console.log(index);
  return (
    <>
      <div key={key} className="kartenContainer">
        <div>
          <Card key={id} id={id} summary={summary} content={content} />

          <div className="warenkorbColumn">
            {index === -1 ? (
              <button
                className="pure-button"
                onClick={() => addToKorb({ id, content, summary })}
                {...(index = cartItems.value.findIndex(
                  (item) => item.id === id
                ))}
              >
                Zum Warenkorb
              </button>
            ) : (
              <button
                className="pure-button"
                onClick={() => handleDelete({ id })}
              >
                Löschen aus Warenkorb
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
