import { convertKBToDeductionSteps } from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import checkForHypotheticalSyllogism from "./checkForHypotheticalSyllogism";

describe("check for Hypothetical Syllogism", () => {
  it("test 1", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["p", "->", "q"],
      ["q", "->", "r"],
    ]);
    const expected = [
      { from: 0, obtained: ["p", "->", "q"], rule: "premise" },
      { from: 0, obtained: ["q", "->", "r"], rule: "premise" },
      {
        from: "0,1",
        obtained: ["p", "->", "r"],
        rule: "Hypothetical Syllogism",
      },
    ];
    expect(
      checkForHypotheticalSyllogism(["p", "->", "r"], deductionSteps)
    ).toEqual(expected);
  });

  it("test 2", () => {
    const deductionSteps = convertKBToDeductionSteps([
      ["q", "->", "r"],
      ["p", "->", "q"],
    ]);

    const expected = [
      { from: 0, obtained: ["q", "->", "r"], rule: "premise" },
      { from: 0, obtained: ["p", "->", "q"], rule: "premise" },
      {
        from: "1,0",
        obtained: ["p", "->", "r"],
        rule: "Hypothetical Syllogism",
      },
    ];

    expect(
      checkForHypotheticalSyllogism(["p", "->", "r"], deductionSteps)
    ).toEqual(expected);
  });

  it("test 3", () => {
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
    ];

    expect(
      checkForHypotheticalSyllogism(
        ["T", "->", "Q"],

        deductionSteps
      )
    ).toEqual(expected);
  });
});

export {};
