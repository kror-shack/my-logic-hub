import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkImplicationSolvability from "./checkImplicationSolvability";

describe("check implication solvability", () => {
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["p", "->", "q"],
      ["p", "&", "r"],
      ["p"],
      ["r"],
    ]);
    const expected = [
      { from: 0, obtained: ["p", "->", "q"], rule: "premise" },
      { from: 0, obtained: ["p", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: "0,2", obtained: ["q"], rule: "Modus Ponens" },
    ];
    expect(
      checkImplicationSolvability(["p", "->", "q"], deductionSteps)
    ).toEqual(expected);
  });

  it("test 2", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["p", "->", "q"],
      ["~q", "&", "r"],
      ["~q"],
      ["r"],
    ]);

    const expected = [
      { from: 0, obtained: ["p", "->", "q"], rule: "premise" },
      { from: 0, obtained: ["~q", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["~q"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: "0,2", obtained: ["~p"], rule: "Modus Tollens" },
    ];
    expect(
      checkImplicationSolvability(["p", "->", "q"], deductionSteps)
    ).toEqual(expected);
  });

  it("test 3", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "|", "r", ")", "->", "q"],
      ["s", "&", "r"],
      ["r"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "|", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["s", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: "2", obtained: ["p", "|", "r"], rule: "Addition" },
      { from: "0,4", obtained: ["q"], rule: "Modus Ponens" },
    ];
    expect(
      checkImplicationSolvability(
        ["(", "p", "|", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 4", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "->", "r", ")", "->", "q"],
      ["s", "&", "r"],
      ["r"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "->", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["s", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: "2", obtained: ["~p", "|", "r"], rule: "Addition" },
      { from: "4", obtained: ["p", "->", "r"], rule: "Material Implication" },
      { from: "0,5", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "p", "->", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 5", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "->", "r", ")", "->", "q"],
      ["s", "&", "r"],
      ["~q"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "->", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["s", "&", "r"], rule: "premise" },
      { from: 0, obtained: ["~q"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      {
        from: "0,2",
        obtained: ["~", "(", "p", "->", "r", ")"],
        rule: "Modus Tollens",
      },
    ];
    expect(
      checkImplicationSolvability(
        ["(", "p", "->", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 6", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "&", "r", ")", "->", "q"],
      ["p"],
      ["r"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "&", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: "1,2", obtained: ["p", "&", "r"], rule: "Conjunction" },
      { from: "0,3", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "p", "&", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 7", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
      ["p"],
      ["r"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: "2,3", obtained: ["r", "&", "s"], rule: "Conjunction" },
      { from: "1,4", obtained: ["p", "&", "r", "&", "s"], rule: "Conjunction" },
      { from: "0,5", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 8", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
      ["p"],
      ["r"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      { from: "1,2", obtained: ["p", "&", "r"], rule: "Conjunction" },
      {
        from: "4,3",
        obtained: ["(", "p", "&", "r", ")", "&", "s"],
        rule: "Conjunction",
      },
      { from: "0,5", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "&", "r", ")", "&", "s", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 9", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
      ["p"],
      ["r"],
      ["s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["r"], rule: "premise" },
      { from: 0, obtained: ["s"], rule: "premise" },
      {
        from: "3",
        obtained: ["~", "(", "p", "->", "r", ")", "|", "s"],
        rule: "Addition",
      },
      {
        from: "4",
        obtained: ["(", "p", "->", "r", ")", "->", "s"],
        rule: "Material Implication",
      },
      { from: "0,5", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 10", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
      ["p"],
      ["~s"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        rule: "premise",
      },
      { from: 0, obtained: ["p"], rule: "premise" },
      { from: 0, obtained: ["~s"], rule: "premise" },
      { from: "1,2", obtained: ["p", "&", "~s"], rule: "Conjunction" },
      {
        from: "3",
        obtained: ["~", "(", "~p", "|", "s", ")"],
        rule: "DeMorgan Theorem",
      },
      {
        from: "4",
        obtained: ["~", "(", "p", "->", "s", ")"],
        rule: "Material Implication",
      },
      {
        from: "5",
        obtained: ["~", "(", "p", "->", "s", ")", "|", "r"],
        rule: "Addition",
      },
      {
        from: "6",
        obtained: ["(", "p", "->", "s", ")", "->", "r"],
        rule: "Material Implication",
      },
      { from: "0,7", obtained: ["q"], rule: "Modus Ponens" },
    ];

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 11 -null test", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
    ]);

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        deductionSteps
      )
    ).toEqual(false);
  });

  it("test 12", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["(", "S", "|", "R", ")", "->", "(", "~P", "->", "Q", ")"],
      ["~S", "->", "~", "(", "T", "->", "Q", ")"],
      ["R", "->", "~T"],
      ["~P"],
      ["~R", "->", "Q"],
      ["S", "->", "~Q"],
      ["~S", "->", "T"],
    ]);

    const expected = [
      {
        from: 0,
        obtained: ["(", "S", "|", "R", ")", "->", "(", "~P", "->", "Q", ")"],
        rule: "premise",
      },
      {
        from: 0,
        obtained: ["~S", "->", "~", "(", "T", "->", "Q", ")"],
        rule: "premise",
      },
      { from: 0, obtained: ["R", "->", "~T"], rule: "premise" },
      { from: 0, obtained: ["~P"], rule: "premise" },
      { from: 0, obtained: ["~R", "->", "Q"], rule: "premise" },
      { from: 0, obtained: ["S", "->", "~Q"], rule: "premise" },
      { from: 0, obtained: ["~S", "->", "T"], rule: "premise" },
      { from: "2", obtained: ["T", "->", "~R"], rule: "Transposition" },
      {
        from: "7,4",
        obtained: ["T", "->", "Q"],
        rule: "Hypothetical Syllogism",
      },
      { from: "1,8", obtained: ["S"], rule: "Modus Tollens" },
    ];

    expect(
      checkImplicationSolvability(
        ["~S", "->", "~", "(", "T", "->", "Q", ")"],
        deductionSteps
      )
    ).toEqual(expected);
  });

  it("test 13 -null test", () => {
    const deductionSteps = convertKBToDeductionSteps([["Q", "->", "P"]]);

    expect(
      checkImplicationSolvability(["Q", "->", "P"], deductionSteps)
    ).toEqual(false);
  });
});

export {};
