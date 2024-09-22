import { DerivedRules } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkConditionalDerivation from "./checkConditionalDerivation";

describe.skip("check conditional derivation", () => {
  const derivedRules: DerivedRules = {
    isMaterialImpAllowed: false,
    isDeMorganAllowed: false,
    isHypSyllAllowed: false,
    isCommutationAllowed: false,
    isDisjunctiveSyllAllowed: false,
  };
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([["q"]]);
    const expected = [
      { from: 0, obtained: ["q"], rule: "premise" },
      {
        closed: true,
        from: null,
        obtained: ["p", "->", "q"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
      { closed: true, from: null, obtained: ["q"], rule: null, show: true },
      { closed: null, from: 0, obtained: ["q"], rule: "R", show: false },
    ];
    expect(
      checkConditionalDerivation(["p", "->", "q"], deductionSteps, derivedRules)
    ).toEqual(expected);
  });
  it("test 2", () => {
    const deductionSteps = convertKBToDeductionSteps([["r"]]);

    const expected = expect(
      checkConditionalDerivation(["p", "->", "s"], deductionSteps, derivedRules)
    ).toEqual(false);
  });
  it("test 3", () => {
    const deductionSteps = convertKBToDeductionSteps([["r"]]);

    const expected = [["r"], ["r", "|", "s"]];
    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "|", "s", ")"],
        deductionSteps,
        derivedRules
      )
    ).toEqual(true);
  });
  it("test 4", () => {
    const deductionSteps = convertKBToDeductionSteps([["r"], ["s"]]);

    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "&", "s", ")"],
        deductionSteps,
        derivedRules
      )
    ).toEqual(true);
  });
  it("test 5", () => {
    const deductionSteps = convertKBToDeductionSteps([["r"], ["s"]]);

    expect(
      checkConditionalDerivation(
        ["p", "->", "(", "r", "->", "s", ")"],
        deductionSteps,
        derivedRules
      )
    ).toEqual(true);
  });
});
