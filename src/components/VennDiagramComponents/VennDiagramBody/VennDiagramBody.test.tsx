import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Body from "./VennDiagramBody";
import ArgumentInputForm from "../ArgumentInputForm/ArgumentInputForm";

describe("Body", () => {
  const premiseOne = "All men are mortal.";
  const premiseTwo = "Socrates is a man.";
  const conc = "Therefore, Socrates is mortal.";
  const setPremiseOne = jest.fn();
  const setPremiseTwo = jest.fn();
  const setConc = jest.fn();

  test("renders the argument input form and updates the syllogistic figure", async () => {
    render(<Body />);

    // Assert that the initial values are displayed in the input fields

    await (() => {
      expect(screen.getByLabelText("1.").textContent).toMatch(
        /All men are mortal./i
      );
      expect(screen.getByLabelText("2.")).toHaveValue("Socrates is a man.");
      expect(screen.getByLabelText("3.")).toHaveValue(
        "Therefore, Socrates is mortal."
      );
    });

    // Simulate user input by changing the values in the input fields
    fireEvent.change(screen.getByLabelText("1."), {
      target: { value: "All birds can fly." },
    });
    fireEvent.change(screen.getByLabelText("2."), {
      target: { value: "Eagles are birds." },
    });
    fireEvent.change(screen.getByLabelText("3."), {
      target: { value: "Therefore, eagles can fly." },
    });

    // Assert that the input values have been updated
    await (() => {
      expect(screen.getByLabelText("1.")).toHaveValue("All birds can fly.");
      expect(screen.getByLabelText("2.")).toHaveValue("Eagles are birds.");
      expect(screen.getByLabelText("3.")).toHaveValue(
        "Therefore, eagles can fly."
      );

      // Assert that the syllogistic figure has been updated
      expect(screen.getByText("Venn Canvas")).toBeInTheDocument();
      expect(screen.getByText("Syllogistic Details")).toBeInTheDocument();
    });
  });
});
