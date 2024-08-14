import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkWithConclusion from "./checkWithConclusion";

describe("checkWithConclusion", () => {
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
    expect(checkWithConclusion(["s"], deductionSteps)).toEqual(expected);
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

    expect(checkWithConclusion(["t"], deductionSteps)).toEqual(false);
  });
});

export {};
