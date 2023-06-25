import getDeductionSteps from "./getDeductionsteps";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    const expected = [
      { from: "2", obtained: ["p"], rule: "Simp" },
      { from: "2", obtained: ["q"], rule: "Simp" },
    ];

    expect(getDeductionSteps(["p->q", "p&q"], "q")).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      { from: "1", obtained: ["A"], rule: "Simp" },
      { from: "1", obtained: ["B"], rule: "Simp" },
      { from: "3", obtained: ["A", "|", "C"], rule: "Add" },
      { from: "2,5", obtained: ["D"], rule: "Modus Ponens" },
      { from: "3,6", obtained: ["A", "&", "D"], rule: "Conj" },
    ];

    expect(getDeductionSteps(["A&B", "(A|C)->D"], "A&D")).toEqual(expected);
  });

  it("test 3", () => {
    const expected = [
      { from: "1,2", obtained: ["~q"], rule: "Modus Ponens" },
      { from: "3,4", obtained: ["s"], rule: "D.S." },
    ];

    expect(getDeductionSteps(["p->~q", "p", "q|s"], "s")).toEqual(expected);
  });
});

export {};
