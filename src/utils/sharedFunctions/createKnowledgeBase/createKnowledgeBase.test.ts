import createKnowledgeBase from "./createKnowledgeBase";

describe("create knowledge base", () => {
  it("test 1", () => {
    const expected = {
      deductionSteps: [
        {
          from: 1,
          obtained: ["p"],
          rule: "Conjunction",
        },
        {
          from: 1,
          obtained: ["q"],
          rule: "Conjunction",
        },
      ],
      knowledgeBase: [["p", "->", "q"], ["p", "&", "q"], ["p"], ["q"]],
      simplifiableExpressions: [["p", "->", "q"]],
    };
    expect(
      createKnowledgeBase([
        ["p", "->", "q"],
        ["p", "&", "q"],
      ])
    ).toEqual(expected);
  });

  it("test 2", () => {
    const expected = {
      deductionSteps: [
        { from: 1, obtained: ["p"], rule: "Conjunction" },
        {
          from: 1,
          obtained: ["q", "&", "(", "r", "&", "s", ")"],
          rule: "Conjunction",
        },
        { from: 3, obtained: ["q"], rule: "Conjunction" },
        { from: 3, obtained: ["r", "&", "s"], rule: "Conjunction" },
        { from: 5, obtained: ["r"], rule: "Conjunction" },
        { from: 5, obtained: ["s"], rule: "Conjunction" },
      ],
      knowledgeBase: [
        ["p", "->", "q"],
        ["p", "&", "q", "&", "(", "r", "&", "s", ")"],
        ["p"],
        ["q", "&", "(", "r", "&", "s", ")"],
        ["q"],
        ["r", "&", "s"],
        ["r"],
        ["s"],
      ],
      simplifiableExpressions: [["p", "->", "q"]],
    };
    expect(
      createKnowledgeBase([
        ["p", "->", "q"],
        ["p", "&", "q", "&", "(", "r", "&", "s", ")"],
      ])
    ).toEqual(expected);
  });
});

export {};
