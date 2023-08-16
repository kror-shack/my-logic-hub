import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TruthTableBody from "./TruthTableBody";
import "@testing-library/jest-dom/extend-expect";

describe("TruthTableBody", () => {
  test("Render table with given input", async () => {
    const input = "p -> q";
    const expectedTableData = {
      p: ["T", "T", "F", "F"],
      q: ["T", "F", "T", "F"],
      "p -> q": ["T", "F", "T", "T"],
    };

    render(<TruthTableBody />);

    const premiseTwoInput = screen.getByLabelText("Argument");
    fireEvent.change(premiseTwoInput, { target: { value: input } });

    const handleSubmit = jest.fn();
    const form = screen.getByRole("form");

    fireEvent.submit(form);
    await (() => {
      expect(handleSubmit).toHaveBeenCalled();
    });

    // Assert column headers
    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(Object.keys(expectedTableData).length);
    Object.keys(expectedTableData).forEach((column, index) => {
      expect(columnHeaders[index]).toHaveTextContent(column);
    });

    // Assert table rows
  });
});

export {};
