import { signal, effect } from "@preact/signals";
import { askServer } from "../utils/connector";
import { createContext } from "preact";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const cartSearch = signal(
    JSON.parse(window.localStorage.getItem("cartSearch")) || []
  );

  const searchText = signal(
    JSON.parse(window.localStorage.getItem("searchText"))
  );

  const categor = signal(
    JSON.parse(window.localStorage.getItem("categor")) || []
  );

  const setCartSearch = (exercises) => {
    cartSearch.value = exercises;
  };

  const loadEx = async () => {
    const res = await askServer("/api/ex/", "GET");
    ex.value = res.response;
  };

  function getCartSearch() {
    if (cartSearch.value.length === 0) {
      return "Keine Suchergebnisse gefunden";
    }
    if (cartSearch.value.length === undefined) {
      return "1";
    }

    return cartSearch.value.length;
  }

  const showNotification = (message, color) => {
    // Finde den Container für die Benachrichtigungen
    const container = document.getElementById("notification-container");

    // Erstelle das Benachrichtigungselement
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.top = "20px"; // Positioniere die Benachrichtigung am oberen Rand
    notification.style.left = "50%"; // Zentriere die Benachrichtigung horizontal
    notification.style.transform = "translateX(-50%)"; // Stelle sicher, dass sie genau zentriert ist
    notification.style.backgroundColor = color;
    notification.style.color = "white";
    notification.style.padding = "20px"; // Größere Padding-Werte für ein größeres Fenster
    notification.style.minWidth = "300px"; // Stelle eine Mindestbreite ein
    notification.style.textAlign = "center"; // Zentriere den Text innerhalb der Benachrichtigung
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    notification.style.fontSize = "18px"; // Vergrößere die Schriftgröße

    // Füge die Benachrichtigung zum Container hinzu
    container.appendChild(notification);

    // Entferne die Benachrichtigung nach 3 Sekunden
    setTimeout(() => {
      if (container.contains(notification)) {
        container.removeChild(notification);
      }
    }, 3500);
  };

  const deleteCart = async ({ id }) => {
    const isConfirmed = window.confirm(
      "Möchtest du diese Aufgabe wirklich löschen?"
    );
    if (isConfirmed) {
      const route = `/api/ex/${id}`;
      const deleteEx = await askServer(route, "DELETE");

      if (deleteEx) {
        showNotification("Aufgabe erfolgreich gelöscht.", "red");

        setTimeout(() => {
          window.location.href = `/add`;
        }, 1000);
      } else {
        console.error("Fehler beim Löschen der Aufgabe");
        showNotification("Fehler beim Löschen der Aufgabe.", "red");
      }
    }
  };

  effect(() => {
    window.localStorage.setItem("cartSearch", JSON.stringify(cartSearch.value));
    window.localStorage.setItem("searchText", JSON.stringify(searchText.value));
    window.localStorage.setItem("categor", JSON.stringify(categor.value));
  });
  return (
    <SearchContext.Provider
      value={{
        categor,
        searchText,
        loadEx,
        setCartSearch,
        cartSearch,
        getCartSearch,
        deleteCart,
        showNotification,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
