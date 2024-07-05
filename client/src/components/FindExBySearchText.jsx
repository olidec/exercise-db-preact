import { askServer } from "../utils/connector";
import { useState, useEffect } from "preact/hooks";
import { signal } from "@preact/signals";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

export default function FindExBySearchText() {
  const { setCartSearch, cartSearch, showNotification, searchText } =
    useContext(SearchContext);

  const onChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    searchText.value = value;
    // unccoment line below to update view immediately on change
    // getEx(e)
  };

  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?search=${searchText.value}`;
    const res = await askServer(route, "GET");
    const extext = res.response;

    if (res.status != 200 || extext.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      return;
    } else {
      setCartSearch(extext);
    }
  };

  return (
    <>
      <h2>Volltextsuche</h2>
      <form className="pure-form" onSubmit={(e) => getEx(e)}>
        <fieldset>
          <legend>Search for Exercises</legend>
          <input
            className="pure-input-1-3"
            value={searchText}
            placeholder="seach text"
            onChange={onChange}
          />
          <button className="pure-button pure-button-primary">
            Find Exercises
          </button>
        </fieldset>
      </form>
    </>
  );
}
