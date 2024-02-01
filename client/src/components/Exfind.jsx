import { useState, useEffect } from "preact/hooks";
import { askServer } from "../utils/connector";

export default function Exfind() {
  const [ex, setEx] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEx = async () => {
    try {
      // Setze den Ladezustand auf true, bevor die Anfrage gestartet wird
      setLoading(true);

      // Vor dem Aktualisieren des Zustands, die Liste der Übungen zurücksetzen
      setEx([]);

      const res = await askServer("/api/ex", "GET");
      setEx(res);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    } finally {
      // Setze den Ladezustand auf false, unabhängig davon, ob die Anfrage erfolgreich war oder nicht
      setLoading(false);
    }
  };

  useEffect(() => {
    // Aufruf der Funktion beim Mounten der Komponente
    getEx();
  }, []); // Leere Abhängigkeit bedeutet, dass die Funktion nur beim Mounten ausgeführt wird

  // Verwende useEffect, um MathJax nach dem Rendern der Übungen zu aktualisieren
  useEffect(() => {
    // Hier wird MathJax.typeset für das Rendern von LaTeX-Code aufgerufen
    if (ex.length > 0) {
      MathJax.typeset();
    }
  }, [ex]); // Die Abhängigkeit sollte ex sein, damit useEffect bei Änderungen in ex ausgelöst wird

  return (
    <>
      <button onClick={() => getEx()} disabled={loading}>
        {loading ? "Lade Übungen..." : "Get Exercises"}
      </button>
      <div>
        <ol id="exercise">
          {ex.map((exercise) => (
            <li
              key={exercise.id}
              dangerouslySetInnerHTML={{ __html: exercise.content }}
            />
          ))}
        </ol>
      </div>
    </>
  );
}
