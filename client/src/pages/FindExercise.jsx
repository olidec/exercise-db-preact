import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";

import FindExSubCat from "../components/FindExSubCat.jsx";
const FindExercise = () => {
  return (
    <>
      <div className="inhalt">
        <hr />

        <FindExBySearchText />
        <hr />

        <FindExSubCat />
        <hr />
      </div>
    </>
  );
};

export default FindExercise;
