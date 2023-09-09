import React from "react";
import { render, screen } from "@testing-library/react";
import SyllogisticDetails from "./SyllogisticDetails";
import { MemoryRouter } from "react-router-dom";
import { SyllogisticFigure } from "../../../types/VennDiagramTypes/types";
import "@testing-library/jest-dom/extend-expect";

function setupComponent(syllogisticFigure: SyllogisticFigure) {
  render(
    <MemoryRouter>
      <SyllogisticDetails syllogisticFigure={syllogisticFigure} />
    </MemoryRouter>
  );
}

describe("SyllogisticDetails", () => {
  const syllogisticFigure = {
    figure: "AAA-1",
    majorPremise: "All men are mortal",
    minorPremise: "Socrates is a man",
    majorTerm: "mortal",
    minorTerm: "socrates",
    middleTerm: "men",
    premise1: {
      subject: "men",
      predicate: "mortal",
      type: "A",
    },
    premise2: {
      subject: "socrates",
      predicate: "man",
      type: "A",
    },
    conc: {
      subject: "socrates",
      predicate: "mortal",
      type: "A",
    },
  };

  it("renders the component with correct details", async () => {
    setupComponent(syllogisticFigure);

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

export {};
