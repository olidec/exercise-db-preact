import { signal } from "@preact/signals";
import { askServer } from "../utils/connector";

const cat = signal([]);
const subcat = signal([]);
const loadCat = async () => {
  const res = await askServer("/api/cat/", "GET");
  cat.value = res.response;
};

const loadSubCat = async () => {
  const res = await askServer("/api/subcat/", "GET");
  subcat.value = res.response;
};
export { cat, loadCat, subcat, loadSubCat };
