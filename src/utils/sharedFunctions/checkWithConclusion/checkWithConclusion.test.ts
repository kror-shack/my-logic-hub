import { DerivedRules } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkWithConclusion from "./checkWithConclusion";

describe("checkWithConclusion", () => {
  const derivedRules: DerivedRules = {
    isDeMorganAllowed: true,
    isMaterialImpAllowed: true,
    isHypSyllAllowed: true,
    isCommutationAllowed: true,
    isDisjunctiveSyllAllowed: true,
  };
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "->", "r", ")", "->", "q"],
      ["s"],
      ["~p", "|", "r"],
      ["p", "->", "r"],
      ["q"],
    ]);
    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "->", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: 0, obtained: ["~p", "|", "r"], rule: "premise" },
      { from: 0, obtained: ["p", "->", "r"], rule: "premise" },
      { from: 0, obtained: ["q"], rule: "premise" },
    ];
    expect(checkWithConclusion(["s"], deductionSteps, derivedRules)).toEqual(
      expected
    );
  });

  it("test 2 --null test", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "->", "r", ")", "->", "q"],
      ["s", "&", "r"],
      ["r"],
      ["s"],
      ["~p", "|", "r"],
      ["p", "->", "r"],
      ["q"],
    ]);

    expect(checkWithConclusion(["t"], deductionSteps, derivedRules)).toEqual(
      false
    );
  });
});

export {};
