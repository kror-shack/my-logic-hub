import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkKnowledgeBase from "./checkKnowledgeBase";

describe("check knowledge base", () => {
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([["T"], ["Q"]]);
    const expected = [
      { obtained: ["T"], rule: "premise", from: 0 },
      { obtained: ["Q"], rule: "premise", from: 0 },
      { obtained: ["S", "|", "T"], rule: "Addition", from: "0" },
      { obtained: ["~S", "->", "T"], rule: "Material Implication", from: "2" },
      { obtained: ["Q", "|", "D"], rule: "Addition", from: "1" },
      { obtained: ["~Q", "->", "D"], rule: "Material Implication", from: "4" },
      {
        obtained: ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        rule: "Conjunction",
        from: "3,5",
      },
    ];
    expect(
      checkKnowledgeBase(
        ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      { from: 0, obtained: ["T", "->", "S"], rule: "premise" },
      { from: 0, obtained: ["S", "->", "~Q"], rule: "premise" },
      {
        from: "0,1",
        obtained: ["T", "->", "~Q"],
        rule: "Hypothetical Syllogism",
      },
    ];
    const deductionSteps = convertKBToDeductionSteps([
      ["T", "->", "S"],
      ["S", "->", "~Q"],
    ]);

    expect(checkKnowledgeBase(["T", "->", "~Q"], deductionSteps)).toEqual(
      expected
    );
  });

  it("test 3", () => {
    const expected = [
      { from: 0, obtained: ["∀x", "(", "Qx", ")"], rule: "premise" },
      {
        from: "0",
        obtained: ["∀x", "(", "Qx", ")", "|", "∀x", "(", "Px", ")"],
        rule: "Addition",
      },
    ];
    const deductionSteps = convertKBToDeductionSteps([["∀x", "(", "Qx", ")"]]);

    expect(
      checkKnowledgeBase(
        ["∀x", "(", "Qx", ")", "|", "∀x", "(", "Px", ")"],
        deductionSteps
      )
    ).toEqual(expected);
  });
  it("test 4", () => {
    const deductionSteps = [
      { obtained: ["∀(x)", "(", "Px", ")"], rule: "premise", from: 0 },
      { obtained: ["Pa"], rule: "Universal Instantiation", from: "0" },
    ];

    expect(checkKnowledgeBase(["~Pa"], deductionSteps)).toEqual(false);
  });
});

export {};
