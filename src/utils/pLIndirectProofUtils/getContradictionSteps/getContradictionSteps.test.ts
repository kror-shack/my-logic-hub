import getContradictionSteps from "./getContradictionSteps";

describe("getContradictionSteps", () => {
  it("test 1", () => {
    const expected = [
      {
        obtained: ["~Q"],
        rule: "Assuming the contradiction",
        from: "conc",
      },
      { obtained: ["Q"], rule: "Modus Ponens", from: "1,2" },
      { obtained: ["P", "&", "~Q"], rule: "Conjunction", from: "2,3" },
      {
        obtained: ["~", "(", "~P", "|", "Q", ")"],
        rule: "DeMorgan Theorem",
        from: "5",
      },
      {
        obtained: ["~", "(", "P", "->", "Q", ")"],
        rule: "Material Implication",
        from: "6",
      },
      {
        obtained: [
          "(",
          "P",
          "->",
          "Q",
          ")",
          "&",
          "~",
          "(",
          "P",
          "->",
          "Q",
          ")",
        ],
        rule: "Conjunction",
        from: "1,7",
      },
      {
        obtained: [
          "(",
          "P",
          "->",
          "Q",
          ")",
          "&",
          "~",
          "(",
          "P",
          "->",
          "Q",
          ")",
        ],
        rule: "-R Contradiction",
        from: "8",
      },
    ];
    expect(getContradictionSteps(["P->Q", "P"], "Q")).toEqual(expected);
  });
  it("test 2", () => {
    const expected = [
      {
        obtained: ["A"],
        rule: "Assuming the contradiction",
        from: "conc",
      },
      { obtained: ["B"], rule: "Modus Ponens", from: "1,3" },
      { obtained: ["~B"], rule: "Disjunctive Syllogism", from: "2,3" },
      { obtained: ["A", "&", "~B"], rule: "Conjunction", from: "3,5" },
      {
        obtained: ["~", "(", "~A", "|", "B", ")"],
        rule: "DeMorgan Theorem",
        from: "6",
      },
      {
        obtained: ["~", "(", "A", "->", "B", ")"],
        rule: "Material Implication",
        from: "7",
      },
      {
        obtained: [
          "(",
          "A",
          "->",
          "B",
          ")",
          "&",
          "~",
          "(",
          "A",
          "->",
          "B",
          ")",
        ],
        rule: "Conjunction",
        from: "1,8",
      },
      {
        obtained: [
          "(",
          "A",
          "->",
          "B",
          ")",
          "&",
          "~",
          "(",
          "A",
          "->",
          "B",
          ")",
        ],
        rule: "-R Contradiction",
        from: "9",
      },
    ];

    expect(getContradictionSteps(["A->B", "~A|~B"], "~A")).toEqual(expected);
  });
});
