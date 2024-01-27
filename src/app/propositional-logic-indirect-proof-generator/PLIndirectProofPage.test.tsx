import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import PLIndirectProofPage from "./page";

function setupComponent() {
  render(<PLIndirectProofPage />);
}

const intitalArguments = [
  "(S ∨ R) -> (¬P -> Q)",
  "¬S -> ¬(T -> Q)",
  "R -> ¬T",
  "¬P",
  "¬R -> Q",
  "S -> ¬Q",
  "¬S -> T",
  "(T -> R) ∧ ¬S",
];

const intialDeductionSteps = [
  "8. (T∧¬R)∨S from: conc rule: Assuming the contradiction ?",
  "9. T->¬R from: 4 rule: Transposition ?",
  "10. T->Q from: 9,6 rule: Hypothetical Syllogism ?",
  "11. S from: 3,10 rule: Modus Tollens ?",
  "12. ¬Q from: 7,11 rule: Modus Ponens ?",
  "13. S∨R from: 11 rule: Addition ?",
  "14. ¬P∧¬Q from: 5,12 rule: Conjunction ?",
  "15. (S∨R)∧(¬P∧¬Q) from: 13,14 rule: Conjunction ?",
  "16. ((S∨R)->(¬P->Q))∧((S∨R)∧(¬P∧¬Q)) from: 2,15 rule: Conjunction ?",
  "17. ((S∨R)->(¬P->Q))∧((S∨R)∧(¬P∧¬Q)) from: 16 rule: -R Contradiction ?",
];

describe("Propositional Logic Indirect Proof Page", () => {
  it("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /PL Indirect Proof/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it("checks that there is a sample argument", () => {
    setupComponent();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(8);
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
        const entireSolutionButton = screen.getByRole("button", {
          name: /show entire solution/i,
        });
        expect(entireSolutionButton).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
    const entireSolutionButton = screen.getByRole("button", {
      name: /show entire solution/i,
    });
    await user.click(entireSolutionButton);

    await waitFor(
      () => {
        const deduction = screen.getByText("-R Contradiction");
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
