import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";

import CardListSearch from "./CardListSearch.jsx";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
const SearchKorb = ({}) => {
  const { cartSearch, getCartSearch } = useContext(SearchContext);
  return (
    <>
      <div className="inhalt">
        <h1>Suchresultate ({getCartSearch()})</h1>
        <hr />
      </div>
      <div>
        <CardListSearch list={cartSearch.value} />
      </div>
    </>
  );
};

export default SearchKorb;
