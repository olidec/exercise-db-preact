import AuthWrapper from "../components/AuthWrapper.jsx";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";

import FindExSubCat from "../components/FindExSubCat.jsx";
const FindExercise = () => {
  return (
    <AuthWrapper>
      <div>
        <hr />

        <FindExBySearchText />
        <hr />

        <FindExSubCat />
        <hr />
      </div>
    </AuthWrapper>
  );
};

export default FindExercise;
