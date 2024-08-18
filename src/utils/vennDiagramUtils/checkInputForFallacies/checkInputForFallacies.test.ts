import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import { checkInputForFallacies } from "./checkInputForFallacies";

describe("checkInputForFallacies", () => {
  test("returns 'Fallacy of Undistributed Middle or Illicit Process' when major or minor term is the same as the middle term", () => {
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

    expect(checkInputForFallacies(input)).toBe(
      "Fallacy of Undistributed Middle or Illicit Process: The middle term must be distributed in at least one premise, and all terms distributed in the conclusion must also be distributed in the corresponding premise."
    );
  });

  test("returns 'Fallacy of Exclusive Premises' when both premises are negative", () => {
    const input: SyllogisticFigure = {
      figure: "1",
      majorTerm: "A",
      minorTerm: "B",
      middleTerm: "C",
      majorPremise: "No A are C",
      minorPremise: "Some B are not C",
      premise1: { subject: "A", predicate: "C", type: "E" },
      premise2: { subject: "B", predicate: "C", type: "O" },
      conc: { subject: "B", predicate: "A", type: "A" },
    };

    expect(checkInputForFallacies(input)).toBe(
      "Fallacy of Exclusive Premises: No standard-form categorical syllogism having two negative premises is valid."
    );
  });

  test("returns 'Existential Fallacy' when two universal premises lead to a particular conclusion", () => {
    const input: SyllogisticFigure = {
      figure: "1",
      majorTerm: "A",
      minorTerm: "B",
      middleTerm: "C",
      majorPremise: "All A are C",
      minorPremise: "No B are C",
      premise1: { subject: "A", predicate: "C", type: "A" },
      premise2: { subject: "B", predicate: "C", type: "E" },
      conc: { subject: "B", predicate: "A", type: "O" },
    };

    expect(checkInputForFallacies(input)).toBe(
      "Existential Fallacy: No valid standard-form categorical syllogism with a particular conclusion can have two universal premises"
    );
  });

  test("returns null for a valid syllogism", () => {
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

    expect(checkInputForFallacies(input)).toBeNull();
  });

  test("returns 'Fallacy of Undistributed Middle or Illicit Process' when the same predicate appears in both premises", () => {
    const input: SyllogisticFigure = {
      figure: "1",
      majorTerm: "A",
      minorTerm: "B",
      middleTerm: "C",
      majorPremise: "All A are C",
      minorPremise: "All B are C",
      premise1: { subject: "A", predicate: "C", type: "A" },
      premise2: { subject: "A", predicate: "C", type: "A" },
      conc: { subject: "B", predicate: "A", type: "A" },
    };

    expect(checkInputForFallacies(input)).toBe(
      "Fallacy of Undistributed Middle or Illicit Process: The middle term must be distributed in at least one premise, and all terms distributed in the conclusion must also be distributed in the corresponding premise."
    );
  });
});
