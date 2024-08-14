import { DeductionStep } from "../../../types/sharedTypes";
import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import expandKnowledgeBase from "./expandKnowledgeBase";

describe("expandKnowledgeBase", () => {
  it("test 1 - simplification", () => {
    const simplifiableExpressions = [["(", "p", "&", "q", ")", "&", "r"]];
    const deductionStepsArr: DeductionStep[] = [];
    const expected = [
      { from: "0", obtained: ["p", "&", "q"], rule: "Simplification" },
      { from: "0", obtained: ["r"], rule: "Simplification" },
    ];

    expect(
      expandKnowledgeBase(simplifiableExpressions, deductionStepsArr)
    ).toEqual(expected);
  });

  it("test 2 - MP", () => {
    const simplifiableExpressions = [
      ["p", "&", "q"],
      ["(", "p", "&", "q", ")", "->", "r"],
    ];
    const deductionStepsArr: DeductionStep[] = [];
    const expected = [
      { from: "0", obtained: ["p"], rule: "Simplification" },
      { from: "0", obtained: ["q"], rule: "Simplification" },
      { from: "0,1", obtained: ["p", "&", "q"], rule: "Conjunction" },
      { from: "0,2", obtained: ["r"], rule: "Modus Ponens" },
    ];

    expect(
      expandKnowledgeBase(simplifiableExpressions, deductionStepsArr)
    ).toEqual(expected);
  });
  /**
   * TODO: SEPERATE NEGATION AND DEMORGAN
   * maybe should remove DeMorgan entirely when adding
   * features for modern logic
   */
  it("test 3 - MT", () => {
    const simplifiableExpressions = [["(", "p", "&", "q", ")", "->", "r"]];
    const deductionStepsArr = convertKBToDeductionSteps([
      ["(", "p", "&", "q", ")", "->", "r"],
      ["~r"],
    ]);
    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "&", "q", ")", "->", "r"],
        rule: "premise",
      },
      { from: 0, obtained: ["~r"], rule: "premise" },
      {
        from: "0,1",
        obtained: ["~", "(", "p", "&", "q", ")"],
        rule: "Modus Tollens",
      },
    ];

    expect(
      expandKnowledgeBase(simplifiableExpressions, deductionStepsArr)
    ).toEqual(expected);
  });
});
