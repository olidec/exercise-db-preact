import Card from "./Card";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext } from "preact/hooks";

const SearchCard = ({
  key,
  id,
  summary,
  content,
  categoryId,
  difficulty,
  openModal,
}) => {
  const { cartItems, addToKorb, handleDelete } = useContext(WarenkorbContext);
  let index = cartItems.value.findIndex((item) => item.id === id);
  console.log(index);

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

          <button className="pure-button" onClick={() => openModal(id)}>
            Details/ Edit Aufgabe
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchCard;
