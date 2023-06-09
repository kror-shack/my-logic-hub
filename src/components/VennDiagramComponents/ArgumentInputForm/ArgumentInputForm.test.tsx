import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import ArgumentInputForm from "./ArgumentInputForm";

describe("ArgumentInputForm", () => {
  const premiseOne = "All men are mortal.";
  const premiseTwo = "Socrates is a man.";
  const conc = "Therefore, Socrates is mortal.";
  const setPremiseOne = jest.fn();
  const setPremiseTwo = jest.fn();
  const setConc = jest.fn();

  afterEach(cleanup);

  test("renders the input form with initial values", async () => {
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

    await (() => {
      expect(screen.getByLabelText("Premise One")).toHaveValue(premiseOne);
      expect(screen.getByLabelText("Premise Two")).toHaveValue(premiseTwo);
      expect(screen.getByLabelText("Conclusion")).toHaveValue(conc);
    });
  });

  test("updates premise one when input value changes", async () => {
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

    const newPremiseOne = "All dogs are loyal.";

    const premiseOneInput = screen.getByLabelText("Premise One");
    fireEvent.change(premiseOneInput, {
      target: { value: newPremiseOne },
    });

    await (() => {
      expect(setPremiseOne).toHaveBeenCalledWith(newPremiseOne);
    });
  });

  test("updates premise two when input value changes", async () => {
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
    const newPremiseTwo = "Rover is a dog.";

    const premiseTwoInput = screen.getByLabelText("Premise Two");
    fireEvent.change(premiseTwoInput, { target: { value: newPremiseTwo } });
    await (() => {
      expect(setPremiseTwo).toHaveBeenCalledWith(newPremiseTwo);
    });
  });

  test("updates conclusion when input value changes", async () => {
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
    const newConclusion = "Therefore, Rover is loyal.";

    const conclusionInput = screen.getByLabelText("Conclusion");
    fireEvent.change(conclusionInput, { target: { value: newConclusion } });

    await (() => {
      expect(setConc).toHaveBeenCalledWith(newConclusion);
    });
  });

  test("calls handleSubmit when form is submitted", async () => {
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
    const form = screen.getByRole("form");

    fireEvent.submit(form);
    await (() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});

export {};
