import { DeductionStep, DerivedRules } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import getDesiredConcFromAssumption from "./getDesiredConcFromAssumption";

describe.skip("getDesiredConcFromAssumption", () => {
  const derivedRules: DerivedRules = {
    isDeMorganAllowed: false,
    isMaterialImpAllowed: false,
    isHypSyllAllowed: false,
    isCommutationAllowed: false,
    isDisjunctiveSyllAllowed: false,
  };

  test("should get antecedent of a nested conditional", () => {
    const deductionSteps: DeductionStep[] = [
      {
        obtained: ["(", "p", "->", "q", ")", "->", "r"],
        rule: "ACD",
        from: null,
      },
    ];

    const expected = [
      {
        from: null,
        obtained: ["(", "p", "->", "q", ")", "->", "r"],
        rule: "ACD",
      },
      {
        closed: null,
        from: null,
        obtained: ["p", "->", "q"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
    ];
    expect(
      getDesiredConcFromAssumption(["p"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });

  /**
   * Need to confirm whether the derivation asserted in the following tests is
   * sound
   */
  test.skip("should get antecedent of a conditional", () => {
    const deductionSteps: DeductionStep[] = [
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
      },
    ];

    const expected = [
      { from: null, obtained: ["p", "->", "q"], rule: "ACD" },
      {
        closed: null,
        from: null,
        obtained: ["p", "->", "q"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
    ];
    expect(
      getDesiredConcFromAssumption(["p"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });

  test.skip("should get antecedent of a conditional -2", () => {
    const deductionSteps: DeductionStep[] = [
      {
        obtained: ["p", "->", "(", "p", "->", "q", ")"],
        rule: "ACD",
        from: null,
      },
    ];

    const expected = [
      {
        from: null,
        obtained: ["p", "->", "(", "p", "->", "q", ")"],
        rule: "ACD",
      },
      {
        closed: null,
        from: null,
        obtained: ["p", "->", "(", "p", "->", "q", ")"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
    ];
    expect(
      getDesiredConcFromAssumption(["p"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });
});
