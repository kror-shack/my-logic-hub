import getOrOperatorTruthTable from "./getOrOperatorTruthTable";

describe("getOrOperatorTruthTable", () => {
  it("should calculate the OR operation result for two arrays", () => {
    const array1 = ["T", "F", "T"];
    const array2 = ["F", "F", "T"];
    const expected = ["T", "F", "T"];

    const result = getOrOperatorTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });

  it("should calculate the OR operation result for three arrays", () => {
    const array1 = ["T", "F", "T"];
    const array2 = ["F", "F", "T"];
    const array3 = ["T", "T", "F"];
    const expected = ["T", "T", "T"];

    const result = getOrOperatorTruthTable(array1, array2, array3);
    expect(result).toEqual(expected);
  });

  it("should handle empty arrays", () => {
    const array1: string[] = [];
    const array2 = ["T", "F", "T"];
    const expected: string[] = [];

    const result = getOrOperatorTruthTable(array1, array2);
    expect(result).toEqual(expected);
  });
});
