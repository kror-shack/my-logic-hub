import React, { useEffect, useRef, useState } from "react";
import checkInputForErrors from "../../utils/HelperFunctions/checkInputForErrors/checkInputForError";
import {
  transformSymbolsForInput,
  transformSymbolsForProcessing,
} from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import formatOutut from "../../utils/TruthTableUtils/formatOutput/formatOutput";
import getTruthTable from "../../utils/TruthTableUtils/getTruthTable/getTruthTable";
import NotebookLines from "../NotebookLines/NotebookLines";
import OperatorList from "../OperatorList/OpertorList";
import "./TruthTableBody.scss";

interface TableData {
  [key: string]: string[];
}

const TruthTableBody: React.FC = () => {
  const [inputValue, setInputValue] = useState("(P -> Q) -> P");
  const [tableData, setTableData] = useState<TableData | null>(null);
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = checkInputForErrors(inputValue);
    if (
      errors !== true
      // &&
      // errors !== "Use of lowercase letters as predicates is not recommended."
    )
      /**
       * Lowercase letters are permitted since
       * strict restrictions are not necessary for a truth table.
       */
      alert(errors);
    else {
      const truthTable = getTruthTable(inputValue);
      setTableData(truthTable);
    }
  };

  function handleInputChange(value: string) {
    const transformedValue = transformSymbolsForInput(value);
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

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>

        {tableData && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {Object.keys(tableData).map(
                    (column: string, index: number) => (
                      <th key={index}>
                        {transformSymbolsForInput(formatOutut(column))}
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
        )}
      </div>
    </main>
  );
};

export default TruthTableBody;
