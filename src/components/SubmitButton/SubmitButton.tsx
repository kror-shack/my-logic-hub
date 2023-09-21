import React from "react";
import "./SubmitButton.scss";

type Props = {
  handleSubmit: () => void;
  name: string;
};

const SubmitButton = ({ handleSubmit, name }: Props) => {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <button
      aria-label="Submit argument"
      className="submit-button"
      onClick={(e) => handleClick(e)}
    >
      {name}
    </button>
  );
};

export default SubmitButton;
