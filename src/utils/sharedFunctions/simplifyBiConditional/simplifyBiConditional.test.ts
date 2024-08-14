import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import simplifyBiConditional from "./simplifyBiConditional";

describe("simplifyAndOperation", () => {
  it('should return [p, q] for ["p", "&", "q"]', () => {
    const deductionSteps = convertKBToDeductionSteps([["p", "<->", "q"]]);
    const expected = [
      { from: 0, obtained: ["p", "<->", "q"], rule: "premise" },
      {
        from: "0",
        obtained: ["(", "p", "->", "q", ")", "&", "(", "q", "->", "p", ")"],
        rule: "Biconditional Elimination",
      },
    ];
    expect(simplifyBiConditional(["p", "<->", "q"], deductionSteps)).toEqual(
      expected
    );
  });
  it("should deal correctly with brackets", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "->", "q", ")", "<->", "r"],
    ]);
    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "->", "q", ")", "<->", "r"],
        rule: "premise",
      },
      {
        from: "0",
        obtained: [
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "r",
          ")",
          "&",
          "(",
          "r",
          "->",
          "(",
          "p",
          "->",
          "q",
          ")",
          ")",
        ],
        rule: "Biconditional Elimination",
      },
    ];

    expect(
      simplifyBiConditional(
        ["(", "p", "->", "q", ")", "<->", "r"],
        deductionSteps
      )
    ).toEqual(expected);
  });
});
