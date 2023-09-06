import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import TruthTableBody from "./TruthTableBody";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

function setupComponent() {
  render(
    <MemoryRouter>
      <TruthTableBody />
    </MemoryRouter>
  );
}

const input = ["(P -> Q) -> P"];

const expectedTableData = {
  P: ["T", "T", "F", "F"],
  Q: ["T", "F", "T", "F"],
  "P -> Q": ["T", "F", "T", "T"],
  "( ( P -> Q ) -> P )": ["T", "T", "F", "F"],
};

describe("TruthTableBody", () => {
  it("Render table with given input", async () => {
    setupComponent();
    const user = userEvent.setup();

    const premise = screen.getByRole("textbox", { name: "Argument :-" });
    expect(premise).toHaveDisplayValue(input);

    const submitButton = screen.getByRole("button", {
      name: /get truth table/i,
    });

    await user.click(submitButton);

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(Object.keys(expectedTableData).length);
    Object.keys(expectedTableData).forEach((column, index) => {
      expect(columnHeaders[index]).toHaveTextContent(column);
    });
  });
});

export {};
