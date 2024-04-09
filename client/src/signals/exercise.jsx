import { signal, effect } from "@preact/signals";
import { askServer } from "../utils/connector";
import { createContext } from "preact";
import exerciseList from "../components/FindExByIdFromServer";
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const ex = signal([]);
  //const cartSearch = signal([]);
  const loadEx = async () => {
    const res = await askServer("/api/ex/", "GET");
    ex.value = res;
  };

  const cartSearch = signal(
    JSON.parse(window.localStorage.getItem("cartSearch")) || []
  );
  function getCartSearch() {
    if (cartSearch.value.length === 0) {
      return "Keine Suchergebnisse gefunden";
    }
    if (cartSearch.value.length === undefined) {
      return "1";
    }

    return cartSearch.value.length;
  }

  const deleteCart = async ({ id }) => {
    // Stelle sicher, dass der ID-Wert korrekt im URL-Pfad enthalten ist
    const route = `/api/ex/${id}`;

    // Da der `DELETE` Request keinen Body erwartet, übergebe ein leeres Objekt oder lasse den Parameter weg
    const deleteEx = await askServer(route, "DELETE");

    // Verarbeite die Antwort entsprechend (z.B. Aktualisiere den Zustand oder informiere den Benutzer)
    if (deleteEx) {
      console.log("Aufgabe erfolgreich gelöscht:", deleteEx);
      alert("Aufgabe erfolgreich gelöscht.");
      // Führe hier weitere Aktionen durch, z.B. Zustand aktualisieren oder Seite neu laden
    } else {
      console.error("Fehler beim Löschen der Aufgabe");
      alert("Fehler beim Löschen der Aufgabe.");
    }
  };

  effect(() => {
    window.localStorage.setItem("cartSearch", JSON.stringify(cartSearch.value));
  });
  return (
    <SearchContext.Provider
      value={{ ex, loadEx, cartSearch, getCartSearch, deleteCart }}
    >
      {children}
    </SearchContext.Provider>
  );
};
