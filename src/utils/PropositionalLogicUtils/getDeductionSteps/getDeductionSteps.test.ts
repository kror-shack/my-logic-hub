import getDeductionSteps from "./getDeductionsteps";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    const expected = [
      { from: "1", obtained: ["p"], rule: "Simp" },
      { from: "1", obtained: ["q"], rule: "Simp" },
    ];

    expect(getDeductionSteps(["p->q", "p&q"], "q")).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      { from: "0", obtained: ["A"], rule: "Simp" },
      { from: "0", obtained: ["B"], rule: "Simp" },
      { from: "2", obtained: ["A", "|", "C"], rule: "Add" },
      { from: "1,4", obtained: ["D"], rule: "Modus Ponens" },
      { from: "2,5", obtained: ["A", "&", "D"], rule: "Conj" },
    ];

    expect(getDeductionSteps(["A&B", "(A|C)->D"], "A&D")).toEqual(expected);
  });
});

export {};
