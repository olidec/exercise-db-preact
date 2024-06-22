import { signal } from "@preact/signals";
import { askServer } from "../utils/connector";

const cat = signal([]);
const subcat = signal([]);
const loadCat = async () => {
  const res = await askServer("/api/cat/", "GET");
  console.log("Kategorien geladen:", res); // Überprüfen, ob die Antwort die erwarteten Daten enthält
  cat.value = res.response;
};

const loadSubCat = async () => {
  const res = await askServer("/api/subcat/", "GET");
  console.log("Sub-Kategorien geladen:", res); // Überprüfen, ob die Antwort die erwarteten Daten enthält
  subcat.value = res.response;
};
export { cat, loadCat, subcat, loadSubCat };
