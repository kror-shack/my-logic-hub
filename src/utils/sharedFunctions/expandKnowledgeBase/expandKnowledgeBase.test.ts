import { DeductionStep } from "../../../types/sharedTypes";
import expandKnowledgeBase from "./expandKnowledgeBase";

describe("expandKnowledgeBase", () => {
  it("test 1 - simplification", () => {
    const simplifiableExpressions = [["(", "p", "&", "q", ")", "&", "r"]];
    const knowledgeBase: string[][] = [];
    const deductionStepsArr: DeductionStep[] = [];
    const expected = {
      deductionStepsArr: [
        { from: "0", obtained: ["p", "&", "q"], rule: "Simplification" },
        { from: "0", obtained: ["r"], rule: "Simplification" },
      ],
      knowledgeBase: [["p", "&", "q"], ["r"]],
    };

    expect(
      expandKnowledgeBase(
        simplifiableExpressions,
        knowledgeBase,
        deductionStepsArr
      )
    ).toEqual(expected);
  });

  it("test 2 - MP", () => {
    const simplifiableExpressions = [
      ["p", "&", "q"],
      ["(", "p", "&", "q", ")", "->", "r"],
    ];
    const knowledgeBase: string[][] = [
      ["p", "&", "q"],
      ["(", "p", "&", "q", ")", "->", "r"],
    ];
    const deductionStepsArr: DeductionStep[] = [];
    const expected = {
      deductionStepsArr: [
        { from: "0", obtained: ["p"], rule: "Simplification" },
        { from: "0", obtained: ["q"], rule: "Simplification" },
        { from: "1,0", obtained: ["r"], rule: "Modus Ponens" },
      ],
      knowledgeBase: [
        ["p", "&", "q"],
        ["(", "p", "&", "q", ")", "->", "r"],
        ["p"],
        ["q"],
        ["r"],
      ],
    };

    expect(
      expandKnowledgeBase(
        simplifiableExpressions,
        knowledgeBase,
        deductionStepsArr
      )
    ).toEqual(expected);
  });
  /**
   * TODO: SEPERATE NEGATION AND DEMORGAN
   * maybe should remove DeMorgan entirely when adding
   * features for modern logic
   */
  it("test 3 - MT", () => {
    const simplifiableExpressions = [["(", "p", "&", "q", ")", "->", "r"]];
    const knowledgeBase: string[][] = [
      ["(", "p", "&", "q", ")", "->", "r"],
      ["~r"],
    ];
    const deductionStepsArr: DeductionStep[] = [];
    const expected = {
      deductionStepsArr: [
        {
          from: "0,1",
          obtained: ["~", "(", "p", "&", "q", ")"],
          rule: "Modus Tollens",
        },
      ],
      knowledgeBase: [
        ["(", "p", "&", "q", ")", "->", "r"],
        ["~r"],
        ["~", "(", "p", "&", "q", ")"],
      ],
    };

    expect(
      expandKnowledgeBase(
        simplifiableExpressions,
        knowledgeBase,
        deductionStepsArr
      )
    ).toEqual(expected);
  });
});

export {};
