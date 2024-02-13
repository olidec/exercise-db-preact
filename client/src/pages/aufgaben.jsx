import Menu from "../components/Menu.jsx";
import { h } from "preact";
import Exform from "../components/Exform.jsx";
import FindExAll from "../components/FindExAll.jsx";
import FindExById from "../components/FindExById.jsx";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
const Aufgaben = () => {
  return (
    <>
      <Menu></Menu>
      <div>
        <h1>Aufgaben</h1>
        {/* Hier kannst du den Inhalt der Aufgaben-Seite hinzufügen */}
        <div id="ex-form">
          <Exform />
        </div>
        <FindExById />

        <FindExAll />

        <FindExByIdFromServer />
        <hr />
        <hr />
      </div>
    </>
  );
};

export default Aufgaben;
