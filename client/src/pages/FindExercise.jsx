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
        <h1>Aufgaben Finden</h1>
        <h2>Aufgaben per ID finden</h2>
        <FindExByIdFromServer />
        <hr />
        <h2>Aufgaben nach Text finden</h2>
      </div>
    </>
  );
};

export default Aufgaben;
