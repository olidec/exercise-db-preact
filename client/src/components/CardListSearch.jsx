import { h } from "preact";
import AddCard from "./AddCard.jsx";

const CardListSearch = ({ list }) => {
  if (!list) {
    return null; // oder eine alternative UI-Anzeige
  }

  return (
    <>
      <div>
        {list.map((ex, index) => (
          <AddCard
            key={ex.id}
            id={ex.id}
            content={ex.content}
            summary={ex.summary}
          />
        ))}
      </div>
    </>
  );
};

export default CardListSearch;
