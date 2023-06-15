import countVariables from "./getTruthTableHelperFunctions";

describe("count variables", () => {
  it("p & ( q | r)", () => {
    const result = countVariables(["p", "&", "(", "q", "|", "r", ")"]);
    expect(result).toEqual(3);
  });

  it("( p ) & ( q | r) | q", () => {
    const result = countVariables([
      "(",
      "p",
      ")",
      "&",
      "q",
      "|",
      "r",
      ")",
      "|",
      "q",
    ]);
    expect(result).toEqual(3);
  });

  it("( p | s ) & ( q | r) | q", () => {
    const result = countVariables([
      "(",
      "p",
      "&",
      "s",
      "(",
      "q",
      "|",
      "r",
      ")",
      "|",
      "q",
    ]);
    expect(result).toEqual(4);
  });

  it("(a | b) & (c | d) & (e | f) & (g | h) | a", () => {
    const result = countVariables([
      "(",
      "a",
      "|",
      "b",
      ")",
      "&",
      "(",
      "c",
      "|",
      "d",
      ")",
      "&",
      "(",
      "e",
      "|",
      "f",
      ")",
      "&",
      "(",
      "g",
      "|",
      "h",
      ")",
      "|",
      "a",
    ]);
    expect(result).toEqual(8);
  });

  it("(a | b) & (c | d) & (e | f) & (g | h) & (i | j) & (k | l) & (m | n) & (o | p) | a", () => {
    const result = countVariables([
      "(",
      "a",
      "|",
      "b",
      ")",
      "&",
      "(",
      "c",
      "|",
      "d",
      ")",
      "&",
      "(",
      "e",
      "|",
      "f",
      ")",
      "&",
      "(",
      "g",
      "|",
      "h",
      ")",
      "&",
      "(",
      "i",
      "|",
      "j",
      ")",
      "&",
      "(",
      "k",
      "|",
      "l",
      ")",
      "&",
      "(",
      "m",
      "|",
      "n",
      ")",
      "&",
      "(",
      "o",
      "|",
      "p",
      ")",
      "|",
      "a",
    ]);
    expect(result).toEqual(16);
  });
  it("(a | b) & (c | d) & (e | f) & (g | h) & (i | j) & (k | l) & (m | n) & (o | p) & (q | r) & (s | t) & (u | v) & (w | x) & (y | z) & (A | B) & (C | D) & (E | F) | a", () => {
    const result = countVariables([
      "(",
      "a",
      "|",
      "b",
      ")",
      "&",
      "(",
      "c",
      "|",
      "d",
      ")",
      "&",
      "(",
      "e",
      "|",
      "f",
      ")",
      "&",
      "(",
      "g",
      "|",
      "h",
      ")",
      "&",
      "(",
      "i",
      "|",
      "j",
      ")",
      "&",
      "(",
      "k",
      "|",
      "l",
      ")",
      "&",
      "(",
      "m",
      "|",
      "n",
      ")",
      "&",
      "(",
      "o",
      "|",
      "p",
      ")",
      "&",
      "(",
      "q",
      "|",
      "r",
      ")",
      "&",
      "(",
      "s",
      "|",
      "t",
      ")",
      "&",
      "(",
      "u",
      "|",
      "v",
      ")",
      "&",
      "(",
      "w",
      "|",
      "x",
      ")",
      "&",
      "(",
      "y",
      "|",
      "z",
      ")",
      "&",
      "(",
      "A",
      "|",
      "B",
      ")",
      "&",
      "(",
      "C",
      "|",
      "D",
      ")",
      "&",
      "(",
      "E",
      "|",
      "F",
      ")",
      "|",
      "a",
    ]);
    expect(result).toEqual(32);
  });
});
