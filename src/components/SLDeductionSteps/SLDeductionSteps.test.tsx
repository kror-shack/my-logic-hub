import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import SLDeductionSteps from "./SLDeductionSteps";
import { DeductionStep } from "../../types/sharedTypes";

function setupComponent(dedutionSteps: DeductionStep[]) {
  render(
    <SLDeductionSteps
      deductionSteps={dedutionSteps}
      premiseLength={3}
      isQuantifiable={false}
    />
  );
}

const deductionSteps = [
  {
    from: "4",
    obtained: ["~R"],
    rule: "Simplification",
  },
  {
    from: "4",
    obtained: ["Q"],
    rule: "Simplification",
  },
  {
    from: "2,6",
    obtained: ["H"],
    rule: "Modus Tollens",
  },
  {
    from: "3,8",
    obtained: ["T"],
    rule: "Modus Ponens",
  },
  {
    from: "5,9",
    obtained: ["~D"],
    rule: "Modus Ponens",
  },
  {
    from: "9",
    obtained: ["S", "|", "T"],
    rule: "Addition",
  },
  {
    from: "11",
    obtained: ["~S", "->", "T"],
    rule: "Material Implication",
  },
  {
    from: "7",
    obtained: ["Q", "|", "D"],
    rule: "Addition",
  },
  {
    from: "13",
    obtained: ["~Q", "->", "D"],
    rule: "Material Implication",
  },
  {
    from: "12,14",
    obtained: ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
    rule: "Conjunction",
  },
];

const displayedSteps = [
  "3. ¬R from: 4 rule: Simplification ?",
  "4. Q from: 4 rule: Simplification ?",
  "5. H from: 2,6 rule: Modus Tollens ?",
  "6. T from: 3,8 rule: Modus Ponens ?",
  "7. ¬D from: 5,9 rule: Modus Ponens ?",
  "8. S∨T from: 9 rule: Addition ?",
  "9. ¬S->T from: 11 rule: Material Implication ?",
  "10. Q∨D from: 7 rule: Addition ?",
  "11. ¬Q->D from: 13 rule: Material Implication ?",
  "12. (¬S->T)∧(¬Q->D) from: 12,14 rule: Conjunction ?",
];

describe("Symbolic Logic Deduction Steps", () => {
  /**
   * Since the deduction steps are displayed
   * with a delay effect, this functions
   * waits for the conclusion to be displayed
   * and then checks for the deduction steps
   * to verify that the test does not fail because of the
   * delay/
   */
  it("checks for deduction steps on click", async () => {
    setupComponent(deductionSteps);
    const user = userEvent.setup();

    await waitFor(() => {
      const entireSolutionButton = screen.getByRole("button", {
        name: /show entire solution/i,
      });
      expect(entireSolutionButton).toBeInTheDocument();
    });
    const entireSolutionButton = screen.getByRole("button", {
      name: /show entire solution/i,
    });
    await user.click(entireSolutionButton);

    await waitFor(() => {
      const deduction = screen.getByText("(¬S->T)∧(¬Q->D)");
      expect(deduction).toBeInTheDocument();
    });
    for (let i = 0; i < displayedSteps.length; i++) {
      const deductionStep = screen.getByRole("row", {
        name: `${displayedSteps[i]}`,
      });
      expect(deductionStep).toBeInTheDocument();
    }
  });

  it("checks that clicking on info button displays the rule info", async () => {
    setupComponent(deductionSteps);
    const user = userEvent.setup();

    await waitFor(() => {
      const entireSolutionButton = screen.getByRole("button", {
        name: /show entire solution/i,
      });
      expect(entireSolutionButton).toBeInTheDocument();
    });
    const entireSolutionButton = screen.getByRole("button", {
      name: /show entire solution/i,
    });
    await user.click(entireSolutionButton);

    await waitFor(() => {
      const deduction = screen.getByText("(¬S->T)∧(¬Q->D)");
      expect(deduction).toBeInTheDocument();
    });
    const infoButtons = screen.getAllByRole("button", {
      name: "show rule info",
    });
    await user.click(infoButtons[0]);
    const ruleInfo = screen.getByText(
      "If we have 'A and B' (A ∧ B), then we can infer 'A' or 'B'."
    );
    expect(ruleInfo).toBeInTheDocument();
  });

  it("shows deduction steps with only one step", async () => {
    const deductionStep: DeductionStep[] = [
      {
        obtained: ["Q"],
        from: "1,2",
        rule: "Modus Ponens",
      },
    ];
    render(
      <SLDeductionSteps
        deductionSteps={deductionStep}
        premiseLength={3}
        isQuantifiable={false}
      />
    );

    await waitFor(() => {
      const deductionStepRow = screen.getByRole("row", {
        name: "3. Q from: 1,2 rule: Modus Ponens ?",
      });
      expect(deductionStepRow).toBeInTheDocument();
    });
  });
});

export {};
