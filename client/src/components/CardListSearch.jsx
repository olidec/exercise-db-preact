import { h } from "preact";
import SearchCard from "./SearchCard.jsx";
import { useEffect } from "preact/hooks";
import { Link } from "preact-router";
const CardListSearch = ({ list }) => {
  useEffect(() => {
    MathJax.typeset();
  }, [list]);
  console.log(list);

  const normalizedList = Array.isArray(list) ? list : [list];

  return (
    <>
      <div>
        {normalizedList &&
          normalizedList.map((ex, index) => (
            <>
              <SearchCard
                key={ex.id}
                id={ex.id}
                summary={ex.summary}
                content={ex.content}
              ></SearchCard>
            </>
          ))}
      </div>
    </>
  );
};

export default CardListSearch;
