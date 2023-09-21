import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import VennDiagramPage from "./VennDiagramPage";

function setupComponent() {
  render(
    <MemoryRouter>
      <VennDiagramPage />
    </MemoryRouter>
  );
}

describe("Renders correct heading", () => {
  it("checks that it renders the header", () => {
    setupComponent();
    const homeButton = screen.getByRole("link", { name: /home/i });
    expect(homeButton).toBeInTheDocument();
    const heading = screen.getByRole("heading", {
      name: /logic venn/i,
    });
    expect(heading).toBeInTheDocument();
  });
});

describe("Renders input form", () => {
  const premiseOne = "All men are mortal.";
  const premiseTwo = "Socrates is a man.";
  const conc = "Therefore, Socrates is mortal.";

  it("renders the input form with initial values", () => {
    setupComponent();

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
    setupComponent();

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
    setupComponent();

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
    setupComponent();

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
    setupComponent();
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

describe("SyllogisticDetails", () => {
  it("Renders syllogistic details", async () => {
    setupComponent();

    const heading = screen.getByRole("heading", {
      name: /syllogistic details:-/i,
    });
    const figureHeader = screen.getByRole("heading", { name: /figure/i });
    const majorPremiseHeader = screen.getByRole("heading", {
      name: /major premise/i,
    });
    const minorPremiseHeader = screen.getByRole("heading", {
      name: /minor premise/i,
    });
    const middleTermHeader = screen.getByRole("heading", {
      name: /middle term/i,
    });
    const majorTermHeader = screen.getByRole("heading", {
      name: /major term/i,
    });
    const minorTermHeader = screen.getByRole("heading", {
      name: /minor term/i,
    });
    const majorPremise = screen.getByText(/all men are mortal/i);
    const minorPremise = screen.getByText(/socrates is a man/i);
    const middleTerm = screen.getByText(/man/i);
    const majorTerm = screen.getByText("mortal");
    const minorTerm = screen.getByText("socrates");
    const figure = screen.getByText(/aaa-1/i);

    expect(heading).toBeInTheDocument();
    expect(figureHeader).toBeInTheDocument();
    expect(majorPremiseHeader).toBeInTheDocument();
    expect(minorPremiseHeader).toBeInTheDocument();
    expect(middleTermHeader).toBeInTheDocument();
    expect(majorTermHeader).toBeInTheDocument();
    expect(minorTermHeader).toBeInTheDocument();
    expect(majorPremise).toBeInTheDocument();
    expect(minorPremise).toBeInTheDocument();
    expect(minorPremise).toBeInTheDocument();
    expect(figure).toBeInTheDocument();
    expect(majorTerm).toBeInTheDocument();
    expect(minorTerm).toBeInTheDocument();
    expect(middleTerm).toBeInTheDocument();
  });
});

describe("Renders validityDetails", () => {
  it('renders "Valid" when validity name is not null', () => {
    setupComponent();
    expect(screen.getByText(/valid/i)).toBeInTheDocument();
  });

  it("does not render the validity name when validity name is null", () => {
    setupComponent();
    expect(screen.getByText("Barbara")).toBeInTheDocument();
  });
});
export {};
