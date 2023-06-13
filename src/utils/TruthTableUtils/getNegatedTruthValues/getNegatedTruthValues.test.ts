import getNegatedTruthValues from "./getNegatedTruthValues";

describe("getNegatedTruthValues function", () => {
  it('should return negated truth values for an array with a single "T" value', () => {
    const truthValues = ["T"];
    const expected = ["F"];
    const result = getNegatedTruthValues(truthValues);
    expect(result).toEqual(expected);
  });

  it('should return negated truth values for an array with a single "F" value', () => {
    const truthValues = ["F"];
    const expected = ["T"];
    const result = getNegatedTruthValues(truthValues);
    expect(result).toEqual(expected);
  });

  it('should return negated truth values for an array with multiple "T" values', () => {
    const truthValues = ["T", "T", "T"];
    const expected = ["F", "F", "F"];
    const result = getNegatedTruthValues(truthValues);
    expect(result).toEqual(expected);
  });

  it('should return negated truth values for an array with multiple "F" values', () => {
    const truthValues = ["F", "F", "F"];
    const expected = ["T", "T", "T"];
    const result = getNegatedTruthValues(truthValues);
    expect(result).toEqual(expected);
  });

  it('should return negated truth values for an array with mixed "T" and "F" values', () => {
    const truthValues = ["T", "F", "T", "F"];
    const expected = ["F", "T", "F", "T"];
    const result = getNegatedTruthValues(truthValues);
    expect(result).toEqual(expected);
  });
});
