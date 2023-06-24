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

  it("p -> q | ( r )", () => {
    const result = convertToReversePolishNotation([
      "p",
      "->",
      "q",
      "|",
      "(",
      "r",
      ")",
    ]);
    const expected = ["p", "q", "r", "|", "->"];
    expect(result).toEqual(expected);
  });

  it("(p -> q) | ( r )", () => {
    const result = convertToReversePolishNotation([
      "(",
      "p",
      "->",
      "q",
      ")",
      "|",
      "(",
      "r",
      ")",
    ]);
    const expected = ["p", "q", "->", "r", "|"];
    expect(result).toEqual(expected);
  });

  it("(( A | (B -> A) ) & ( ~ A & C )) <-> ~ B", () => {
    const result = convertToReversePolishNotation([
      "(",
      "(",
      "A",
      "|",
      "(",
      "B",
      "->",
      "A",
      ")",
      ")",
      "&",
      "(",
      "~",
      "A",
      "&",
      "C",
      ")",
      ")",
      "<->",
      "~",
      "B",
    ]);
    const expected = [
      "A",
      "B",
      "A",
      "->",
      "|",
      "A",
      "~",
      "C",
      "&",
      "&",
      "B",
      "~",
      "<->",
    ];

    expect(result).toEqual(expected);
  });
});

export {};
