import simplifyBiConditional from "./simplifyBiConditional";

describe("simplifyAndOperation", () => {
  it('should return [p, q] for ["p", "&", "q"]', () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "0",
          obtained: ["(", "p", "->", "q", ")", "&", "(", "q", "->", "p", ")"],
          rule: "Biconditional Elimination",
        },
      ],
      knowledgeBase: [
        ["p", "<->", "q"],
        ["(", "p", "->", "q", ")", "&", "(", "q", "->", "p", ")"],
      ],
    };

    expect(
      simplifyBiConditional(["p", "<->", "q"], [["p", "<->", "q"]])
    ).toEqual(expected);
  });
});
