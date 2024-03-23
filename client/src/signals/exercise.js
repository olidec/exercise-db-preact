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

  effect(() => {
    window.localStorage.setItem("cartSearch", JSON.stringify(cartSearch.value));
  });
  return (
    <SearchContext.Provider value={{ ex, loadEx, cartSearch, getCartSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
