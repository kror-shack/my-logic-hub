import simplifyAndOperation from "./simplifyAndOperation";

describe("simplifyAndOperation", () => {
  it.only('should return [p, q] for ["p", "&", "q"]', () => {
    const expected = {
      deductionStepsArr: [
        { from: "0", obtained: ["p"], rule: "Simplification" },
        { from: "0", obtained: ["q"], rule: "Simplification" },
      ],
      knowledgeBase: [["p", "&", "q"], ["p"], ["q"]],
    };
    expect(simplifyAndOperation(["p", "&", "q"], [["p", "&", "q"]])).toEqual(
      expected
    );
  });

  // it('should return [~p, ~q] for ["~p", "&", "~q"]', () => {
  //   expect(simplifyAndOperation(["~p", "&", "~q"])).toEqual([["~p"], ["~q"]]);
  // });

  // it('should return [~a, b] for ["(", "~a)", "&", "b"]', () => {
  //   expect(simplifyAndOperation(["(", "~a", ")", "&", "b"])).toEqual([
  //     ["~a"],
  //     ["b"],
  //   ]);
  // });

  // it('should return [p, ~r] for ["p", "&", "(~r)"]', () => {
  //   expect(simplifyAndOperation(["p", "&", "(", "~r", ")"])).toEqual([
  //     ["p"],
  //     ["~r"],
  //   ]);
  // });
});

export {};
