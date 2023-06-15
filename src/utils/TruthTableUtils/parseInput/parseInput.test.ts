import parseInput from "./parseInput";

describe("parseInput", () => {
  it("should convert string to array", () => {
    const input = "(p|s)&(q|r)|q";
    const expected = [
      "(",
      "p",
      "|",
      "s",
      ")",
      "&",
      "(",
      "q",
      "|",
      "r",
      ")",
      "|",
      "q",
    ];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });

  it('should preserve "->" without adding a space', () => {
    const input = "p -> q";
    const expected = ["p", "->", "q"];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });

  it('should preserve "<->" without adding a space', () => {
    const input = "p <-> q";
    const expected = ["p", "<->", "q"];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });

  it('should convert "∨" to "|"', () => {
    const input = "p ∨ q";
    const expected = ["p", "|", "q"];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });

  it('should convert "∧" to "&"', () => {
    const input = "p & q";
    const expected = ["p", "&", "q"];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });

  it("should handle complex expression", () => {
    const input = "(p|q)&(r|s) -> (t|u)";
    const expected = [
      "(",
      "p",
      "|",
      "q",
      ")",
      "&",
      "(",
      "r",
      "|",
      "s",
      ")",
      "->",
      "(",
      "t",
      "|",
      "u",
      ")",
    ];
    const result = parseInput(input);
    expect(result).toEqual(expected);
  });
});

export {};
