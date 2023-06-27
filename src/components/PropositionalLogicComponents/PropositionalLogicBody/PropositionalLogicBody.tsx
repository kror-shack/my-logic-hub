import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import checkinputForErrors from "../../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import getDeductionSteps from "../../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import parsePropositionalInput from "../../../utils/PropositionalLogicUtils/parsePropositionalInput/parsePropositionalInput";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import "./PropositionalLogicBody.scss";

const PropositionalLogicBody = () => {
  const [inputValues, setInputValues] = useState<string[]>(["p->q", "p"]);
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[]>([]);
  const [conclusion, setConclusion] = useState<string>("q");
  const [premiseLength, setPremsieLength] = useState<number>(
    inputValues.length + 1
  );
  const [showRule, setShowRule] = useState<number | null>(null);

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
    setPremsieLength((prev) => prev + 1);
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

  function handleDeleteInput(index: number) {
    if (index >= 0 && index < inputValues.length) {
      setInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues.splice(index, 1);
        return updatedValues;
      });
    }
    setPremsieLength((prev) => prev - 1);
  }

  useEffect(() => {
    const newDeductionSteps = getDeductionSteps(inputValues, conclusion);

    if (newDeductionSteps) setDeductionSteps(newDeductionSteps);
  }, []);

  function showRuleInfo(index: number) {
    console.log(showRule);
    console.log(index);
    if (showRule || showRule === 0) setShowRule(null);
    else setShowRule(index);
  }

  function removeCommas(str: string | number): string | number {
    if (typeof str === "string") return str.replace(/,/g, "");
    return str;
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
            <button type="button" onClick={() => handleDeleteInput(index)}>
              x
            </button>
          </div>
        ))}
        <button className="plus-button" onClick={(e) => handleAddInput(e)}>
          +
        </button>
        <label htmlFor="conc">Conc :</label>
        <input
          id="conc"
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
            <div key={index}>
              <p>{premiseLength + index}</p>
              <div className="step">
                <p className="obtained">
                  {removeCommas(step.obtained.join(", "))}
                </p>
                <p className="from">From: {step.from}</p>
                <p className="rule">Rule: {step.rule}</p>
              </div>
              <button onClick={() => showRuleInfo(index)}>i</button>
              {showRule === index && <DeductionalRuleInfo rule={step.rule} />}
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
