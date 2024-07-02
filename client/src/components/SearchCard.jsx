import Card from "./Card";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext, useEffect } from "preact/hooks";

const SearchCard = ({
  key,
  id,
  summary,
  content,
  categoryId,
  difficulty,
  solution,
  author,
  subcategories,
  openModal,
}) => {
  const { cartItems, addToKorb, handleDelete } = useContext(WarenkorbContext);
  let index = cartItems.value.findIndex((item) => item.id === id);

  return (
    <div key={key} className="kartenContainer">
      <Card
        key={id}
        id={id}
        summary={summary}
        content={content}
        categories={categoryId}
        difficulty={difficulty}
        solution={solution}
        author={author}
        subcategories={subcategories}
        isModal={false}
      />

      <div className="warenkorbColumn">
        {index === -1 ? (
          <button
            className="pure-button"
            onClick={() => addToKorb({ id, content, summary })}
          >
            Zum Warenkorb
          </button>
        ) : (
          <button className="pure-button" onClick={() => handleDelete({ id })}>
            Löschen aus Warenkorb
          </button>
        )}

        <button className="pure-button" onClick={() => openModal(id)}>
          Details/ Edit Aufgabe
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
