import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import OperatorList from "./OpertorList";

const mockRef = {
  current: null,
};

function setupComponent(quantifiable: boolean) {
  render(
    <MemoryRouter>
      <OperatorList
        setInputFeildValues={() => {}}
        quantifiable={quantifiable}
        inputRef={mockRef}
        index={0}
        setInputValue={() => {}}
      />
    </MemoryRouter>
  );
}

describe("Operator List", () => {
  it("checks that it displays all operators for quantifiable logic", async () => {
    setupComponent(true);
    const universalQuantifier = screen.getByText("∀");
    const existentialQuantifier = screen.getByText("∃");
    const orOperator = screen.getByText("∨");
    const andOperator = screen.getByText("∧");
    const implicationOperator = screen.getByText("->");
    const biconditionalOperator = screen.getByText("<->");

    expect(universalQuantifier).toBeInTheDocument();
    expect(existentialQuantifier).toBeInTheDocument();
    expect(orOperator).toBeInTheDocument();
    expect(andOperator).toBeInTheDocument();
    expect(implicationOperator).toBeInTheDocument();
    expect(biconditionalOperator).toBeInTheDocument();
  });

  it("checks that it displays all only relevant operators for propositional logic", async () => {
    setupComponent(false);
    const universalQuantifier = screen.queryByText("∀");
    const existentialQuantifier = screen.queryByText("∃");
    const orOperator = screen.getByText("∨");
    const andOperator = screen.getByText("∧");
    const implicationOperator = screen.getByText("->");
    const biconditionalOperator = screen.getByText("<->");

    expect(universalQuantifier).not.toBeInTheDocument();
    expect(existentialQuantifier).not.toBeInTheDocument();
    expect(orOperator).toBeInTheDocument();
    expect(andOperator).toBeInTheDocument();
    expect(implicationOperator).toBeInTheDocument();
    expect(biconditionalOperator).toBeInTheDocument();
  });
});

export {};
