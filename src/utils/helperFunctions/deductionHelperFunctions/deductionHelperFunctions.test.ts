import {
  convertImplicationToDisjunction,
  getBracketedNegation,
  getTranspose,
} from "./deductionHelperFunctions";

describe("get transpose", () => {
  it("~S ->  T", () => {
    expect(getTranspose(["~S", "->", "T"])).toEqual(["~T", "->", "S"]);
  });
});

describe("get implication to dijunction", () => {
  it("~S ->  T", () => {
    expect(convertImplicationToDisjunction(["~S", "->", "T"])).toEqual([
      "S",
      "|",
      "T",
    ]);
  });
  it("A -> B", () => {
    expect(convertImplicationToDisjunction(["A", "->", "B"])).toEqual([
      "~A",
      "|",
      "B",
    ]);
  });

  it("(~C -> D)", () => {
    expect(
      convertImplicationToDisjunction(["(", "~C", "->", "D", ")"])
    ).toEqual(["C", "|", "D"]);
  });

  it("(~X -> (Y -> Z))", () => {
    const expected = ["X", "|", "(", "Y", "->", "Z", ")"];

    expect(
      convertImplicationToDisjunction([
        "(",
        "~X",
        "->",
        "(",
        "Y",
        "->",
        "Z",
        ")",
        ")",
      ])
    ).toEqual(expected);
  });

  it("(P -> (Q -> R))", () => {
    const expected = ["~P", "|", "(", "Q", "->", "R", ")"];

    expect(
      convertImplicationToDisjunction([
        "(",
        "P",
        "->",
        "(",
        "Q",
        "->",
        "R",
        ")",
        ")",
      ])
    ).toEqual(expected);
  });

  it("S -> (T -> U)", () => {
    const expected = ["~S", "|", "(", "T", "->", "U", ")"];

    expect(
      convertImplicationToDisjunction(["S", "->", "(", "T", "->", "U", ")"])
    ).toEqual(expected);
  });

  it("V -> (W -> (X -> Y))", () => {
    const expected = ["~V", "|", "(", "W", "->", "(", "X", "->", "Y", ")", ")"];

    expect(
      convertImplicationToDisjunction([
        "V",
        "->",
        "(",
        "W",
        "->",
        "(",
        "X",
        "->",
        "Y",
        ")",
        ")",
      ])
    ).toEqual(expected);
  });

  it.skip("~(A -> B)", () => {
    const expected = ["A", "|", "~B"];

    expect(
      convertImplicationToDisjunction(["~", "(", "A", "->", "B", ")"])
    ).toEqual(expected);
  });

  it.skip("~((C -> D) -> E)", () => {
    const expected = ["(", "C", "|", "~D", ")", "|", "~E"];

    expect(
      convertImplicationToDisjunction([
        "~",
        "(",
        "(",
        "C",
        "->",
        "D",
        ")",
        "->",
        "E",
        ")",
      ])
    ).toEqual(expected);
  });

  it("F -> ~(G -> H)", () => {
    const expected = ["~F", "|", "~", "(", "G", "->", "H", ")"];

    expect(
      convertImplicationToDisjunction([
        "F",
        "->",
        "~",
        "(",
        "G",
        "->",
        "H",
        ")",
      ])
    ).toEqual(expected);
  });

  it.skip("~((P -> Q) -> (R -> S))", () => {
    const expected = ["(", "P", "&", "~Q", ")", "|", "(", "R", "&", "~S", ")"];

    expect(
      convertImplicationToDisjunction([
        "~",
        "(",
        "(",
        "P",
        "->",
        "Q",
        ")",
        "->",
        "(",
        "R",
        "->",
        "S",
        ")",
        ")",
      ])
    ).toEqual(expected);
  });
  it.skip("~ ( P -> Q )", () => {
    const expected = ["(", "P", "&", "~Q", ")", "|", "(", "R", "&", "~S", ")"];

    expect(
      convertImplicationToDisjunction(["~", "(", "P", "->", "Q", ")"])
    ).toEqual(null);
  });
});

describe("getsBracketedNegation", () => {
  it("test 1", () => {
    expect(getBracketedNegation(["~", "(", "T", "->", "S", ")"])).toEqual([
      "(",
      "T",
      "->",
      "S",
      ")",
    ]);
  });
});

export {};
