import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import DeductionalRuleInfo from "./DeductionalRuleInfo";

function setupComponent(rule: string) {
  render(
    <MemoryRouter>
      <DeductionalRuleInfo rule={rule} />
    </MemoryRouter>
  );
}

describe("DeductionalRuleInfo", () => {
  it("displays the correct definition for Modus Ponens", () => {
    setupComponent("Modus Ponens");
    const paragraph = screen.getByText(
      "If we have 'A implies B' (A → B) and we have 'A', then we can infer 'B'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Modus Tollens", () => {
    setupComponent("Modus Tollens");
    const paragraph = screen.getByText(
      "If we have 'A implies B' (A → B) and we have 'not B', then we can infer 'not A'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Disjunctive Syllogism", () => {
    setupComponent("Disjunctive Syllogism");
    const paragraph = screen.getByText(
      "If we have 'A or B' (A ∨ B) and we have 'not A', then we can infer 'B'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Addition", () => {
    setupComponent("Addition");
    const paragraph = screen.getByText(
      "If we have 'A', then we can infer 'A or B' (A ∨ B) for any 'B'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Simplification", () => {
    setupComponent("Simplification");
    const paragraph = screen.getByText(
      "If we have 'A and B' (A ∧ B), then we can infer 'A' or 'B'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Conjunction", () => {
    setupComponent("Conjunction");
    const paragraph = screen.getByText(
      "If we have 'A' and we have 'B', then we can infer 'A and B' (A ∧ B)."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Material Implication", () => {
    setupComponent("Material Implication");
    const paragraph = screen.getByText(
      "If we have '~ A' or 'B', then we can infer 'A implies B' (A → B) and vice versa."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Hypothetical Syllogism", () => {
    setupComponent("Hypothetical Syllogism");
    const paragraph = screen.getByText(
      "If we have 'A → B' and 'B → C', then we can infer 'A → C' in a logical sequence."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Transposition", () => {
    setupComponent("Transposition");
    const paragraph = screen.getByText(
      "If we have 'A → B', we can derive the contrapositive '¬B → ¬A' in a logical sequence."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Assuming the contradiction", () => {
    setupComponent("Assuming the contradiction");
    const paragraph = screen.getByText(
      "To prove a proposition 'P', assume its negation '¬P' and derive a contradiction, showing that '¬P' cannot hold. This implies that 'P' must be true."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for -R Contradiction", () => {
    setupComponent("-R Contradiction");
    const paragraph = screen.getByText(
      "In a proof by contradiction, after assuming '¬P' and deriving a contradiction, the contradiction is reiterated to conclude that the original proposition 'P' must be true."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for DeMorgan Theorem", () => {
    setupComponent("DeMorgan Theorem");
    const paragraph = screen.getByText(
      "DeMorgan's Law states that for any propositions 'A' and 'B', the negation of 'A AND B' is equivalent to 'NOT A OR NOT B', and the negation of 'A OR B' is equivalent to 'NOT A AND NOT B'."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Universal Instantiation", () => {
    setupComponent("Universal Instantiation");
    const paragraph = screen.getByText(
      "Universal Instantiation (UI) is a rule of inference that allows you to instantiate a universally quantified formula by substituting a specific value for the universally quantified variable. For any proposition 'P(x)', if you have '∀x P(x)', then you can infer 'P(a)', where 'a' is any specific value within the universe of discourse."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Existential Instantiation", () => {
    setupComponent("Existential Instantiation");
    const paragraph = screen.getByText(
      "Existential Instantiation (EI) is a rule of inference that allows you to instantiate an existentially quantified formula by replacing the existentially quantified variable with a specific value. For any proposition 'P(x)', if you have '∃x P(x)', then you can infer 'P(a)', where 'a' is a specific value that satisfies the existentially quantified formula."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Universal Generalization", () => {
    setupComponent("Universal Generalization");
    const paragraph = screen.getByText(
      "Universal Generalization (UG) is a rule of inference that allows you to introduce a universally quantified formula by generalizing from a specific instance. If you have 'P(a)', where 'a' is a specific value, then you can infer '∀x P(x)', which asserts that the proposition 'P' holds for all possible values of 'x' within the universe of discourse."
    );
    expect(paragraph).toBeInTheDocument();
  });

  it("displays the correct definition for Existential Generalization", () => {
    setupComponent("Existential Generalization");
    const paragraph = screen.getByText(
      "Existential Generalization (EG) is a rule of inference that allows you to introduce an existentially quantified formula. If you have 'P(a)', where 'a' is a specific value, then you can infer '∃x P(x)', which asserts that there exists at least one value of 'x' such that the proposition 'P' holds."
    );
    expect(paragraph).toBeInTheDocument();
  });
});

export {};
