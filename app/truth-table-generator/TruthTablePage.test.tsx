import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TruthTablePage from "./page";

function setupComponent() {
  render(<TruthTablePage />);
}

const input = ["(P -> Q) -> P"];

const expectedTableData = {
  P: ["T", "T", "F", "F"],
  Q: ["T", "F", "T", "F"],
  "P -> Q": ["T", "F", "T", "T"],
  "( P -> Q ) -> P": ["T", "T", "F", "F"],
};

describe("TruthTablePage", () => {
  it("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /truth table/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("Render table with given input", async () => {
    setupComponent();
    const user = userEvent.setup();

    const premise = screen.getByRole("textbox", { name: "Argument :-" });
    expect(premise).toHaveDisplayValue(input);

    const submitButton = screen.getByRole("button", {
      name: /submit argument/i,
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
