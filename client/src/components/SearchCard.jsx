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
  authorId,
  subcategories,
  openModal,
  handleDifficultyChange,
  handleLanguageChange,
}) => {
  const { cartItems, addToKorb, handleDelete } = useContext(WarenkorbContext);
  let index = cartItems.value.findIndex((item) => item.id === id);

  const localUser = JSON.parse(localStorage.getItem("user"));
  console.log("localUser", localUser.id);
  console.log("authorId", authorId);
  const userAuthor = localUser.id === authorId;
  console.log("userAuthor", userAuthor);

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
        authorId={authorId}
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
        {userAuthor && (
          <button className="pure-button" onClick={() => edit({ id })}>
            Bearbeiten
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
