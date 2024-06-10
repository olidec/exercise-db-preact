import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
import SearchCard from "./SearchCard.jsx";
import { useEffect } from "preact/hooks";

const SearchKorb = ({}) => {
  const { cartSearch, getCartSearch } = useContext(SearchContext);

  useEffect(() => {
    MathJax.typeset();
  }, [cartSearch.value]);
  console.log(cartSearch.value);

  const normalizedList = Array.isArray(cartSearch.value)
    ? cartSearch.value
    : [cartSearch.value];

  return (
    <>
      <div className="inhalt">
        <h1>Suchresultate ({getCartSearch()})</h1>
        <hr />
      </div>
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

export default SearchKorb;
