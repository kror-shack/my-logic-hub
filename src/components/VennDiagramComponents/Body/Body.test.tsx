import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Body from "./Body";
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
    const headings = screen.getAllByRole("heading");

    await (() => {
      expect(headings[0].textContent).toMatch(/Something/i);
      expect(screen.getByLabelText("Premise One").textContent).toMatch(
        /All men are mortal./i
      );
      expect(screen.getByLabelText("Premise Two")).toHaveValue(
        "Socrates is a man."
      );
      expect(screen.getByLabelText("Conclusion")).toHaveValue(
        "Therefore, Socrates is mortal."
      );
    });

    // Simulate user input by changing the values in the input fields
    fireEvent.change(screen.getByLabelText("Premise One"), {
      target: { value: "All birds can fly." },
    });
    fireEvent.change(screen.getByLabelText("Premise Two"), {
      target: { value: "Eagles are birds." },
    });
    fireEvent.change(screen.getByLabelText("Conclusion"), {
      target: { value: "Therefore, eagles can fly." },
    });

    // Assert that the input values have been updated
    await (() => {
      expect(screen.getByLabelText("Premise One")).toHaveValue(
        "All birds can fly."
      );
      expect(screen.getByLabelText("Premise Two")).toHaveValue(
        "Eagles are birds."
      );
      expect(screen.getByLabelText("Conclusion")).toHaveValue(
        "Therefore, eagles can fly."
      );

      // Assert that the syllogistic figure has been updated
      expect(screen.getByText("Venn Canvas")).toBeInTheDocument();
      expect(screen.getByText("Syllogistic Details")).toBeInTheDocument();
    });
  });
});
