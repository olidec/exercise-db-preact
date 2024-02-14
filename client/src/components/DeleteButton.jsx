import { useState } from "preact/hooks";

const DeleteButton = ({ onDelete }) => {
  const handleClick = () => {
    onDelete();
  };

  return (
    <button className="pure-button-red" onClick={handleClick}>
      Delete
    </button>
  );
};

export default DeleteButton;
