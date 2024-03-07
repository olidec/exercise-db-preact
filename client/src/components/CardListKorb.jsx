import { h } from "preact";
import DelCard from "./DelCard.jsx";

const CardListKorb = ({ list }) => {
  return (
    <>
      <div>
        {list.map((ex, index) => (
          <DelCard
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

export default CardListKorb;
