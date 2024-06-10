import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
import FindExByCategory from "../components/FindExByCategory.jsx";
import FindExBySubCategory from "../components/FindExBySubCategory.jsx";
const FindExercise = () => {
  return (
    <>
      <div className="inhalt">
        <h2>Aufgaben per ID finden</h2>

        <FindExByIdFromServer />
        <hr />

        <h2>Aufgaben nach Text finden</h2>
        <FindExBySearchText />
        <hr />
        <h2>Aufgaben nach Kategorie finden</h2>
        <FindExByCategory />
        <hr />
        <h2>Aufgaben nach Unter-Kategorie finden</h2>
        <FindExBySubCategory />
        <hr />
      </div>
    </>
  );
};

export default FindExercise;
