import React, { useState } from "react";
import checkinputForErrors from "../../../utils/TruthTableUtils/checkInputForErrors/checkInputForError";
import getTruthTable from "../../../utils/TruthTableUtils/getTruthTable/getTruthTable";
// import "./TruthTableBody.scss";

interface TableData {
  [key: string]: string[];
}

const TruthTableBody: React.FC = () => {
  const [inputValue, setInputValue] = useState("p -> q");
  const [tableData, setTableData] = useState<TableData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = checkinputForErrors(inputValue);
    if (errors !== true) alert(errors);
    else {
      const truthTable = getTruthTable(inputValue);

      setTableData(truthTable);
    }
  };

  function addSpacesToString(input: string): string {
    const output = input.replace(
      /(?<!->|<->)(?!->|<->)\S/g,
      (match) => `${match} `
    );
    return output.trim();
  }

  return (
    <div className="Truth-table-body">
      <form role="form" onSubmit={handleSubmit}>
        <label htmlFor="argument">Argument</label>
        <input
          type="text"
          value={inputValue}
          id="argument"
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter logical equation"
        />
        <button type="submit">Submit</button>
      </form>

      {tableData && (
        <table>
          <thead>
            <tr>
              {Object.keys(tableData).map((column: string, index: number) => (
                <th key={index}>{addSpacesToString(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData[Object.keys(tableData)[0]].map((_, rowIndex: number) => (
              <tr key={rowIndex}>
                {Object.keys(tableData).map(
                  (column: string, columnIndex: number) => (
                    <td key={columnIndex}>{tableData[column][rowIndex]}</td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TruthTableBody;
