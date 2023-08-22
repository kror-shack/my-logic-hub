import React, { useState } from "react";
import checkVennInputForErrors from "../../../utils/VennDiagramUtils/checkVennInputForErrors/checkVennInputForErrors";
import "./ArgumentInputForm.scss";

type Props = {
  premiseOne: string;
  premiseTwo: string;
  conc: string;
  setPremiseOne: React.Dispatch<React.SetStateAction<string>>;
  setPremiseTwo: React.Dispatch<React.SetStateAction<string>>;
  setConc: React.Dispatch<React.SetStateAction<string>>;
};

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

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
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
          <label htmlFor="premiseTwo" className="form-label ha-screen-reader">
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
          <label htmlFor="premiseThree" className="form-label ha-screen-reader">
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

        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default ArgumentInputForm;
