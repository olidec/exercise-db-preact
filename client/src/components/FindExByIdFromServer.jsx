import { askServer } from "../utils/connector";
import { signal } from "@preact/signals";
import { useState, useEffect } from "preact/hooks";

import { useContext } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";
export default function FindExById() {
  const { cartSearch, showNotification } = useContext(SearchContext);
  const myId = signal(1);
  const [exerciseList, setExerciseList] = useState([]);

  useEffect(() => {
    cartSearch.value = exerciseList;
    // Aktualisiert cartSearch, wenn exerciseList sich ändert
  }, [exerciseList]); // Abhängigkeiten, die den Effekt auslösen
  const onChange = (e) => {
    e.preventDefault();
    const newValue = parseInt(e.target.value, 10); // Wandelt den Eingabewert in eine Zahl um
    if (newValue >= 1) {
      myId.value = newValue; // Setzt myId nur, wenn der Wert >= 1 ist
    } else {
      // Optional: Feedback an den Benutzer, dass die Eingabe ungültig ist
      alert("Bitte geben Sie eine ID größer als 0 ein.");
    }
  };
  // Alle Aufgaben werden in der Variable ex.value gespeichert. Dies sollte später geändert werden, da es nicht gut ist, wenn alle AUfgaben auf einmal geladen werden (Speicherplatz, Ladezeit, etc.) Idealerweise wird beim updaten der id nur die Aufgabe mit der entsprechenden id geladen.
  const getEx = async (e) => {
    e.preventDefault();
    const route = `/api/ex?id=${myId.value}`;

    const res = await askServer(route, "GET");
    if (res === null || res === undefined || res.errors || res.length === 0) {
      showNotification("No exercise matches the search term.", "red");
      return;
    } else {
      setExerciseList(res);
      window.location.href = "/search"; // Verwendet `route` von `preact-router` für die Weiterleitung
    }
  };

  return (
    <>
      <form className="pure-form pure-form-aligned" onSubmit={(e) => getEx(e)}>
        <div className="pure-control-group">
          <label htmlFor="exid-2">Select Exercise via ID</label>
          <input id="exid-2" type="number" value={myId} onChange={onChange} />
          <button className="pure-button">Get Exercise by ID</button>
        </div>
      </form>
    </>
  );
}
