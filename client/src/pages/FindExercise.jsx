import Menu from "../components/Menu.jsx";
import { h } from "preact";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
import FindExByCategory from "../components/FindExByCategory.jsx";
import Warenkorb from "./Warenkorb.jsx";
import { cartItems } from "../signals/warenkorb";

const Aufgaben = () => {
  return (
    <>
      <Menu></Menu>
      <div>
        <h1>Aufgaben Finden</h1>
        <Warenkorb items={cartItems.value} />
        <h2>Aufgaben per ID finden</h2>

        <FindExByIdFromServer />
        <hr />
        <h2>Aufgaben nach Text finden</h2>
        <FindExBySearchText />
        <hr />
        <h2>Aufgaben nach Kategorie finden</h2>
        <FindExByCategory />
        <hr />
      </div>
    </>
  );
};

export default Aufgaben;
