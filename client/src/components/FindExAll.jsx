import { useState, useEffect } from "preact/hooks";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
export default function Exfind() {
  const { loadEx, ex } = useContext(SearchContext);
  useEffect(() => {
    loadEx();
  }, []);

  const getEx = () => {
    const exerciseList = document.getElementById("exercise");

    // Lösche den vorherigen Inhalt des ol-Elements
    exerciseList.innerHTML = "";

    ex.value.map((ex) => {
      const el = document.createElement("li");
      el.innerHTML = ex.content;
      document.getElementById("exercise").appendChild(el);
      MathJax.typeset([el]);
    });
  };

  return (
    <>
      <button className="pure-button" onClick={() => getEx()}>
        Get Exercises
      </button>
      <div>
        <ol id="exercise"></ol>
      </div>
    </>
  );
}
