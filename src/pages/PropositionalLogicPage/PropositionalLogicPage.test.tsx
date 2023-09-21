import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PropositionalLogicPage from "./PropositionalLogicPage";

function setupComponent() {
  render(
    <MemoryRouter>
      <PropositionalLogicPage />
    </MemoryRouter>
  );
}

const intitalArguments = [
  "( ¬ Q -> P ) ∧ (R -> T )",
  " ¬ ( ¬P -> S )",
  " (¬ U ∨ R ) ∧ U ",
  " ¬B -> ¬T ",
  "T -> Y",
  "¬K -> ¬Y",
  "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )",
];

const intialDeductionSteps = [
  "7. ¬Q->P from: 1 rule: Simplification ?",
  "8. R->T from: 1 rule: Simplification ?",
  "9. ¬(P∨S) from: 2 rule: Material Implication ?",
  "10. ¬P∧¬S from: 9 rule: DeMorgan Theorem ?",
  "11. ¬U∨R from: 3 rule: Simplification ?",
  "12. U from: 3 rule: Simplification ?",
  "13. ¬P from: 10 rule: Simplification ?",
  "14. ¬S from: 10 rule: Simplification ?",

  "15. R from: 11,12 rule: Disjunctive Syllogism ?",

  "16. Q from: 7,13 rule: Modus Tollens ?",
  "16. Q from: 7,13 rule: Modus Tollens ?",

  "17. T from: 8,15 rule: Modus Ponens ?",

  "18. B from: 4,17 rule: Modus Tollens ?",

  "19. Y from: 5,17 rule: Modus Ponens ?",

  "20. K from: 6,19 rule: Modus Tollens ?",
  "21. B∧Q from: 18,16 rule: Conjunction ?",
  "22. ¬(¬B∨¬Q) from: 21 rule: DeMorgan Theorem ?",

  "23. ¬(B->¬Q) from: 22 rule: Material Implication ?",

  "24. ¬S∧T from: 14,17 rule: Conjunction ?",

  "25. ¬(B->¬Q)∧(¬S∧T) from: 23,24 rule: Conjunction ?",
  "26. X∨K from: 20 rule: Addition ?",
  "27. (¬(B->¬Q)∧(¬S∧T))∧(X∨K) from: 25,26 rule: Conjunction ?",
];

describe("Propositional Logic Page", () => {
  it("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /propositional logic/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("checks that there is a sample argument", () => {
    setupComponent();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(7);
    for (let i = 0; i < intitalArguments.length; i++) {
      expect(inputs[i]).toHaveValue(intitalArguments[i]);
    }
  });

  /**
   * Since the deduction steps are displayed
   * with a delay effect, this functions
   * waits for the conclusion to be displayed
   * and then checks for the deduction steps
   * to verify that the test does not fail because of the
   * delay/
   */
  it("checks for deduction steps on click", async () => {
    setupComponent();
    const user = userEvent.setup();
    const submitButton = screen.getByRole("button", {
      name: /submit argument/i,
    });
    await user.click(submitButton);

    await waitFor(
      () => {
        const deduction = screen.getByText("(¬(B->¬Q)∧(¬S∧T))∧(X∨K)");
        expect(deduction).toBeInTheDocument();
      },
      { timeout: 10000 }
    );
    for (let i = 0; i < intialDeductionSteps.length; i++) {
      const deductionStep = screen.getByRole("row", {
        name: `${intialDeductionSteps[i]}`,
      });
      expect(deductionStep).toBeInTheDocument();
    }
  }, 13000);
});

export {};
