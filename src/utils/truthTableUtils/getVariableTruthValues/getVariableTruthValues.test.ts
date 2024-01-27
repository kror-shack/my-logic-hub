import getVariableTruthValues from "./getVariableTruthValues";

describe("getTruthValues function", () => {
  it("0 2", () => {
    const result = getVariableTruthValues(0, 2);
    const expected = ["T", "F"];
    expect(result).toEqual(expected);
  });
  it("0 4", () => {
    const result = getVariableTruthValues(0, 4);
    const expected = ["T", "T", "F", "F"];
    expect(result).toEqual(expected);
  });

  it("1 4", () => {
    const result = getVariableTruthValues(1, 4);
    const expected = ["T", "F", "T", "F"];
    expect(result).toEqual(expected);
  });

  it("0 8", () => {
    const result = getVariableTruthValues(0, 8);
    const expected = ["T", "T", "T", "T", "F", "F", "F", "F"];
    expect(result).toEqual(expected);
  });

  it("1 8", () => {
    const result = getVariableTruthValues(1, 8);
    const expected = ["T", "T", "F", "F", "T", "T", "F", "F"];
    expect(result).toEqual(expected);
  });

  it("2 8", () => {
    const result = getVariableTruthValues(2, 8);
    const expected = ["T", "F", "T", "F", "T", "F", "T", "F"];
    expect(result).toEqual(expected);
  });

  it("0 16", () => {
    const result = getVariableTruthValues(0, 16);
    const expected = [
      "T",
      "T",
      "T",
      "T",
      "T",
      "T",
      "T",
      "T",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
      "F",
    ];
    expect(result).toEqual(expected);
  });

  it("1 16", () => {
    const result = getVariableTruthValues(1, 16);
    const expected = [
      "T",
      "T",
      "T",
      "T",
      "F",
      "F",
      "F",
      "F",
      "T",
      "T",
      "T",
      "T",
      "F",
      "F",
      "F",
      "F",
    ];
    expect(result).toEqual(expected);
  });

  it("2 16", () => {
    const result = getVariableTruthValues(2, 16);
    const expected = [
      "T",
      "T",
      "F",
      "F",
      "T",
      "T",
      "F",
      "F",
      "T",
      "T",
      "F",
      "F",
      "T",
      "T",
      "F",
      "F",
    ];
    expect(result).toEqual(expected);
  });

  it("3 16", () => {
    const result = getVariableTruthValues(3, 16);
    const expected = [
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
      "T",
      "F",
    ];
    expect(result).toEqual(expected);
  });
});
