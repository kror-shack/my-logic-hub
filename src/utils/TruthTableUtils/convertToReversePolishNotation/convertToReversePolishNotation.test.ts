import convertToReversePolishNotation from "./convertToReversePolishNotation";

describe("convertToReversePolishNotaion", () => {
  it("p & q", () => {
    const result = convertToReversePolishNotation(["p", "&", "q"]);
    const expected = ["p", "q", "&"];
    expect(result).toEqual(expected);
  });

  it("p | q", () => {
    const result = convertToReversePolishNotation(["p", "|", "q"]);
    const expected = ["p", "q", "|"];
    expect(result).toEqual(expected);
  });

  it("p -> q", () => {
    const result = convertToReversePolishNotation(["p", "->", "q"]);
    const expected = ["p", "q", "->"];
    expect(result).toEqual(expected);
  });

  it("p <-> q", () => {
    const result = convertToReversePolishNotation(["p", "<->", "q"]);
    const expected = ["p", "q", "<->"];
    expect(result).toEqual(expected);
  });

  it("p & ( q | r)", () => {
    const result = convertToReversePolishNotation([
      "p",
      "&",
      "(",
      "q",
      "|",
      "r",
      ")",
    ]);
    const expected = ["p", "q", "r", "|", "&"];
    expect(result).toEqual(expected);
  });

  it("p & ~ q", () => {
    const result = convertToReversePolishNotation(["p", "&", "~", "q"]);
    const expected = ["p", "q", "~", "&"];
    expect(result).toEqual(expected);
  });

  it("(p | q) & r", () => {
    const result = convertToReversePolishNotation([
      "(",
      "p",
      "|",
      "q",
      ")",
      "&",
      "r",
    ]);
    const expected = ["p", "q", "|", "r", "&"];
    expect(result).toEqual(expected);
  });

  it("(p <-> q) & r", () => {
    const result = convertToReversePolishNotation([
      "(",
      "p",
      "<->",
      "q",
      ")",
      "&",
      "r",
    ]);
    const expected = ["p", "q", "<->", "r", "&"];
    expect(result).toEqual(expected);
  });
});

export {};
