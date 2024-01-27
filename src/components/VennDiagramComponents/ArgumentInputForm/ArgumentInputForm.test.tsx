import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ArgumentInputForm from "./ArgumentInputForm";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

function setupComponent(premiseOne: string, premiseTwo: string, conc: string) {
  render(
    <ArgumentInputForm
      premiseOne={premiseOne}
      premiseTwo={premiseTwo}
      conc={conc}
      setPremiseOne={() => {}}
      setPremiseTwo={() => {}}
      setConc={() => {}}
    />
  );
}

describe("ArgumentInputForm", () => {
  const premiseOne = "All men are mortal.";
  const premiseTwo = "Socrates is a man.";
  const conc = "Therefore, Socrates is mortal.";
  const setPremiseOne = jest.fn();
  const setPremiseTwo = jest.fn();
  const setConc = jest.fn();

  it("renders the input form with initial values", () => {
    setupComponent(premiseOne, premiseTwo, conc);

    expect(
      screen.getByRole("textbox", { name: "First premise" })
    ).toHaveDisplayValue(premiseOne);
    expect(
      screen.getByRole("textbox", { name: "Second premise" })
    ).toHaveDisplayValue(premiseTwo);
    expect(
      screen.getByRole("textbox", { name: "Conclusion" })
    ).toHaveDisplayValue(conc);
  });

  it("updates premise one when input value changes", async () => {
    setupComponent(premiseOne, premiseTwo, conc);

    const user = userEvent.setup();

    const newPremise = "All dogs are loyal.";

    const input = screen.getByRole("textbox", {
      name: "First premise",
    });
    await user.clear(input);
    await user.type(input, newPremise);

    expect(input).toHaveDisplayValue(newPremise);
  });

  it("updates premise two when input value changes", async () => {
    setupComponent(premiseOne, premiseTwo, conc);

    const user = userEvent.setup();

    const newPremise = "Rover is a dog.";

    const input = screen.getByRole("textbox", {
      name: "Second premise",
    });
    await user.clear(input);
    await user.type(input, newPremise);

    expect(input).toHaveDisplayValue(newPremise);
  });

  it("updates conclusion when input value changes", async () => {
    setupComponent(premiseOne, premiseTwo, conc);

    const user = userEvent.setup();

    const newPremise = "Therefore, Rover is loyal.";

    const input = screen.getByRole("textbox", {
      name: "Conclusion",
    });
    await user.clear(input);
    await user.type(input, newPremise);

    expect(input).toHaveDisplayValue(newPremise);
  });

  it("calls handleSubmit when form is submitted", async () => {
    render(
      <ArgumentInputForm
        premiseOne={premiseOne}
        premiseTwo={premiseTwo}
        conc={conc}
        setPremiseOne={setPremiseOne}
        setPremiseTwo={setPremiseTwo}
        setConc={setConc}
      />
    );
    const handleSubmit = jest.fn();
    const submitButton = screen.getByRole("button", {
      name: /submit argument/i,
    });
    const user = userEvent.setup();

    await (() => {
      user.click(submitButton);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});

export {};
