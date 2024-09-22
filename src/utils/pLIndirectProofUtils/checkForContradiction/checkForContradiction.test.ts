import { DerivedRules } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForContradiction from "./checkForContradiction";

describe("getDeductionSteps", () => {
  const derivedRules: DerivedRules = {
    isDeMorganAllowed: true,
    isMaterialImpAllowed: true,
    isHypSyllAllowed: true,
    isCommutationAllowed: true,
    isDisjunctiveSyllAllowed: true,
  };
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([["p"], ["~p"]]);
    const expected = [
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["~p"], rule: "premise" },
      { from: "0, 1", obtained: ["p", "&", "~p"], rule: "Conjunction" },
    ];
    expect(checkForContradiction(deductionSteps, derivedRules)).toEqual(
      expected
    );
  });
  it("test 2 --null test", () => {
    const deductionSteps = convertKBToDeductionSteps([["p"], ["~q"]]);

    expect(checkForContradiction(deductionSteps, derivedRules)).toEqual(false);
  });
});
