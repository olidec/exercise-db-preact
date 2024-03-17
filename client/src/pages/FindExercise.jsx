import Menu from "../components/Menu.jsx";
import { h } from "preact";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
import FindExByCategory from "../components/FindExByCategory.jsx";
import Warenkorb from "../components/Warenkorb.jsx";
//import { cartItems } from "../signals/warenkorb";
import SearchKorb from "../components/SearchKorb.jsx";
const FindExercise = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          textAlign: "center",
        }}
      >
        <div>
          <Warenkorb />
          <h2>Aufgaben per ID finden</h2>

          <FindExByIdFromServer />
          <hr />

          <h2>Aufgaben nach Text finden</h2>
          <FindExBySearchText />
          <hr />

          <h2>Aufgaben nach Kategorie finden</h2>
          <FindExByCategory />
          <hr />
          <div>
            <SearchKorb />
          </div>
        </div>
      </div>
    </>
  );
};

export default FindExercise;
