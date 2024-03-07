import { signal, computed } from "@preact/signals";

const cartItems = signal([]);

export function addToCart({ id, summary, content }) {
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

export function handleDelete(id) {
  const updatedList = [...cartItems.value];
  updatedList.splice(id, 1);
  cartItems.value = updatedList;
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
