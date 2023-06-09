import React from "react";
import { render, screen } from "@testing-library/react";
import SyllogisticDetails from "./SyllogisticDetails";

describe("SyllogisticDetails", () => {
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

  test("renders the component with correct details", async () => {
    render(<SyllogisticDetails syllogisticFigure={syllogisticFigure} />);

    await (() => {
      expect(screen.getByText("Syllogistic Details")).toBeInTheDocument();
      expect(screen.getByText("Figure: AAA-2")).toBeInTheDocument();
      expect(
        screen.getByText("Major Premise: All mortal are men")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Minor Premise: Socrates is a man")
      ).toBeInTheDocument();
      expect(screen.getByText("Major Term: mortal")).toBeInTheDocument();
      expect(screen.getByText("Minor Term: socrates")).toBeInTheDocument();
      expect(screen.getByText("Middle Term: men")).toBeInTheDocument();
    });
  });
});

export {};
