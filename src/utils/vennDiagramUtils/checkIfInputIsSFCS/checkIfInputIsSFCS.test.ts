import { truncate } from "fs";
import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import { checkIfInputIsSFCS } from "./checkIfInputIsSFCS";

describe("checkIfInputIsSFCS", () => {
  test("returns true for non-SFCS", () => {
    const input: SyllogisticFigure = {
      figure: "1",
      majorTerm: "A",
      minorTerm: "B",
      middleTerm: "A",
      majorPremise: "All A are B",
      minorPremise: "All B are C",
      premise1: { subject: "A", predicate: "B", type: "A" },
      premise2: { subject: "B", predicate: "C", type: "A" },
      conc: { subject: "A", predicate: "C", type: "A" },
    };

    expect(checkIfInputIsSFCS(input)).toBe(true);
  });

  test("returns true for a SFCS", () => {
    const input: SyllogisticFigure = {
      figure: "1",
      majorTerm: "A",
      minorTerm: "B",
      middleTerm: "C",
      majorPremise: "All men are mortal",
      minorPremise: "Socrates is a man",
      premise1: { subject: "men", predicate: "mortal", type: "A" },
      premise2: { subject: "Socrates", predicate: "men", type: "A" },
      conc: { subject: "socrates", predicate: "mortal", type: "A" },
    };

    expect(checkIfInputIsSFCS(input)).toBe(true);
  });
});
