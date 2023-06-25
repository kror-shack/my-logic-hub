import checkDisjunctionSolvability from "./checkDisjunctionSolvability";

describe("check disjunction solvability", () => {
  it("test 1", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: `0,2`,
          obtained: ["q"],
          rule: "D.S.",
        },
      ],
      knowledgeBase: [["p", "|", "q"], ["p", "&", "r"], ["~p"], ["r"], ["q"]],
    };
    expect(
      checkDisjunctionSolvability(
        ["p", "|", "q"],
        [["p", "|", "q"], ["p", "&", "r"], ["~p"], ["r"]]
      )
    ).toEqual(expected);
  });

  it("test 2", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: `0,1`,
          obtained: ["p"],
          rule: "D.S.",
        },
      ],
      knowledgeBase: [["p", "|", "q"], ["~q"], ["r"], ["p"]],
    };
    expect(
      checkDisjunctionSolvability(
        ["p", "|", "q"],
        [["p", "|", "q"], ["~q"], ["r"]]
      )
    ).toEqual(expected);
  });

  it("test 3", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "0,3",
          obtained: ["q"],
          rule: "D.S.",
        },
      ],
      knowledgeBase: [
        ["(", "p", "&", "r", ")", "|", "q"],
        ["r"],
        ["s"],
        ["~", "(", "p", "&", "r", ")"],
        ["q"],
      ],
    };
    expect(
      checkDisjunctionSolvability(
        ["(", "p", "&", "r", ")", "|", "q"],
        [
          ["(", "p", "&", "r", ")", "|", "q"],
          ["r"],
          ["s"],
          ["~", "(", "p", "&", "r", ")"],
        ]
      )
    ).toEqual(expected);
  });
  it("test 4", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: `2,0`,
          obtained: ["s"],
          rule: "D.S.",
        },
      ],
      knowledgeBase: [["~q"], ["p"], ["q", "|", "s"], ["s"]],
    };
    expect(
      checkDisjunctionSolvability(
        ["q", "|", "s"],
        [["~q"], ["p"], ["q", "|", "s"]]
      )
    ).toEqual(expected);
  });
});

export {};
