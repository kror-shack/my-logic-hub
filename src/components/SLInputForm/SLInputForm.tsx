import { useEffect, useRef, useState } from "react";
import { ReactComponent as Therefore } from "../../assets/svgs/therefore.svg";
import "./SLInputForm.scss";
import OperatorList from "../OperatorList/OperatorList";
import checkQLInputForErrors from "../../utils/HelperFunctions/checkQLInputForErrors/checkQLInputForErrors";
import checkInputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import { searchInArray } from "../../utils/HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { transformSymbolsForDisplay } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";

type Props = {
  setPropositionArr: React.Dispatch<React.SetStateAction<string[]>>;
  setPremiseLength: React.Dispatch<React.SetStateAction<number>>;
  propositionArr: string[];
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
 * @param Props.setPropositionArr - A function to set the new proposition array
 * @param Props.setPremiseLength - A function to set the length of the total number of premises.
 * @param Props.propositionArr - An array containing the premises and conclusion
 * @param Props.isQuantifiable - A boolean representing whether the current argument should allow FOL wffs or not.
 * @param Props.isSemenaticTableax = False - A boolean representing whether the current argument would be for a semantic tableaux.
 * @returns - A JSX Element containing a dynamic form to input the argument.
 */
const SLInputForm = ({
  setPropositionArr,
  setPremiseLength,
  propositionArr,
  isQuantifiable,
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
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);

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
    setInputValues((prevValues) => [...prevValues, ""]);
    setPremiseLength((prev) => prev + 1);
  }

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    for (let i = 0; i < inputValues.length; i++) {
      const input = inputValues[i];
      const errors = isQuantifiable
        ? checkQLInputForErrors(input)
        : checkInputForErrors(input);
      if (errors !== false) {
        alert(`Error on premise ${i + 1}:  ${errors}`);
        return;
      }
    }

    if (!conclusion) {
      alert("Please enter a conclusion");
      return;
    }

    const errors = isQuantifiable
      ? checkQLInputForErrors(conclusion)
      : checkInputForErrors(conclusion);
    if (errors !== false) {
      alert("Error on conclusion: " + errors);
      return;
    }
    if (inputValues.includes(conclusion)) {
      alert(
        `The conclusion corresponds with premise ${
          inputValues.indexOf(conclusion) + 1
        }`
      );
      return;
    }
    setPropositionArr([...inputValues, conclusion]);
  }

  const handleFocus = (index: number | "conc") => {
    if (index === "conc") setFocusIndex("conc");
    if (focusIndex === index) return;
    else setFocusIndex(index);
  };

  const handleConclusionEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === "Enter" && submitBtnRef.current) {
      submitBtnRef.current.click();
    }
  };

  useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (
        !clickedElement.closest(".operator-button") &&
        !clickedElement.closest("input")
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
                <label htmlFor={index.toString()} className="form-label">
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
        </div>
        <div className="deduce-button-container">
          <button
            ref={submitBtnRef}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="deduce-button"
          >
            {isSemenaticTableax
              ? "Generate Tree Proof"
              : "Write Deduction Steps"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SLInputForm;
