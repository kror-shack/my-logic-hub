import React, { useEffect } from "react";
import "./OperatorList.scss";

type Props = {
  setInputFeildValues?: React.Dispatch<React.SetStateAction<string[]>>;
  setInputValue?: React.Dispatch<React.SetStateAction<string>>;
  index?: number;
  quantifiable?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const OperatorList = ({
  setInputFeildValues,
  quantifiable = false,
  inputRef,
  index,
  setInputValue,
}: Props) => {
  function updateInput(
    value: string,
    charac: string,
    selectionStart: number,
    selectionEnd: number
  ) {
    return (
      value.substring(0, selectionStart) +
      charac +
      value.substring(selectionEnd)
    );
  }

  function getCharacter(index: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
    switch (index) {
      case 0:
        return "->";
      case 1:
        return "\u2227";
      case 2:
        return "\u2228";

      case 3:
        return "\u00AC";

      case 4:
        return "\u2200";

      case 5:
        return "\u2203";

      case 6:
        return "<->";
    }
  }

  function handleOperatorButtonClick(operatorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6) {
    if (!inputRef.current) return;
    console.log("handling operator button click");
    const { selectionStart, selectionEnd } = inputRef.current;

    if (selectionStart === null || selectionEnd === null) return;
    const charac = getCharacter(operatorIndex);
    if (setInputFeildValues) {
      setInputFeildValues((prevValues) => {
        const updatedValues = [...prevValues];
        if (!index) return [...prevValues];
        const updatedInput = updateInput(
          updatedValues[index],
          charac,
          selectionStart,
          selectionEnd
        );

        updatedValues[index] = updatedInput;

        return updatedValues;
      });
    } else if (setInputValue) {
      setInputValue((prevValue) => {
        const updatedValue = updateInput(
          prevValue,
          charac,
          selectionStart,
          selectionEnd
        );
        return updatedValue;
      });
    }
    inputRef.current.focus();
    console.log(inputRef.current.selectionStart);
  }

  useEffect(() => {
    console.log(inputRef.current?.selectionStart);
  }, [inputRef.current?.selectionStart]);

  return (
    <div
      className="operator-list"
      style={{
        display:
          document.activeElement && document.activeElement.closest("input")
            ? "flex"
            : "none",
      }}
    >
      {quantifiable && (
        <button
          className="operator-button"
          type="button"
          onClick={() => handleOperatorButtonClick(4)}
        >
          &forall;
        </button>
      )}
      {quantifiable && (
        <button
          className="operator-button"
          type="button"
          onClick={() => handleOperatorButtonClick(5)}
        >
          &exist;
        </button>
      )}
      <button
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(0)}
      >
        {String.fromCharCode(45)}&gt;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(1)}
      >
        &and;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(2)}
      >
        &or;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(3)}
      >
        &not;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(6)}
      >
        {String.fromCharCode(60, 45, 62)}
      </button>
    </div>
  );
};

export default OperatorList;
