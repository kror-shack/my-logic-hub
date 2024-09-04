import { DerivedRules } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkDisjunctionSolvability from "./checkDisjunctionSolvability";

describe("check disjunction solvability", () => {
  const derivedRules: DerivedRules = {
    isDeMorganAllowed: true,
    isMaterialImpAllowed: true,
    isHypSyllAllowed: true,
    isCommutationAllowed: true,
  };
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["p", "|", "q"],
      ["p", "&", "r"],
      ["~p"],
      ["r"],
    ]);
    const expected = [
      { from: 0, obtained: ["p", "|", "q"], rule: "premise" },
      { from: 0, obtained: ["p", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["~p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: "0,2", obtained: ["q"], rule: "Disjunctive Syllogism" },
    ];

    expect(
      checkDisjunctionSolvability(["p", "|", "q"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });

  it("test 2", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["p", "|", "q"],
      ["~q"],
      ["r"],
    ]);
    const expected = [
      { from: 0, obtained: ["p", "|", "q"], rule: "premise" },
      { from: 0, obtained: ["~q"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: "0,1", obtained: ["p"], rule: "Disjunctive Syllogism" },
    ];

    expect(
      checkDisjunctionSolvability(["p", "|", "q"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });

  it("test 3", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "&", "r", ")", "|", "q"],
      ["r"],
      ["s"],
      ["~", "(", "p", "&", "r", ")"],
    ]);
    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "&", "r", ")", "|", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: 0, obtained: ["~", "(", "p", "&", "r", ")"], rule: "premise" },
      { from: "0,3", obtained: ["q"], rule: "Disjunctive Syllogism" },
    ];
    expect(
      checkDisjunctionSolvability(
        ["(", "p", "&", "r", ")", "|", "q"],
        deductionSteps,
        derivedRules
      )
    ).toEqual(expected);
  });
  it("test 4", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["~q"],
      ["p"],
      ["q", "|", "s"],
    ]);
    const expected = [
      { from: 0, obtained: ["~q"], rule: "premise" },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["q", "|", "s"], rule: "premise" },
      { from: "2,0", obtained: ["s"], rule: "Disjunctive Syllogism" },
    ];

    expect(
      checkDisjunctionSolvability(["q", "|", "s"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });
});

export {};
