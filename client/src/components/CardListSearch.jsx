import SearchCard from "./SearchCard.jsx";
import { useEffect } from "preact/hooks";

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
                categoryId={ex.categoryId}
                difficulty={ex.difficulty}
              ></SearchCard>
            </>
          ))}
      </div>
    </>
  );
};

export default CardListSearch;
