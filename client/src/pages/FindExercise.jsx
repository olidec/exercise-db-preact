import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
import FindExByCategory from "../components/FindExByCategory.jsx";
import FindExBySubCategory from "../components/FindExBySubCategory.jsx";
import FindExCat from "../components/FindExCat.jsx";
import FindExSubCat from "../components/FindExSubCat.jsx";
const FindExercise = () => {
  return (
    <>
      <div className="inhalt">
        <hr />
        <h2>Aufgaben nacht Text finden</h2>
        <FindExBySearchText />
        <hr />
        <h2>Aufgaben nach Kategorie Unterkategorien finden</h2>
        <FindExSubCat />
        <hr />

        <hr />
      </div>
    </>
  );
};

export default FindExercise;
