import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import checkInputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import checkPropositionalInputForErrors from "../../utils/HelperFunctions/checkPropositionalInputForErrors/checkPropositionalInputForErrors";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import formatOutut from "../../utils/TruthTableUtils/formatOutput/formatOutput";
import getTruthTable from "../../utils/TruthTableUtils/getTruthTable/getTruthTable";
import InfoLink from "../InfoLink/InfoLink";
import NotebookLines from "../NotebookLines/NotebookLines";
import OperatorList from "../OperatorList/OperatorList";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./TruthTableBody.scss";
import ImageTextExtractor from "../ImageTextExtractor/ImageTextExtractor";
import removeOutermostBrackets from "../../utils/HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

interface TableData {
  [key: string]: string[];
}

type Props = {
  setNotebookLinesRender: React.Dispatch<React.SetStateAction<number>>;
};

/**
 * A React component that displays the body of the Truth Table.
 *
 * @returns A JSX Element with the input form a table.
 */
const TruthTableBody = ({ setNotebookLinesRender }: Props) => {
  const [inputValue, setInputValue] = useState("(P -> Q) -> P");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const errors = checkPropositionalInputForErrors(inputValue);
    if (
      errors &&
      errors !== "Use of lowercase letters as predicates is not recommended."
    )
      /**
       * Lowercase letters are permitted since
       * strict restrictions are not necessary for a truth table.
       * Uppercase and lowercase variations of the same alphabet are
       * treated as distinct predicates.
       */
      alert(errors);
    else {
      const truthTable = getTruthTable(inputValue);
      setTableData(truthTable);
    }
  };

  function handleInputChange(value: string) {
    const transformedValue = transformSymbolsForDisplay(value);
    setInputValue(transformedValue);
  }

  useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (
        !clickedElement.closest(".operator-button") &&
        !clickedElement.closest("input")
      )
        setInputIsFocused(false);
      else setInputIsFocused(true);
    };

    document.addEventListener("click", handleBlur);

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, []);

  useEffect(() => {
    setNotebookLinesRender((prev) => prev + 1);
  }, [tableData]);

  return (
    <main>
      <div className="Truth-table-body">
        <form role="form" onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="argument">Argument :-</label>
            <input
              type="text"
              value={inputValue}
              id="argument"
              ref={inputRef}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Enter logical equation"
            />
            {inputIsFocused && (
              <OperatorList
                setInputValue={setInputValue}
                quantifiable={false}
                inputRef={inputRef}
              />
            )}
          </div>
          <ImageTextExtractor setConclusion={setInputValue} />
          <SubmitButton handleSubmit={handleSubmit} name="Get Truth Table" />
        </form>

        {tableData && (
          <div className="table-container">
            <div className="table-overflow">
              <table>
                <thead>
                  <tr>
                    {Object.keys(tableData).map(
                      (column: string, index: number) => (
                        <th key={index}>
                          {transformSymbolsForDisplay(
                            formatOutut(
                              removeOutermostBrackets(column.split("")).join("")
                            )
                          )}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {tableData[Object.keys(tableData)[0]].map(
                    (_, rowIndex: number) => (
                      <tr key={rowIndex}>
                        {Object.keys(tableData).map(
                          (column: string, columnIndex: number) => (
                            <td key={columnIndex}>
                              {tableData[column][rowIndex]}
                            </td>
                          )
                        )}
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TruthTableBody;
