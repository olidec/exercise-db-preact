import { h } from "preact";
import SearchCard from "./SearchCard.jsx";

import { Link } from "preact-router";
const CardListSearch = ({ list }) => {
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
