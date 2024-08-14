import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForContradiction from "./checkForContradiction";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([["p"], ["~p"]]);
    const expected = [
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["~p"], rule: "premise" },
      { from: "0, 1", obtained: ["p", "&", "~p"], rule: "Conjunction" },
    ];
    expect(checkForContradiction(deductionSteps)).toEqual(expected);
  });
  it("test 2 --null test", () => {
    const deductionSteps = convertKBToDeductionSteps([["p"], ["~q"]]);

    expect(checkForContradiction(deductionSteps)).toEqual(false);
  });
});
