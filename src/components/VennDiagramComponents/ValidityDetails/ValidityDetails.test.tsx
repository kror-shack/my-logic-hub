import React from "react";
import { render, screen } from "@testing-library/react";
import ValidityDetails from "./ValidityDetails";
import "@testing-library/jest-dom/extend-expect";

jest.mock(
  "../../../utils/vennDiagramUtils/checkValidity/checkValidity",
  () => ({
    __esModule: true,
    default: jest.fn((key: string): string | null => {
      const figures: Record<string, string> = {
        "AAA-1": "Barbara",
        "AEE-2": "Camestres",
        "AII-3": "Datisi",
        "AEE-4": "Camenes",
        "EAE-1": "Celarent",
        "EAE-2": "Cesare",
        "IAI-3": "Disamis",
        "IAI-4": "Dimaris",
        "AII-1": "Darii",
        "AOO-2": "Baroko",
        "EIO-3": "Ferison",
        "EIO-4": "Fresison",
        "EIO-1": "Ferio",
        "EIO-2": "Festino",
        "OAO-3": "Bokardo",
      };
      return figures[key] || null;
    }),
  })
);

describe("ValidityDetails", () => {
  it('renders "Valid" when validity name is not null', () => {
    render(<ValidityDetails figure="AAA-1" />);
    expect(screen.getByText(/valid/i)).toBeInTheDocument();
  });

  it('renders "Invalid" when validity name is null', () => {
    render(<ValidityDetails figure="InvalidFigure" />);
    expect(screen.getByText(/invalid/i)).toBeInTheDocument();
  });

  it("renders the validity name when validity name is not null", () => {
    render(<ValidityDetails figure="AAA-1" />);
    expect(screen.getByText("Barbara")).toBeInTheDocument();
  });

  it("does not render the validity name when validity name is null", () => {
    render(<ValidityDetails figure="InvalidFigure" />);
    expect(screen.queryByText("Barbara")).toBeNull();
  });
});

export {};
