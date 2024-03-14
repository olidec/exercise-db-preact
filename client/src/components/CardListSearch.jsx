import { h } from "preact";
import SearchCard from "./SearchCard.jsx";
import { useEffect } from "preact/hooks";
import { Link } from "preact-router";
const CardListSearch = ({ list }) => {
  useEffect(() => {
    MathJax.typeset();
  }, [list]);
  return (
    <>
      <div>
        {list &&
          list.map((ex, index) => (
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
