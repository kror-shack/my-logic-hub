import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import simplifyAndOperation from "./simplifyAndOperation";

describe("simplifyAndOperation", () => {
  it('should return [p, q] for ["p", "&", "q"]', () => {
    const deductionSteps = convertKBToDeductionSteps([["p", "&", "q"]]);
    const expected = [
      { from: 0, obtained: ["p", "&", "q"], rule: "premise" },
      { from: "0", obtained: ["p"], rule: "Simplification" },
      { from: "0", obtained: ["q"], rule: "Simplification" },
    ];
    expect(simplifyAndOperation(["p", "&", "q"], deductionSteps)).toEqual(
      expected
    );
  });

  it("test 2", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "~Q", "->", "P", ")", "&", "(", "R", "->", "T", ")"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "~Q", "->", "P", ")", "&", "(", "R", "->", "T", ")"],
        rule: "premise",
      },
      { from: "0", obtained: ["~Q", "->", "P"], rule: "Simplification" },
      { from: "0", obtained: ["R", "->", "T"], rule: "Simplification" },
    ];
    expect(
      simplifyAndOperation(
        ["(", "~Q", "->", "P", ")", "&", "(", "R", "->", "T", ")"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it('should return [~p, ~q] for ["~p", "&", "~q"]', () => {
    const deductionSteps = convertKBToDeductionSteps([]);
    const expected = [
      { from: "0", obtained: ["~p"], rule: "Simplification" },
      { from: "0", obtained: ["~q"], rule: "Simplification" },
    ];
    expect(simplifyAndOperation(["~p", "&", "~q"], deductionSteps)).toEqual(
      expected
    );
  });

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
