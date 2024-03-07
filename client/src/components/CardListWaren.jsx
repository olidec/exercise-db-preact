import { h } from "preact";
import DelCard from "./WarenCard.jsx";
import { handleDelete } from "../signals/warenkorb.js";
import WarenCard from "./WarenCard.jsx";
const CardListWaren = ({ list }) => {
  return (
    <>
      <div>
        {list.map((ex, index) => (
          <WarenCard
            key={ex.id}
            id={ex.id}
            content={ex.content}
            summary={ex.summary}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
};

export default CardListWaren;
