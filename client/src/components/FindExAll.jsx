import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";
import { signal, useSignal } from "@preact/signals";
import { ex, loadEx } from "../signals/exercise";

export default function Exfind() {
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
