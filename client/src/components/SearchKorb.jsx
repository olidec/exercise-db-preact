import { useEffect } from "preact/hooks";
import SearchCard from "./SearchCard.jsx";
import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

const SearchKorb = ({}) => {
  const { cartSearch, getCartSearch } = useContext(SearchContext);
  console.log(cartSearch.value);

  useEffect(() => {
    MathJax.typeset();
  }, [cartSearch.value]);

  const normalizedList = Array.isArray(cartSearch.value)
    ? cartSearch.value
    : [cartSearch.value];

  return (
    <div>
      {normalizedList &&
        normalizedList.map((ex, index) => (
          <SearchCard
            key={ex.id}
            id={ex.id}
            summary={ex.summary}
            content={ex.content}
            categoryId={ex.categoryId}
            difficulty={ex.difficulty}
          />
        ))}
    </div>
  );
};

export default SearchKorb;
