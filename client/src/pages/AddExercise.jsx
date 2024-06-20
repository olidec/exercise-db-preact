import Exform from "../components/Exform.jsx";
import AuthWrapper from "../components/AuthWrapper.jsx";
const AddExercise = () => {
  return (
    <AuthWrapper>
      <div className="inhalt">
        <h1>Aufgaben hinzufügen</h1>
        <Exform />
      </div>
    </AuthWrapper>
  );
};

export default AddExercise;
