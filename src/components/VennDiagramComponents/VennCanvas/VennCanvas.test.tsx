import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import VennCanvas from "./VennCanvas";

describe.skip("Venn Canvas", () => {
  const syllogisticFigure = {
    figure: "AAA-2",
    majorPremise: "All mortal are men",
    minorPremise: "Socrates is a man",
    majorTerm: "mortal",
    minorTerm: "socrates",
    middleTerm: "men",
    premise1: {
      subject: "mortal",
      predicate: "men",
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

  it.only("renders canvas element", async () => {
    render(<VennCanvas syllogisticFigure={syllogisticFigure} />);
    const canvasElement = screen.getByRole("canvas");
    expect(canvasElement).toBeInTheDocument();
  });

  it("sets the canvas dimensions correctly", () => {
    const canvasElement = screen.getByRole("canvas");
    expect(canvasElement).toHaveAttribute("width", "800");
    expect(canvasElement).toHaveAttribute("height", "800");
  });

  it("applies margin style to the canvas", () => {
    const canvasElement = screen.getByRole("canvas");
    expect(canvasElement).toHaveStyle("margin: 2000px");
  });
});

export {};
