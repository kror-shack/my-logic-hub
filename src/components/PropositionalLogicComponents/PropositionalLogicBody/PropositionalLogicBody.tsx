import React, { useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkinputForErrors from "../../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import getDeductionSteps from "../../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import parsePropositionalInput from "../../../utils/PropositionalLogicUtils/parsePropositionalInput/parsePropositionalInput";
import "./PropositionalLogicBody.scss";

const PropositionalLogicBody = () => {
  const [inputValues, setInputValues] = useState<string[]>(["p->q", "p"]);
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[]>([]);
  const [conclusion, setConclusion] = useState<string>("q");
  const [premiseLength, setPremsieLength] = useState<number>(
    inputValues.length
  );

  const handleInputChange = (index: number, value: string) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  const handleAddInput = (e: React.FormEvent) => {
    e.preventDefault();
    setInputValues((prevValues) => [...prevValues, ""]);
    setPremsieLength(inputValues.length);
  };

  function handleConclusionChange(e: string) {
    setConclusion(e);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    for (let i = 0; i < inputValues.length; i++) {
      const input = inputValues[i];
      const errors = checkinputForErrors(input, "PropLogic");
      if (errors !== true) alert(errors);
    }
    const newDeductionSteps = getDeductionSteps(inputValues, conclusion);

    if (newDeductionSteps) setDeductionSteps(newDeductionSteps);
    else setDeductionSteps([]);
  }

  function refresh() {
    setInputValues([]);
  }

  return (
    <div className="Propositional-logic-body">
      <form>
        <h2>Input Form</h2>
        {inputValues.map((value, index) => (
          <div>
            <label htmlFor={index.toString()}>{index + 1}</label>
            <input
              id={index.toString()}
              key={index}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          </div>
        ))}
        <button className="plus-button" onClick={(e) => handleAddInput(e)}>
          +
        </button>
        <input
          value={conclusion}
          onChange={(e) => handleConclusionChange(e.target.value)}
        ></input>
        <button onClick={(e) => handleSubmit(e)}>Deduce</button>
      </form>
      <button onClick={refresh}>Refresh</button>

      {deductionSteps.length > 0 ? (
        <div className="deduction-steps">
          <h2>Deduction Steps</h2>
          {deductionSteps.map((step, index) => (
            <div>
              <p>{premiseLength + index + 2}</p>
              <div className="step" key={index}>
                <p className="obtained">{step.obtained.join(", ")}</p>
                <p className="from">From: {step.from}</p>
                <p className="rule">Rule: {step.rule}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>This argument is invalid</h2>
        </div>
      )}
    </div>
  );
};

export default PropositionalLogicBody;
