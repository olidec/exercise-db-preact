import { signal, computed } from "@preact/signals";
import { askServer } from "../utils/connector";

const cartItems = signal([]);

export function addToKorb({ id, summary, content }) {
  const itemIndex = cartItems.value.findIndex((item) => item.id === id);
  if (itemIndex > -1) {
    const updatedList = [...cartItems.value];
    updatedList.splice(itemIndex, 1);
    cartItems.value = updatedList;
  } else {
    cartItems.value = [...cartItems.value, { id, summary, content }];
  }

  console.log(cartItems.value);
}

export function clearCart() {
  cartItems.value = [];
}

export function handleDelete({ id }) {
  // Finden des Indexes des Elements mit der entsprechenden id
  const index = cartItems.value.findIndex((item) => item.id === id);
  if (index !== -1) {
    // Entfernen des Elements an dem gefundenen Index
    const updatedList = cartItems.value.filter(
      (item, itemIndex) => itemIndex !== index
    );
    cartItems.value = updatedList; // Setzen eines neuen Arrays
  }
  console.log(index);
}

export function getCart() {
  return cartItems.value;
}

export function getCartCount() {
  return cartItems.value.length;
}

//export const cartCount = computed(() => cartItems.value.length);
const cartCount = computed(() => cartItems.value.length);
export { cartItems, cartCount };
