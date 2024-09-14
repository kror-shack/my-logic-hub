import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import TruthFEBody from "./TruthFEBody";

function setupComponent() {
  render(<TruthFEBody />);
}

const intitalArguments = [
  "\u2200x \u2203y(Fx <-> Gy)",
  "\u2203y \u2200x(Fx <-> Gy)",
];

const intialDeductionSteps = [
  "The universe of this counter model is U:{ 0,1 }.",
  "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
  "F: { 0 }",
  "G: { 0 }",
  "Instantiating premise(1): ( ( F0 <-> G0 ) ∨ ( F0 <-> G1 ) ) ∧ ( ( F1 <-> G0 ) ∨ ( F1 <-> G1 ) )",
  "Truth replacement for premise(1): ( ( T <-> T ) ∨ ( T <-> F ) ) ∧ ( ( F <-> T ) ∨ ( F <-> F ) )",
  "Truth value of premise(1) is true",
  "Instantiating the conclusion: ( ( F0 <-> G0 ) ∧ ( F1 <-> G0 ) ) ∨ ( ( F0 <-> G1 ) ∧ ( F1 <-> G1 ) )",
  "Truth replacement for the conclusion: ( ( T <-> T ) ∧ ( F <-> T ) ) ∨ ( ( T <-> F ) ∧ ( F <-> F ) )",
  "Truth value of the conclusion is false",
];

describe("Propositional Logic Body", () => {
  it("checks that there is a sample argument", () => {
    setupComponent();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(2);
    for (let i = 0; i < intitalArguments.length; i++) {
      expect(inputs[i]).toHaveValue(intitalArguments[i]);
    }
  });

  it("checks for truthFE steps on click", async () => {
    setupComponent();
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /submit argument/i,
    });
    await user.click(submitButton);

    for (let i = 0; i < intialDeductionSteps.length; i++) {
      const deductionStep = screen.getByText(`${intialDeductionSteps[i]}`);
      expect(deductionStep).toBeInTheDocument();
    }
  });
});

export {};
