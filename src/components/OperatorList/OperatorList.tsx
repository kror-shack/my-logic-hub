import React, { useEffect, useRef, useState } from "react";
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
  const [inputSelectionStart, setInputSelectionStart] = useState<number>();
  const [inputRefOffsetY, setInputRefOffsetY] = useState<number | null>(null);

  useEffect(() => {
    const setHeight = () => {
      if (inputRef.current) {
        const { top } = inputRef.current.getBoundingClientRect();
        setInputRefOffsetY(top);
      }
    };
    setHeight();
    window.addEventListener("scroll", setHeight);
    return () => {
      window.removeEventListener("scroll", setHeight);
    };
  }, []);

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
    const { selectionStart, selectionEnd } = inputRef.current;

    if (selectionStart === null || selectionEnd === null) return;
    // to get the desired position of the cursor after adding the operator
    let inputCursor =
      operatorIndex === 0
        ? selectionStart + 2
        : operatorIndex === 6
        ? selectionStart + 3
        : selectionStart + 1;
    setInputSelectionStart(inputCursor);

    const charac = getCharacter(operatorIndex);
    if (setInputFeildValues) {
      setInputFeildValues((prevValues) => {
        const updatedValues = [...prevValues];
        if (!index && index !== 0) return [...prevValues];
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
  }

  useEffect(() => {
    if (inputSelectionStart && inputRef.current) {
      inputRef.current.selectionStart = inputSelectionStart;
      inputRef.current.selectionEnd = inputSelectionStart;
    }
  }, [inputSelectionStart]);

  return (
    <div className="operator-list" style={{ top: `${inputRefOffsetY}px` }}>
      {quantifiable && (
        <button
          aria-label="Add universal quantifier"
          className="operator-button"
          type="button"
          onClick={() => handleOperatorButtonClick(4)}
        >
          &forall;
        </button>
      )}
      {quantifiable && (
        <button
          aria-label="Add existential quantifier"
          className="operator-button"
          type="button"
          onClick={() => handleOperatorButtonClick(5)}
        >
          &exist;
        </button>
      )}
      <button
        aria-label="Add material implication"
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(0)}
      >
        {String.fromCharCode(45)}&gt;
      </button>
      <button
        aria-label="Add and operator"
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(1)}
      >
        &and;
      </button>
      <button
        aria-label="Add or operator"
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(2)}
      >
        &or;
      </button>
      <button
        aria-label="Add negation"
        className="operator-button"
        type="button"
        onClick={() => handleOperatorButtonClick(3)}
      >
        &not;
      </button>
      <button
        aria-label="Add biconditional"
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
