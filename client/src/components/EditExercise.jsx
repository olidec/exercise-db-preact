import { h } from "preact";
import EditForm from "./EditForm.jsx";
import { useContext, useState } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

const EditExercise = ({ id }) => {
  return (
    <>
      <div className="inhalt">
        <h1>Edit Exercise mit ID {id} </h1>

        <hr></hr>

        <EditForm id={id} />

        <hr />


        <hr />
      </div>
    </>
  );
};

export default EditExercise;
