import { useEffect, useRef, useState } from "react";
import { ReactComponent as Therefore } from "../../assets/svgs/therefore.svg";
import "./SLInputForm.scss";
import OperatorList from "../OperatorList/OpertorList";
import checkQLInputForErrors from "../../utils/HelperFunctions/checkQLInputForErrors/checkQLInputForErrors";
import { transformSymbolsForInput } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import checkInputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import { searchInArray } from "../../utils/HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";

type Props = {
  setPropositionArr: React.Dispatch<React.SetStateAction<string[]>>;
  setPremiseLength: React.Dispatch<React.SetStateAction<number>>;
  propositionArr: string[];
  isQuantifiable: boolean;
  isSemenaticTableax?: boolean;
};

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

  function handleInputChange(index: number, value: string) {
    const transformedValue = transformSymbolsForInput(value);
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = transformedValue;
      return updatedValues;
    });
  }

  function handleAddInput(e: React.FormEvent) {
    e.preventDefault();
    setInputValues((prevValues) => [...prevValues, ""]);
    setPremiseLength((prev) => prev + 1);
  }

  function handleConclusionChange(e: string) {
    const transformedValue = transformSymbolsForInput(e);
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
      console.log(errors);
      if (errors !== true) {
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
    if (errors !== true) {
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
    console.log("settnig the focus index" + inputRef.current?.selectionStart);

    if (index === "conc") setFocusIndex("conc");
    if (focusIndex === index) return;
    else setFocusIndex(index);
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
    <form className="SL-input-form">
      <div className="form-container">
        {inputValues.map((value, index) => (
          <div className="input-container" key={index}>
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
        <div className="conc-container">
          <label htmlFor="conc" className="conc-label">
            &#8756;
            <input
              id="conc"
              value={conclusion}
              onFocus={() => setFocusIndex("conc")}
              ref={focusIndex === "conc" ? inputRef : undefined}
              onChange={(e) => handleConclusionChange(e.target.value)}
            ></input>
          </label>
          {focusIndex === "conc" && (
            <OperatorList
              quantifiable={isQuantifiable}
              inputRef={inputRef}
              setInputValue={setConclusion}
            />
          )}
        </div>
        <div className="deduce-button-container">
          <button onClick={(e) => handleSubmit(e)} className="deduce-button">
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
