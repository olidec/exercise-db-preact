import { h } from "preact";
import SearchCard from "./SearchCard.jsx";
import { addToCart } from "../signals/warenkorb";
const CardListSearch = ({ list }) => {
  if (!list) {
    return null; // oder eine alternative UI-Anzeige
  }

  return (
    <>
      <div>
        {list.map((ex, index) => (
          <SearchCard
            key={ex.id}
            id={ex.id}
            content={ex.content}
            summary={ex.summary}
            addToCart={addToCart}
          />
        ))}
      </div>
    </>
  );
};

export default CardListSearch;
