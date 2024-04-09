import { h } from "preact";
import EditForm from "./EditForm.jsx";
import { WarenkorbContext } from "../signals/warenkorb.jsx";
import { useContext, useState } from "preact/hooks";
import { SearchContext } from "../signals/exercise.jsx";

const EditExercise = ({ id }) => {
  const { deleteCart } = useContext(SearchContext);
  return (
    <>
      <div className="inhalt">
        <h1>Edit Exercise mit ID {id} </h1>
        <button
          onClick={() => (window.location.href = `/exercise-db-preact/${id}`)}
          className="pure-button"
        >
          Zurück zu den Details
        </button>
        <hr></hr>

        <EditForm id={id} />

        <hr />

        <hr />

        <button
          className=" pure-button pure-button-third"
          onClick={() => deleteCart({ id })}
        >
          Delete aus DB
        </button>
      </div>
    </>
  );
};

export default EditExercise;
