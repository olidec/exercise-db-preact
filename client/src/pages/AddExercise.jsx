import Menu from "../components/Menu.jsx";
import { h } from "preact";
import Exform from "../components/Exform.jsx";
import FindExAll from "../components/FindExAll.jsx";

import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
const AddExercise = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <div>
          <h1>Aufgaben hinzufügen</h1>
          {/* Hier kannst du den Inhalt der Aufgaben-Seite hinzufügen */}
          <div id="ex-form">
            <Exform />
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default AddExercise;
