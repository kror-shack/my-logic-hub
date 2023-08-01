import React from "react";
import "./OperatorList.scss";

type Props = {
  setInputFeildValue: React.Dispatch<React.SetStateAction<string[]>>;
  setConcValue?: React.Dispatch<React.SetStateAction<string>>;
  index?: number;
  quantifiable?: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
};

const OperatorList = ({
  setInputFeildValue,
  quantifiable = false,
  inputRef,
  index,
  setConcValue,
}: Props) => {
  console.log(inputRef.current);
  console.log(document.activeElement);
  function handleSvgButtonClick(svgIndex: number) {
    if (!inputRef.current) return;
    if (!index && index !== 0) {
      if (setConcValue) {
        const { selectionStart, selectionEnd } = inputRef.current;
        if (!(selectionStart === null || selectionEnd === null)) {
          setConcValue(
            (prev) =>
              prev.substring(0, selectionStart) +
              "->" +
              prev.substring(selectionEnd)
          );
        }
      }
      return;
    }

    inputRef.current.focus();

    switch (svgIndex) {
      case 0:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "->" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
      case 1:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "&" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
      case 2:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "|" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
      case 3:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "~" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
      case 4:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "\u2200" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
      case 5:
        setInputFeildValue((prevValues) => {
          const updatedValues = [...prevValues];
          if (!inputRef.current) return [...prevValues];
          const { selectionStart, selectionEnd } = inputRef.current;
          if (selectionStart === null || selectionEnd === null)
            return [...prevValues];
          updatedValues[index] =
            updatedValues[index].substring(0, selectionStart) +
            "\u2203" +
            updatedValues[index].substring(selectionEnd);
          return updatedValues;
        });
        break;
    }
  }

  return (
    <div
      className="operator-list"
      style={{
        display:
          document.activeElement && document.activeElement.closest("input")
            ? "block"
            : "none",
      }}
    >
      {quantifiable && (
        <button
          className="operator-button"
          type="button"
          onClick={() => handleSvgButtonClick(4)}
        >
          &forall;
        </button>
      )}
      {quantifiable && (
        <button
          className="operator-button"
          type="button"
          onClick={() => handleSvgButtonClick(5)}
        >
          &exist;
        </button>
      )}
      <button
        className="operator-button"
        type="button"
        onClick={() => handleSvgButtonClick(0)}
      >
        &rarr;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleSvgButtonClick(1)}
      >
        &and;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleSvgButtonClick(2)}
      >
        &or;
      </button>
      <button
        className="operator-button"
        type="button"
        onClick={() => handleSvgButtonClick(3)}
      >
        &not;
      </button>
    </div>
  );
};

export default OperatorList;
