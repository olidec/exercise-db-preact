import Card from "./Card";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext, useEffect } from "preact/hooks";
import { edit } from "./AufgDetails.jsx";

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
  handleDifficultyChange,
  handleLanguageChange,
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
        handleDifficultyChange={handleDifficultyChange}
        handleLanguageChange={handleLanguageChange}
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
          Details
        </button>
        <button className="pure-button" onClick={() => edit({ id })}>
          Bearbeiten
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
