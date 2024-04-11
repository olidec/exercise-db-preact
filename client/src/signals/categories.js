import { signal } from "@preact/signals";
import { askServer } from "../utils/connector";

const cat = signal([]);

const loadCat = async () => {
  const res = await askServer("/api/cat/", "GET");
  console.log("Kategorien geladen:", res); // Überprüfen, ob die Antwort die erwarteten Daten enthält
  cat.value = res;
};

export { cat, loadCat };
