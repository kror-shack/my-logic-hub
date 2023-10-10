import React, { useState } from "react";
import checkVennInputForErrors from "../../../utils/VennDiagramUtils/checkVennInputForErrors/checkVennInputForErrors";
import SubmitButton from "../../SubmitButton/SubmitButton";
import "./ArgumentInputForm.scss";
import ImageTextExtractor from "../../ImageTextExtractor/ImageTextExtractor";

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
  const [inputValues, setInputValues] = useState<string[]>([
    premiseOne,
    premiseTwo,
  ]);
  const [inputConclusion, setInputConclusion] = useState<string>(conc);

  function handleInputChange(index: number, value: string) {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  }

  function handleSubmit() {
    if (
      inputValues.some((value) => value.length < 1) ||
      inputConclusion.length < 1
    ) {
      alert("A valid syllogistic argument must have 2 premises.");
      return;
    } else if (inputConclusion.length < 1) {
      alert("A valid syllogistic argument must have a conclusion.");
      return;
    }
    const errors = checkVennInputForErrors([
      inputValues[0],
      inputValues[1],
      inputConclusion,
    ]);
    if (errors) {
      alert(errors);
      return;
    }

    setPremiseOne(inputValues[0]);
    setPremiseTwo(inputValues[1]);
    setConc(inputConclusion);
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
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
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
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
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
            value={inputConclusion}
            onChange={(e) => setInputConclusion(e.target.value)}
            required
          />
        </div>
        <ImageTextExtractor
          setInputValues={setInputValues}
          setConclusion={setInputConclusion}
          vennDiagram={true}
        />

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
