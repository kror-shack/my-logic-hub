import getDeductionSteps from "./getDeductionsteps";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    const expected = [
      { from: "2", obtained: ["p"], rule: "Simplification" },
      { from: "2", obtained: ["q"], rule: "Simplification" },
    ];

    expect(getDeductionSteps(["p->q", "p&q"], "q")).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      { from: "1", obtained: ["A"], rule: "Simplification" },
      { from: "1", obtained: ["B"], rule: "Simplification" },
      { from: "3", obtained: ["A", "|", "C"], rule: "Addition" },
      { from: "2,5", obtained: ["D"], rule: "Modus Ponens" },
      { from: "3,6", obtained: ["A", "&", "D"], rule: "Conjunction" },
    ];

    expect(getDeductionSteps(["A&B", "(A|C)->D"], "A&D")).toEqual(expected);
  });

  it("test 3", () => {
    const expected = [
      { from: "1,2", obtained: ["~q"], rule: "Modus Ponens" },
      { from: "3,4", obtained: ["s"], rule: "Disjunctive Syllogism" },
    ];

    expect(getDeductionSteps(["p->~q", "p", "q|s"], "s")).toEqual(expected);
  });

  it("test 4", () => {
    const expected = [
      { from: "1,2", obtained: ["q"], rule: "Modus Ponens" },
      { from: "3,4", obtained: ["s"], rule: "Disjunctive Syllogism" },
    ];

    expect(getDeductionSteps(["p->q", "p", "~q|s"], "s")).toEqual(expected);
  });

  it("test 5", () => {
    const expected = [
      { from: "4", obtained: ["~R"], rule: "Simplification" },
      { from: "4", obtained: ["Q"], rule: "Simplification" },
      { from: "2,6", obtained: ["H"], rule: "Modus Tonens" },
      { from: "3,8", obtained: ["T"], rule: "Modus Ponens" },
      { from: "5,9", obtained: ["~D"], rule: "Modus Ponens" },
      { from: "9", obtained: ["S", "|", "T"], rule: "Addition" },
      { from: "11", obtained: ["~S", "->", "T"], rule: "Material Implication" },
      { from: "7", obtained: ["Q", "|", "D"], rule: "Addition" },
      { from: "13", obtained: ["~Q", "->", "D"], rule: "Material Implication" },
      {
        from: "12,14",
        obtained: ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        rule: "Conjunction",
      },
    ];

    expect(
      getDeductionSteps(
        ["(~S&~H)->D", "~H->R", "H->T", "~R&Q", "T->~D"],
        "(~S->T)&(~Q->D)"
      )
    ).toEqual(expected);
  });
});

export {};
