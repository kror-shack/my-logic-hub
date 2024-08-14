import {
  convertImplicationToDisjunction,
  getBracketedNegation,
  getTranspose,
  searchInDS,
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
  it("test 2", () => {
    expect(
      getBracketedNegation([
        "~",
        "(",
        "p",
        "->",
        "q",
        ")",
        "->",
        "(",
        "p",
        "&",
        "q",
        ")",
      ])
    ).toEqual([
      "~",
      "(",
      "~",
      "(",
      "p",
      "->",
      "q",
      ")",
      "->",
      "(",
      "p",
      "&",
      "q",
      ")",
      ")",
    ]);
  });
});

describe("serachInDS", () => {
  const deductionSteps = [
    {
      obtained: [
        "∀(x)",
        "∀(y)",
        "(",
        "(",
        "Axg",
        "&",
        "Agy",
        ")",
        "->",
        "Axy",
        ")",
      ],
      rule: "premise",
      from: 0,
    },
    {
      obtained: ["∀(x)", "(", "Px", "->", "Agx", ")"],
      rule: "premise",
      from: 0,
    },
    {
      obtained: ["∃(x)", "(", "Px", "&", "Axg", ")"],
      rule: "premise",
      from: 0,
    },
    {
      obtained: ["P_a", "&", "A_ag"],
      rule: "Existential Instantiation",
      from: 2,
    },
    {
      obtained: ["∀(y)", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
      rule: "Universal Instantiation",
      from: "0",
    },
    {
      obtained: ["Pa", "->", "Aga"],
      rule: "Universal Instantiation",
      from: "1",
    },
    { obtained: ["P_a"], rule: "Simplification", from: "3" },
    { obtained: ["A_ag"], rule: "Simplification", from: "3" },
    {
      obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
      rule: "Universal Instantiation",
      from: "4",
    },
    { obtained: ["Aga"], rule: "Modus Ponens", from: "5,6" },
    { obtained: ["Aag", "&", "Aga"], rule: "Conjunction", from: "7,9" },
    { obtained: ["Aaa"], rule: "Modus Ponens", from: "8,10" },
  ];
  it("test 1", () => {
    expect(searchInDS(deductionSteps, ["Pa"])).toEqual(true);
  });
});

export {};
