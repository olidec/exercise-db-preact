import { h } from "preact";
import EditForm from "./EditForm.jsx";

const EditExercise = ({ id }) => {
  return (
    <>
      <div className="inhalt">
        <h1>Edit Exercise mit ID {id} </h1>
        <EditForm id={id} />
      </div>
    </>
  );
};

export default EditExercise;
