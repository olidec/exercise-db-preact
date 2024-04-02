import { signal, computed, effect } from "@preact/signals";
import { askServer } from "../utils/connector";

import { useContext, useState } from "preact/hooks";
import { createContext } from "preact";

export const WarenkorbContext = createContext();

export const WarenkorbProvider = ({ children }) => {
  //const [cartItems, setCartItems] = useState([]);

  const cartItems = signal(
    JSON.parse(window.localStorage.getItem("cartItems")) || []
  );
  function addToKorb({ id, summary, content }) {
    cartItems.value = [...cartItems.value, { id, summary, content }];

    console.log(cartItems.value);
  }

  effect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  });
  function handleDelete({ id }) {
    // Finden des Indexes des Elements mit der entsprechenden id
    const index = cartItems.value.findIndex((item) => item.id === id);

    // Entfernen des Elements an dem gefundenen Index
    const updatedList = cartItems.value.filter(
      (item, itemIndex) => itemIndex !== index
    );
    cartItems.value = updatedList; // Setzen eines neuen Arrays

    console.log(index);
    console.log(cartItems.value);
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

  //export const cartCount = computed(() => cartItems.value.length);
  const cartCount = computed(() => cartItems.value.length);

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
      }}
    >
      {children}
    </WarenkorbContext.Provider>
  );
};
