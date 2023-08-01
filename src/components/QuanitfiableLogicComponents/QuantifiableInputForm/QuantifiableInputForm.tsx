import { useEffect, useRef, useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import parsePropositionalInput from "../../../utils/PropositionalLogicUtils/parsePropositionalInput/parsePropositionalInput";
import checkinputForErrors from "../../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import { ReactComponent as TrashBin } from "../../../assets/svgs/trash-bin.svg";
import { ReactComponent as Therefore } from "../../../assets/svgs/therefore.svg";

import OperatorList from "../../OperatorList/OpertorList";

type Props = {
  setPropositionArr: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setPremiseLength: React.Dispatch<React.SetStateAction<number>>;
};

const QuanitfiableInputForm = ({
  setPropositionArr,
  setPremiseLength,
}: Props) => {
  const [inputValues, setInputValues] = useState<string[]>([
    "\u2200(x) p^x -> ~q^x",
    "\u2200(x) p^x",
  ]);
  const [conclusion, setConclusion] = useState<string>("\u2200(x) p^x ");
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusIndex, setFocusIndex] = useState<number | string>();
  const [inputIsFocused, setInputIsFocused] = useState(false);

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
    setPremiseLength((prev) => prev + 1);
  };

  function handleConclusionChange(e: string) {
    setConclusion(e);
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
      const errors = checkinputForErrors(input, "PropLogic");
      if (errors !== true) alert(errors);
    }

    setPropositionArr([...inputValues, conclusion]);
  }

  const handleFocus = (index: number | "conc") => {
    console.log("settnig the focus index" + index);
    if (index === "conc") setFocusIndex("conc");
    else setFocusIndex(index);
  };

  useEffect(() => {
    setPremiseLength(inputValues.length + 1);
  }, []);

  function handleBlur() {
    setInputIsFocused(false);
  }

  function focusIsRemoved() {
    const focusedElement = document.activeElement as HTMLElement;
    const isInputOrDescendant = focusedElement.closest("input");

    if (!isInputOrDescendant) {
      return false;
    } else return true;
  }

  return (
    <form className="Proposition-input-form">
      <div className="input-container">
        {inputValues.map((value, index) => (
          <div key={index}>
            <div>
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
                onBlur={handleBlur}
                ref={focusIndex === index ? inputRef : undefined}
              />
              {focusIndex === index && (
                <OperatorList
                  setInputFeildValue={setInputValues}
                  inputRef={inputRef}
                  index={index}
                  quantifiable={true}
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
            <Therefore />
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
              setInputFeildValue={setInputValues}
              inputRef={inputRef}
              setConcValue={setConclusion}
            />
          )}
        </div>

        <div className="deduce-button-container">
          <button onClick={(e) => handleSubmit(e)} className="deduce-button">
            Deduce
          </button>
        </div>
      </div>
    </form>
  );
};
export default QuanitfiableInputForm;
