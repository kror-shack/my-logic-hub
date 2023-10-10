import React from "react";
import "./SubmitButton.scss";

type Props = {
  handleSubmit: () => void;
  name: string;
};

/**
 * Renders a reusable form submit button
 *
 * @component
 * @param Props- The objects Props
 * @param Props.handleSubmit - The form submit function for the component it is rendered in.
 * @param Props.name - The title of the button to be shown.
 * @returns - A JSX button element with a submit function as on-click.
 */
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
