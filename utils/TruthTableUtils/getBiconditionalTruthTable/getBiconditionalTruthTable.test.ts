import getBiconditionalTruthTable from "./getBiconditionalTruthTable";

describe("getBiconditionalTruthTable", () => {
  it("should calculate the biconditional truth table for two arrays", () => {
    const array1 = ["T", "F", "T"];
    const array2 = ["F", "F", "T"];
    const expected = ["F", "T", "T"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should handle empty arrays", () => {
    const array1: string[] = [];
    const array2 = ["T", "F", "T"];
    const expected: string[] = [];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it('should calculate the biconditional truth table for two arrays with all "T" values', () => {
    const array1 = ["T", "T", "T"];
    const array2 = ["T", "T", "T"];
    const expected = ["T", "T", "T"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it('should calculate the biconditional truth table for two arrays with all "F" values', () => {
    const array1 = ["F", "F", "F"];
    const array2 = ["F", "F", "F"];
    const expected = ["T", "T", "T"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the biconditional truth table for two arrays with alternating values", () => {
    const array1 = ["T", "F", "T"];
    const array2 = ["F", "T", "F"];
    const expected = ["F", "F", "F"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the biconditional truth table for two arrays with different lengths", () => {
    const array1 = ["T", "F"];
    const array2 = ["F", "T", "T"];
    const expected = ["F", "F"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the biconditional truth table for two arrays with one empty array", () => {
    const array1: string[] = [];
    const array2 = ["T", "F", "T"];
    const expected: string[] = [];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the biconditional truth table for two empty arrays", () => {
    const array1: string[] = [];
    const array2: string[] = [];
    const expected: string[] = [];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the biconditional truth table for two arrays with one element", () => {
    const array1 = ["T"];
    const array2 = ["F"];
    const expected = ["F"];

    const result = getBiconditionalTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });
});
