import {
  convertImplicationToDisjunction,
  getBracketedNegation,
  getNegatedBiconditionalCasesToExist,
  getTranspose,
  isPremiseInQuantifierEnclosure,
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
  it("test 1", () => {
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
    expect(searchInDS(deductionSteps, ["Pa"])).toEqual(true);
  });

  it("test 2", () => {
    const deductionSteps = [
      {
        obtained: ["q", "->", "(", "p", "->", "q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: null,
      },
    ];
    expect(searchInDS(deductionSteps, ["p", "->", "q"], false)).toEqual(true);
  });
});

describe("getNegatedBiconditionalCasesToExist", () => {
  it("should generate correct cases for simple predicates", () => {
    const premise = ["P", "<->", "Q"];
    const expectedOutput = [
      ["P", "->", "~Q"],
      ["Q", "->", "~P"],
      ["~P", "->", "Q"],
      ["~Q", "->", "P"],
    ];

    const result = getNegatedBiconditionalCasesToExist(premise);
    expect(result).toEqual(expectedOutput);
  });

  it("should generate correct cases for complex predicates", () => {
    const premise = ["(P ∨ R)", "<->", "(Q ∧ S)"];
    const expectedOutput = [
      ["(P ∨ R)", "->", "~(Q ∧ S)"],
      ["(Q ∧ S)", "->", "~(P ∨ R)"],
      ["~(P ∨ R)", "->", "(Q ∧ S)"],
      ["~(Q ∧ S)", "->", "(P ∨ R)"],
    ];

    const result = getNegatedBiconditionalCasesToExist(premise);
    expect(result).toEqual(expectedOutput);
  });

  it("should handle predicates with multiple terms", () => {
    const premise = ["(A ∧ B)", "<->", "(C ∨ D)"];
    const expectedOutput = [
      ["(A ∧ B)", "->", "~(C ∨ D)"],
      ["(C ∨ D)", "->", "~(A ∧ B)"],
      ["~(A ∧ B)", "->", "(C ∨ D)"],
      ["~(C ∨ D)", "->", "(A ∧ B)"],
    ];

    const result = getNegatedBiconditionalCasesToExist(premise);
    expect(result).toEqual(expectedOutput);
  });
});

describe("isPremiseInQuantifierEnclosure", () => {
  it("test 1", () => {
    const premise = ["P", "<->", "Q"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 2", () => {
    const premise = ["∀y", "∀x", "(", "Pxy", ")"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 3", () => {
    const premise = ["∀y", "Px", "->", "(", "Pxy", ")"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });

  it("test 4", () => {
    const premise = ["∀(x)", "(", "Qx", ")", "&", "∀(x)", "(", "Px", ")"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 5", () => {
    const premise = ["∀y", "(", "Aag", "&", "Agy", ")", "->", "Aay"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 6", () => {
    const premise = [
      "∀y",
      "(",
      "Wf",
      "->",
      "∀y",
      "(",
      "Gy",
      "->",
      "Afy",
      ")",
      ")",
    ];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 7", () => {
    const premise = ["~", "(", "∃(x)", "(", "Gx", "&", "Axf", ")", ")"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 8", () => {
    const premise = ["∃(x)", "(", "Axf", "&", "Afx", ")"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 9", () => {
    const premise = ["∃(x)", "Afx"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 10", () => {
    const premise = ["~", "(", "∃(x)", "Afx", ")"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 11", () => {
    const premise = ["\u2203(y)", "(", "Py", "->", "Ayy", ")"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 12", () => {
    const premise = ["Wa", "->", "\u2200(y)", "(", "Gy", "->", "Aay", ")"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });

  it("test 13", () => {
    const premise = ["\u2203(x)", "Gx", "&", "Axf"];
    const expectedOutput = false;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
  it("test 14", () => {
    const premise = ["\u2203(a)", "Aa + Bb"];
    const expectedOutput = true;

    const result = isPremiseInQuantifierEnclosure(premise);
    expect(result).toEqual(expectedOutput);
  });
});

export {};
