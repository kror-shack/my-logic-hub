"use client";
import React, { useEffect, useRef, useState } from "react";
import checkInputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import checkPropositionalInputForErrors from "../../utils/HelperFunctions/checkPropositionalInputForErrors/checkPropositionalInputForErrors";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../..//utils/HelperFunctions/tranfromSymbols/transformSymbols";
import formatOutut from "../../utils/TruthTableUtils/formatOutput/formatOutput";
import getTruthTable from "../../utils/TruthTableUtils/getTruthTable/getTruthTable";
import InfoLink from "../InfoLink/InfoLink";
import NotebookLines from "../NotebookLines/NotebookLines";
import OperatorList from "../OperatorList/OperatorList";
import SubmitButton from "../SubmitButton/SubmitButton";
import "./TruthTableBody.scss";
import ImageTextExtractor from "../ImageTextExtractor/ImageTextExtractor";
import removeOutermostBrackets from "../../utils/HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import countVariables from "../../utils/TruthTableUtils/getTruthTable/getTruthTableHelpers/getTruthTableHelperFunctions";
import { convertStringToArray } from "../../utils/TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import parseInput from "../../utils/TruthTableUtils/parseInput/parseInput";
import validateTruthTableInput from "../../utils/HelperFunctions/validateTruthTableInput/validateTruthTableInput";

interface TableData {
  [key: string]: string[];
}

/**
 * A React component that displays the body of the Truth Table.
 *
 * @returns A JSX Element with the input form a table.
 */
const TruthTableBody = () => {
  const [inputValue, setInputValue] = useState("(P -> Q) -> P");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const errors = validateTruthTableInput(inputValue);
    if (errors) {
      alert(errors);
      return;
    } else {
      if (countVariables(parseInput(inputValue)) > 8) {
        alert(
          "Caution: Using more than 8 predicates may result in slower performance. For example, for a truth table of 8 predicates, 2^8 = 256 truth values must be assigned for a single predicate."
        );
      }
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
              <table data-cy="truth-table">
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
