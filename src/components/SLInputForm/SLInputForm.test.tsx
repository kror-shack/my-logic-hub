import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SLInputForm from "./SLInputForm";

function setupComponent(propositionArray: string[]) {
  render(
    <MemoryRouter>
      <SLInputForm
        propositionArr={propositionArray}
        setPropositionArr={() => {}}
        setPremiseLength={() => {}}
        isQuantifiable={false}
        isSemenaticTableax={false}
      />
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

describe("Symbolic Logic Input Form", () => {
  it("checks that it displays the argument passed as props", () => {
    setupComponent(intitalArguments);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(7);
    for (let i = 0; i < intitalArguments.length; i++) {
      expect(inputs[i]).toHaveValue(intitalArguments[i]);
    }
  });

  it("checks that the delete premise button deletes the respective premise only", async () => {
    setupComponent(intitalArguments);
    const deletePremiseButtons = screen.getAllByRole("button", {
      name: "delete premise",
    });

    const user = userEvent.setup();
    await user.click(deletePremiseButtons[0]);

    const firstPremise = screen.queryByDisplayValue("( ¬ Q -> P ) ∧ (R -> T )");
    expect(firstPremise).not.toBeInTheDocument();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
    for (let i = 0; i < intitalArguments.length - 1; i++) {
      expect(inputs[i]).toHaveValue(intitalArguments[i + 1]);
    }
  });

  it("checks that focusing on an input displays the operator list", async () => {
    setupComponent(intitalArguments);
    const inputs = screen.getAllByRole("textbox");

    const user = userEvent.setup();
    await user.click(inputs[0]);

    const orOperator = screen.getByRole("button", { name: /add or operator/i });
    expect(orOperator).toBeInTheDocument();
  });

  it("checks that clickinig on an operator button adds it to the currently focused input", async () => {
    setupComponent(intitalArguments);
    const inputs = screen.getAllByRole("textbox");

    const user = userEvent.setup();
    await user.clear(inputs[0]);
    await user.click(inputs[0]);

    const orOperator = screen.getByRole("button", {
      name: /add or operator/i,
    });
    await user.click(orOperator);
    const updatedInput = screen.getByDisplayValue("∨");
    expect(updatedInput).toBeInTheDocument();
  });
});

export {};
