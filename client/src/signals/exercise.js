import { signal } from "@preact/signals";
import { askServer } from "../utils/connector";

const ex = signal([]);
const cartSearch = signal([]);
const loadEx = async () => {
  const res = await askServer("/api/ex/", "GET");
  ex.value = res;
};

export function getCartSearch() {
  return cartSearch.value;
}

export { ex, loadEx, cartSearch };
