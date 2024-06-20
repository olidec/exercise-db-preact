import { signal, computed, effect } from "@preact/signals";

import { createContext } from "preact";

export const WarenkorbContext = createContext();

export const WarenkorbProvider = ({ children }) => {
  const cartItems = signal(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );

  function addToKorb({ id, summary, content }) {
    setTimeout(() => {
      cartItems.value = [...cartItems.value, { id, summary, content }];

      console.log(cartItems.value);
      // Zeige das Häkchen an
      const checkmark = document.getElementById("checkmark");
      checkmark.innerHTML = "✓";
      checkmark.style.color = "lightgreen"; // Setze die Farbe auf Grün
      checkmark.style.display = "block";

      // Verberge das Häkchen nach 1 Sekunde
      setTimeout(() => {
        checkmark.style.display = "none";
      }, 700);
    }, 400);
  }

  effect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  });
  function handleDelete({ id }) {
    setTimeout(() => {
      // Finden des Indexes des Elements mit der entsprechenden id
      const index = cartItems.value.findIndex((item) => item.id === id);

      // Entfernen des Elements an dem gefundenen Index
      const updatedList = cartItems.value.filter(
        (item, itemIndex) => itemIndex !== index
      );
      cartItems.value = updatedList; // Setzen eines neuen Arrays

      console.log(index);
      console.log(cartItems.value);

      const checkmark = document.getElementById("checkmark");
      checkmark.innerHTML = "x"; // Setze das Häkchen-Symbol
      checkmark.style.color = "red"; // Setze die Farbe auf Grün
      checkmark.style.display = "block";

      setTimeout(() => {
        checkmark.style.display = "none";
      }, 700);
    }, 400);
  }

  function getCartCount() {
    return cartItems.value.length;
  }

  function getCart() {
    return cartItems.value;
  }
  function getIndex({ id }) {
    const index = cartItems.value.findIndex((item) => item.id === id);
    return index;
  }

  const cartCount = computed(() => cartItems.value.length);

  const arrayIDs = cartItems.value.map((obj) => obj.id);
  console.log(arrayIDs);

  return (
    <WarenkorbContext.Provider
      value={{
        cartItems,
        cartCount,
        getCartCount,
        getCart,
        handleDelete,
        addToKorb,
        getIndex,
        arrayIDs,
      }}
    >
      {children}
    </WarenkorbContext.Provider>
  );
};
