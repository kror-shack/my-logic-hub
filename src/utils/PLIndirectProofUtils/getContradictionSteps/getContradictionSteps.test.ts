import getContradictionSteps from "./getContradictionSteps";

describe("getContradictionSteps", () => {
  it("test 1", () => {
    const expected = [
      { from: "conc", obtained: ["~Q"], rule: "Assuming the contradiction" },
      { from: "2,3", obtained: ["Q"], rule: "Modus Ponens" },
      { from: "1,4", obtained: ["~Q", "&", "Q"], rule: "Conjunction" },
      { from: "5", obtained: ["~Q", "&", "Q"], rule: "-R Contradiction" },
    ];

    expect(getContradictionSteps(["P->Q", "P"], "Q")).toEqual(expected);
  });
  it("test 2", () => {
    const expected = [
      { from: "conc", obtained: ["A"], rule: "Assuming the contradiction" },
      { from: "2,1", obtained: ["B"], rule: "Modus Ponens" },
      { from: "3,1", obtained: ["~B"], rule: "Disjunctive Syllogism" },
      { from: "1,5", obtained: ["A", "&", "~B"], rule: "Conjunction" },
      {
        from: "2,6",
        obtained: ["(", "A", "->", "B", ")", "&", "(", "A", "&", "~B", ")"],
        rule: "Conjunction",
      },
      {
        from: "7",
        obtained: ["(", "A", "->", "B", ")", "&", "(", "A", "&", "~B", ")"],
        rule: "-R Contradiction",
      },
    ];

    expect(getContradictionSteps(["A->B", "~A|~B"], "~A")).toEqual(expected);
  });
});
