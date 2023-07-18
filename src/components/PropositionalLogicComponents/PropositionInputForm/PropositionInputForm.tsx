import { useEffect, useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import parsePropositionalInput from "../../../utils/PropositionalLogicUtils/parsePropositionalInput/parsePropositionalInput";
import checkinputForErrors from "../../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import { ReactComponent as TrashBin } from "../../../assets/svgs/trash-bin.svg";
import { ReactComponent as Therefore } from "../../../assets/svgs/therefore.svg";

import "./PropositionInputForm.scss";

type Props = {
  setPropositionArr: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  setPremiseLength: React.Dispatch<React.SetStateAction<number>>;
};

const PropositionInputForm = ({
  setPropositionArr,
  setPremiseLength,
}: Props) => {
  const [inputValues, setInputValues] = useState<string[]>([
    "( ~S & ~H) -> D",
    "~H -> R",
    "H -> T",
    "~R & Q",
    "T -> ~D",
  ]);
  const [conclusion, setConclusion] = useState<string>(
    "( ~S -> T ) & ( ~ Q -> D) "
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

  useEffect(() => {
    setPremiseLength(inputValues.length + 1);
  }, []);

  return (
    <form>
      <div className="input-container">
        {inputValues.map((value, index) => (
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
            />
            <button type="button" onClick={() => handleDeleteInput(index)}>
              <TrashBin />
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
        <label htmlFor="conc" className="conc-label">
          <Therefore />
          <input
            id="conc"
            value={conclusion}
            onChange={(e) => handleConclusionChange(e.target.value)}
          ></input>
        </label>
        <button onClick={(e) => handleSubmit(e)} className="deduce-button">
          Deduce
        </button>
      </div>
    </form>
  );
};

export default PropositionInputForm;
