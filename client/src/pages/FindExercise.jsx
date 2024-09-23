import AuthWrapper from "../components/AuthWrapper.jsx";
import FindExByIdFromServer from "../components/FindExByIdFromServer.jsx";
import FindExBySearchText from "../components/FindExBySearchText.jsx";
import FindExSubCat from "../components/FindExSubCat.jsx";

const FindExercise = () => {
  return (
    <AuthWrapper>
      <div>
        <FindExSubCat>
          <FindExBySearchText />
        </FindExSubCat>
      </div>
    </AuthWrapper>
  );
};

export default FindExercise;
