import checkImplicationSolvability from "./checkImplicationSolvability";

describe("check implication solvability", () => {
  it("test 1", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: `0,2`,
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],
      knowledgeBase: [["p", "->", "q"], ["p", "&", "r"], ["p"], ["r"], ["q"]],
    };
    expect(
      checkImplicationSolvability(
        ["p", "->", "q"],
        [["p", "->", "q"], ["p", "&", "r"], ["p"], ["r"]]
      )
    ).toEqual(expected);
  });

  it("test 2", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: `0,2`,
          obtained: ["~p"],
          rule: "Modus Tonens",
        },
      ],
      knowledgeBase: [
        ["p", "->", "q"],
        ["~q", "&", "r"],
        ["~q"],
        ["r"],
        ["~p"],
      ],
    };
    expect(
      checkImplicationSolvability(
        ["p", "->", "q"],
        [["p", "->", "q"], ["~q", "&", "r"], ["~q"], ["r"]]
      )
    ).toEqual(expected);
  });

  it("test 3", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "2",
          obtained: ["p", "|", "r"],
          rule: "Add",
        },
        {
          from: "0,4",
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],
      knowledgeBase: [
        ["(", "p", "|", "r", ")", "->", "q"],
        ["s", "&", "r"],
        ["r"],
        ["s"],
        ["p", "|", "r"],
        ["q"],
      ],
    };
    expect(
      checkImplicationSolvability(
        ["(", "p", "|", "r", ")", "->", "q"],
        [["(", "p", "|", "r", ")", "->", "q"], ["s", "&", "r"], ["r"], ["s"]]
      )
    ).toEqual(expected);
  });

  it("test 4", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "2",
          obtained: ["~p", "|", "r"],
          rule: "Add",
        },
        {
          from: "4",
          obtained: ["p", "->", "r"],
          rule: "MI",
        },
        {
          from: "0,5",
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],
      knowledgeBase: [
        ["(", "p", "->", "r", ")", "->", "q"],
        ["s", "&", "r"],
        ["r"],
        ["s"],
        ["~p", "|", "r"],
        ["p", "->", "r"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "p", "->", "r", ")", "->", "q"],
        [["(", "p", "->", "r", ")", "->", "q"], ["s", "&", "r"], ["r"], ["s"]]
      )
    ).toEqual(expected);
  });

  it("test 5", () => {
    const expected = {
      deductionStepsArr: [
        { from: "0,2", obtained: ["p", "&", "~r"], rule: "Modus Tonens" },
      ],
      knowledgeBase: [
        ["(", "p", "->", "r", ")", "->", "q"],
        ["s", "&", "r"],
        ["~q"],
        ["s"],
        ["p", "&", "~r"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "p", "->", "r", ")", "->", "q"],
        [["(", "p", "->", "r", ")", "->", "q"], ["s", "&", "r"], ["~q"], ["s"]]
      )
    ).toEqual(expected);
  });

  it("test 6", () => {
    const expected = {
      deductionStepsArr: [
        { from: "1,2", obtained: ["p", "&", "r"], rule: "Conj" },
        { from: "0,3", obtained: ["q"], rule: "Modus Ponens" },
      ],
      knowledgeBase: [
        ["(", "p", "&", "r", ")", "->", "q"],
        ["p"],
        ["r"],
        ["p", "&", "r"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "p", "&", "r", ")", "->", "q"],
        [["(", "p", "&", "r", ")", "->", "q"], ["p"], ["r"]]
      )
    ).toEqual(expected);
  });

  it("test 7", () => {
    const expected = {
      deductionStepsArr: [
        { from: "2,3", obtained: ["r", "&", "s"], rule: "Conj" },
        { from: "1,4", obtained: ["p", "&", "r", "&", "s"], rule: "Conj" },

        { from: "0,5", obtained: ["q"], rule: "Modus Ponens" },
      ],
      knowledgeBase: [
        ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        ["p"],
        ["r"],
        ["s"],
        ["r", "&", "s"],
        ["p", "&", "r", "&", "s"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        [["(", "p", "&", "r", "&", "s", ")", "->", "q"], ["p"], ["r"], ["s"]]
      )
    ).toEqual(expected);
  });

  it("test 8", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "1,2",
          obtained: ["p", "&", "r"],
          rule: "Conj",
        },
        {
          from: "4,3",
          obtained: ["(", "p", "&", "r", ")", "&", "s"],
          rule: "Conj",
        },
        {
          from: "0,5",
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],

      knowledgeBase: [
        ["(", "p", "&", "r", "&", "s", ")", "->", "q"],
        ["p"],
        ["r"],
        ["s"],
        ["p", "&", "r"],
        ["(", "p", "&", "r", ")", "&", "s"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "&", "r", ")", "&", "s", ")", "->", "q"],
        [["(", "p", "&", "r", "&", "s", ")", "->", "q"], ["p"], ["r"], ["s"]]
      )
    ).toEqual(expected);
  });

  it("test 9", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "3",
          obtained: ["~", "(", "p", "->", "r", ")", "|", "s"],
          rule: "Add",
        },
        {
          from: "4",
          obtained: ["(", "p", "->", "r", ")", "->", "s"],
          rule: "MI",
        },
        {
          from: "0,5",
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],
      knowledgeBase: [
        ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
        ["p"],
        ["r"],
        ["s"],
        ["~", "(", "p", "->", "r", ")", "|", "s"],
        ["(", "p", "->", "r", ")", "->", "s"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
        [
          ["(", "(", "p", "->", "r", ")", "->", "s", ")", "->", "q"],
          ["p"],
          ["r"],
          ["s"],
        ]
      )
    ).toEqual(expected);
  });

  it("test 10", () => {
    const expected = {
      deductionStepsArr: [
        {
          from: "1,2",
          obtained: ["p", "&", "~s"],
          rule: "Conj",
        },
        {
          from: "3",
          obtained: ["~", "(", "p", "->", "s", ")"],
          rule: "Neg",
        },
        {
          from: "4",
          obtained: ["~", "(", "p", "->", "s", ")", "|", "r"],
          rule: "Add",
        },
        {
          from: "5",
          obtained: ["(", "p", "->", "s", ")", "->", "r"],
          rule: "MI",
        },
        {
          from: "0,6",
          obtained: ["q"],
          rule: "Modus Ponens",
        },
      ],
      knowledgeBase: [
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        ["p"],
        ["~s"],
        ["p", "&", "~s"],
        ["~", "(", "p", "->", "s", ")"],
        ["~", "(", "p", "->", "s", ")", "|", "r"],
        ["(", "p", "->", "s", ")", "->", "r"],
        ["q"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        [
          ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
          ["p"],
          ["~s"],
        ]
      )
    ).toEqual(expected);
  });

  it("test 11 -null test", () => {
    const expected = {
      deductionStepsArr: [],
      knowledgeBase: [
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        ["~s"],
      ],
    };

    expect(
      checkImplicationSolvability(
        ["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"],
        [["(", "(", "p", "->", "s", ")", "->", "r", ")", "->", "q"], ["~s"]]
      )
    ).toEqual(expected);
  });
});

export {};
