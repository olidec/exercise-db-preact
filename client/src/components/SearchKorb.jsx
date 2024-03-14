import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import Menu from "./Menu.jsx";
import { cartSearch, getCartSearch } from "../signals/exercise.js";

import CardListSearch from "./CardListSearch.jsx";
import { useSignal } from "@preact/signals";

const SearchKorb = ({}) => {
  return (
    <>
      <div>
        <CardListSearch list={cartSearch.value} />
        <hr />
      </div>
    </>
  );
};

export default SearchKorb;
