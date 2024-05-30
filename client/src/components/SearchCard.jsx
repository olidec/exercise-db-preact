import Card from "./Card";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext, useState } from "preact/hooks";

const SearchCard = ({ key, id, content, summary, categoryId, difficulty }) => {
  const { cartItems, addToKorb, handleDelete } = useContext(WarenkorbContext);
  let index = cartItems.value.findIndex((item) => item.id === id);
  console.log(index);

  const currentPath = window.location.pathname;
  const detailPath = `/exercise-db-preact/${id}`;

  return (
    <>
      <div key={key} className="kartenContainer">
        <Card
          key={id}
          id={id}
          summary={summary}
          content={content}
          categories={categoryId}
          difficulty={difficulty}
        />

        <div className="warenkorbColumn">
          {index === -1 ? (
            <button
              className="pure-button"
              onClick={() => addToKorb({ id, content, summary })}
              {...(index = cartItems.value.findIndex((item) => item.id === id))}
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

          {currentPath === detailPath ? (
            ""
          ) : (
            <button
              className="pure-button"
              onClick={() => (window.location.href = detailPath)}
            >
              Details/ Edit Aufgabe
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchCard;
