import Menu from "../components/Menu.jsx";
import { h } from "preact";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
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
        <FindExBySearchText />
      </div>
    </>
  );
};

export default Aufgaben;
