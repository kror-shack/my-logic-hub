import React from "react";

import { useEffect, useRef, useState } from "react";
import Therefore from "../../public/assets/svgs/therefore.svg";
import "./SLInputForm.scss";
import OperatorList from "../OperatorList/OperatorList";
import checkQLInputForErrors from "../../utils/helperFunctions/checkQLInputForErrors/checkQLInputForErrors";
import { searchInArray } from "../../utils/helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { transformSymbolsForDisplay } from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import checkPropositionalInputForErrors from "../../utils/helperFunctions/checkPropositionalInputForErrors/checkPropositionalInputForErrors";
import SubmitButton from "../SubmitButton/SubmitButton";
import ImageTextExtractor from "../ImageTextExtractor/ImageTextExtractor";
import AddIcon from "../../../public/assets/svgs/add-icon.svg";
import { getInputError } from "../../utils/helperFunctions/getInputErrors/getInputErrors";

type Props = {
  setPremiseLength: React.Dispatch<React.SetStateAction<number>>;
  propositionArr: string[];
  getProof: (propositionArr: string[]) => void;
  isQuantifiable: boolean;
  isSemenaticTableax?: boolean;
};

/**
 *
 * An input form component.
 *
 * This component renders an input form for a propositional logic, symbolic logic or semantic tableaux
 * argument.
 * @component
 * @param {Object} Props - The component's props.
 * @param Props.setPremiseLength - A function to set the length of the total number of premises.
 * @param Props.propositionArr - An array containing the premises and conclusion
 * @param Props.isQuantifiable - A boolean representing whether the current argument should allow FOL wffs or not.
 * @param Props.getProof - A function which gets the steps/tree with the inputs
 * @param Props.isSemenaticTableax = False - A boolean representing whether the current argument would be for a semantic tableaux.
 * @returns - A JSX Element containing a dynamic form to input the argument.
 */
const SLInputForm = ({
  setPremiseLength,
  propositionArr,
  isQuantifiable,
  getProof,
  isSemenaticTableax = false,
}: Props) => {
  const [conclusion, setConclusion] = useState<string>(
    propositionArr[propositionArr.length - 1]
  );
  const [inputValues, setInputValues] = useState<string[]>(
    propositionArr.slice(0, propositionArr.length - 1)
  );
  const [focusIndex, setFocusIndex] = useState<number | string>();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleInputChange(index: number, value: string) {
    const transformedValue = transformSymbolsForDisplay(value);
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = transformedValue;
      return updatedValues;
    });

    inputRef.current?.focus();
  }

  function handleAddInput(e: React.FormEvent) {
    e.preventDefault();
    setFocusIndex(inputValues.length);
    setInputValues((prevValues) => [...prevValues, ""]);
    setPremiseLength((prev) => prev + 1);
  }

  useEffect(() => {
    if (focusIndex === undefined) return;

    inputRef.current?.focus();
  }, [focusIndex]);

  function handleConclusionChange(e: string) {
    const transformedValue = transformSymbolsForDisplay(e);
    setConclusion(transformedValue);
  }

  function handleDeleteInput(index: number) {
    if (index >= 0 && index < inputValues.length) {
      setInputValues((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues.splice(index, 1);
        return updatedValues;
      });
    }
    setPremiseLength((prev) => prev - 1);
  }

  function handleConclusionEnterClick(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
      setFocusIndex(undefined);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  function handleSubmit() {
    const errors = getInputError(inputValues, isQuantifiable, conclusion);
    console.log("🚀 ~ handleSubmit ~ errors:", errors);
    if (errors) {
      alert(errors);
      return;
    }
    const finalPropositionArr = [...inputValues, conclusion];

    getProof(finalPropositionArr);
  }

  const handleFocus = (index: number | "conc") => {
    if (index === "conc") setFocusIndex("conc");
    if (focusIndex === index) return;
    else setFocusIndex(index);
  };

  useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (
        !clickedElement.closest(".operator-button") &&
        !clickedElement.closest("input") &&
        !clickedElement.closest(".plus-button")
      )
        setFocusIndex(undefined);
    };

    if (focusIndex || focusIndex === 0) {
      document.addEventListener("click", handleBlur);
    }

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [focusIndex]);

  return (
    <form aria-label="Argument Input Form" className="SL-input-form">
      <div className="form-container">
        {inputValues.map((value, index) => (
          <div className="input-container" key={index.toString()}>
            <div>
              <div className="input">
                <label
                  htmlFor={index.toString()}
                  className={`form-label ${index > 8 ? "condensed" : ""}`}
                >
                  {index + 1}.
                </label>
                <input
                  id={index.toString()}
                  key={index}
                  value={value}
                  className="input-field"
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onFocus={() => handleFocus(index)}
                  ref={focusIndex === index ? inputRef : undefined}
                />
              </div>
              {focusIndex === index && (
                <OperatorList
                  setInputFeildValues={setInputValues}
                  quantifiable={isQuantifiable}
                  inputRef={inputRef}
                  index={index}
                />
              )}
            </div>
            <button
              aria-label="delete premise"
              type="button"
              className="delete-premise"
              onClick={() => handleDeleteInput(index)}
            >
              X
            </button>
          </div>
        ))}
        <div className="plus-button-container">
          <button className="plus-button" onClick={(e) => handleAddInput(e)}>
            <AddIcon />
            Add Premise
          </button>
        </div>
      </div>
      <div>
        <div>
          <div className="input-container">
            <div>
              <div className="input">
                <label htmlFor="conc">&#8756;</label>
                <input
                  id="conc"
                  value={conclusion}
                  onFocus={() => setFocusIndex("conc")}
                  ref={focusIndex === "conc" ? inputRef : undefined}
                  onChange={(e) => handleConclusionChange(e.target.value)}
                  onKeyDown={(e) => handleConclusionEnterClick(e)}
                ></input>
              </div>
              {focusIndex === "conc" && (
                <OperatorList
                  quantifiable={isQuantifiable}
                  inputRef={inputRef}
                  setInputValue={setConclusion}
                />
              )}
            </div>
          </div>
          <ImageTextExtractor
            setInputValues={setInputValues}
            setConclusion={setConclusion}
          />
        </div>
        <div className="deduce-button-container">
          <SubmitButton
            handleSubmit={handleSubmit}
            name={
              isSemenaticTableax
                ? "Generate Tree Proof"
                : "Write Deduction Steps"
            }
          />
        </div>
      </div>
    </form>
  );
};

export default SLInputForm;
