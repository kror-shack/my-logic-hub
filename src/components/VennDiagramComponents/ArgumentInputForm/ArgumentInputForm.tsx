import React, { useState } from "react";
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
    setPremiseOne(inputOne);
    setPremiseTwo(inputTwo);
    setConc(inputThree);
  }

  return (
    <div className="Argument-input-form">
      <form role="form" onSubmit={handleSubmit}>
        <div className="field field_v1">
          <label htmlFor="premiseOne" className="form-label ha-screen-reader">
            Premise One
          </label>
          <input
            type="text"
            id="premiseOne"
            name="premiseOne"
            className="field__input"
            placeholder="Soemthing"
            value={inputOne}
            onChange={(e) => setInputOne(e.target.value)}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Premise One</span>
          </span>
        </div>
        <div className="field field_v2">
          <label htmlFor="premiseTwo" className="form-label ha-screen-reader">
            Premise Two
          </label>
          <input
            type="text"
            id="premiseTwo"
            name="premiseOne"
            className="field__input"
            placeholder="Soemthing"
            value={inputTwo}
            onChange={(e) => setInputTwo(e.target.value)}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Premise Two</span>
          </span>
        </div>

        <div className="field field_v3">
          <label htmlFor="premiseThree" className="form-label ha-screen-reader">
            Premise Three
          </label>
          <input
            type="text"
            id="premiseThree"
            name="premiseThree"
            className="field__input"
            placeholder="Soemthing"
            value={inputThree}
            onChange={(e) => setInputThree(e.target.value)}
          />
          <span className="field__label-wrap" aria-hidden="true">
            <span className="field__label">Premise Three</span>
          </span>
        </div>
        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default ArgumentInputForm;
