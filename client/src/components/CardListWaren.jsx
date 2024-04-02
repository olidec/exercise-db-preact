import { h } from "preact";

//import { handleDelete } from "../signals/warenkorb.jsx";
import WarenCard from "./WarenCard.jsx";
import { useEffect } from "preact/hooks";

const CardListWaren = ({ list }) => {
  useEffect(() => {
    MathJax.typeset();
  }, [list]);

  return (
    <>
      <div>
        {list.map((ex, index) => (
          <WarenCard
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

export default CardListWaren;
