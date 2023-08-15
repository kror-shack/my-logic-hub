import { useRef, useState } from "react";
import checkinputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import { ReactComponent as Therefore } from "../../assets/svgs/therefore.svg";
import "./SLInputForm.scss";
import OperatorList from "../OperatorList/OpertorList";
import checkQLInputForErrors from "../../utils/HelperFunctions/checkQLInputForErrors/checkQLInputForErrors";

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
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  }

  function handleAddInput(e: React.FormEvent) {
    e.preventDefault();
    setInputValues((prevValues) => [...prevValues, ""]);
    setPremiseLength((prev) => prev + 1);
  }

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
      const errors = isQuantifiable
        ? checkQLInputForErrors(input)
        : checkinputForErrors(input, "PropLogic");
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
      : checkinputForErrors(conclusion, "PropLogic");
    if (errors !== true) alert("Error on conclusion: " + errors);
    console.log(errors);
    setPropositionArr([...inputValues, conclusion]);
  }

  const handleFocus = (index: number | "conc") => {
    console.log("settnig the focus index" + index);
    if (index === "conc") setFocusIndex("conc");
    else setFocusIndex(index);
  };

  return (
    <form className="SL-input-form">
      <div className="input-container">
        {inputValues.map((value, index) => (
          <div key={index}>
            <div>
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
                  ref={focusIndex === index ? inputRef : undefined}
                />
              </div>
              {focusIndex === index && (
                <OperatorList
                  setInputFeildValue={setInputValues}
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
              quantifiable={isQuantifiable}
              inputRef={inputRef}
              setConcValue={setConclusion}
            />
          )}
        </div>
        <div className="deduce-button-container">
          <button onClick={(e) => handleSubmit(e)} className="deduce-button">
            {isSemenaticTableax ? "Generate Tree Proof" : "Deduce"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SLInputForm;
