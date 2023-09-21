import React, { useState } from "react";
import checkVennInputForErrors from "../../../utils/VennDiagramUtils/checkVennInputForErrors/checkVennInputForErrors";
import SubmitButton from "../../SubmitButton/SubmitButton";
import "./ArgumentInputForm.scss";

type Props = {
  premiseOne: string;
  premiseTwo: string;
  conc: string;
  setPremiseOne: React.Dispatch<React.SetStateAction<string>>;
  setPremiseTwo: React.Dispatch<React.SetStateAction<string>>;
  setConc: React.Dispatch<React.SetStateAction<string>>;
};

/**
 * A React component which displays a form for Natural Language input.
 *
 * This component renders the input form, and alerts if the inputs are not
 * a valid form categorical syllogism.
 *
 * @component
 * @param Props.premiseOne - The first premise of the syllogistic argument.
 * @param Props.setPremiseOne - A function to update the first premise.
 *
 * @param Props.premiseTwo - The second premise of the syllogistic argument.
 * @param Props.setPremiseTwo - A function to update the second premise.
 *
 * @param Props.conc - The conclusion of the syllogistic argument.
 * @param Props.setConc - A function to update the conclusion.
 *
 *
 * @returns - A JSX element with the input form.
 */
const ArgumentInputForm = ({
  premiseOne,
  premiseTwo,
  conc,
  setPremiseOne,
  setPremiseTwo,
  setConc,
}: Props) => {
  const [inputOne, setInputOne] = useState(premiseOne);
  const [inputTwo, setInputTwo] = useState(premiseTwo);
  const [inputThree, setInputThree] = useState(conc);

  function handleSubmit() {
    const errors = checkVennInputForErrors([inputOne, inputTwo, inputThree]);
    if (errors) {
      alert(errors);
      return;
    }

    setPremiseOne(inputOne);
    setPremiseTwo(inputTwo);
    setConc(inputThree);
  }

  return (
    <div className="Argument-input-form">
      <form role="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="premiseOne" className="form-label ha-screen-reader">
            1.
          </label>
          <input
            aria-label="First premise"
            type="text"
            id="premiseOne"
            name="premiseOne"
            className="field__input"
            placeholder="All S is P"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label
            aria-label="Second premise"
            htmlFor="premiseTwo"
            className="form-label ha-screen-reader"
          >
            2.
          </label>
          <input
            type="text"
            id="premiseTwo"
            name="premiseOne"
            className="field__input"
            placeholder="Some Q is S"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
            required
          />
        </div>

        <div className="input-container">
          <label
            aria-label="Conclusion"
            htmlFor="premiseThree"
            className="form-label ha-screen-reader"
          >
            3.
          </label>
          <input
            type="text"
            id="premiseThree"
            name="premiseThree"
            className="field__input"
            placeholder="Therefore, some Q is P"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
            required
          />
        </div>

        <div className="button-container">
          <SubmitButton
            handleSubmit={handleSubmit}
            name="Generate Venn Diagram"
          />
        </div>
      </form>
    </div>
  );
};

export default ArgumentInputForm;
