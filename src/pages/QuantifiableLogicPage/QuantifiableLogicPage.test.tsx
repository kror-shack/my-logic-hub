import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import QuantifiableLogicPage from "./QuantifiableLogicPage";

function setupComponent() {
  render(
    <MemoryRouter>
      <QuantifiableLogicPage />
    </MemoryRouter>
  );
}

const intitalArguments = [
  "\u2200x \u2200y ( ( Axg ∧ Agy ) -> Axy )",
  "\u2200x ( Px -> Agx )",
  "\u2203x ( Px ∧ Axg )",
  "\u2203x ( Px ∧ \u2200y ( Py -> Axy ) )",
];

const intialDeductionSteps = [
  "4. Pa ∧ Aag from: 3 rule: Existential Instantiation ?",
  "5. ∀y ( ( Aag ∧ Agy ) -> Aay ) from: 1 rule: Universal Instantiation ?",
  "6. Pa -> Aga from: 2 rule: Universal Instantiation ?",
  "7. Pa from: 4 rule: Simplification ?",
  "8. Aag from: 4 rule: Simplification ?",
  "9. ( Aag ∧ Aga ) -> Aaa from: 5 rule: Universal Instantiation ?",
  "10. Aga from: 6,7 rule: Modus Ponens ?",
  "11. Aag ∧ Aga from: 8,10 rule: Conjunction ?",
  "12. Aaa from: 9,11 rule: Modus Ponens ?",
  "13. ¬Pa ∨ Aaa from: 12 rule: Addition ?",
  "14. Pa -> Aaa from: 13 rule: Material Implication ?",
  "15. ∀y ( Py -> Aay ) from: 14 rule: Universal Generalization ?",
  "16. Pa ∧ ∀y ( Py -> Aay ) from: 7,15 rule: Conjunction ?",
  "17. ∃x ( Px ∧ ∀y ( Py -> Axy ) ) from: 1 rule: Existential Generalization ?",
];

describe("Quantifiable Logic Page", () => {
  it("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /first order logic/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("checks that there is a sample argument", () => {
    setupComponent();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
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
        const deduction = screen.getByText(
          "\u2203x ( Px ∧ \u2200y ( Py -> Axy ) )"
        );
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
