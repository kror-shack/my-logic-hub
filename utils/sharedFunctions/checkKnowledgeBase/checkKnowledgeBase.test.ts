import checkKnowledgeBase from "./checkKnowledgeBase";

describe("check knowledge base", () => {
  it("test 1", () => {
    expect(
      checkKnowledgeBase(
        ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        [["T"], ["Q"]],
        []
      )
    ).toEqual(true);
  });

  it("test 2", () => {
    expect(
      checkKnowledgeBase(
        ["T", "->", "~Q"],
        [
          ["T", "->", "S"],
          ["S", "->", "~Q"],
        ],
        []
      )
    ).toEqual(true);
  });
});

export {};
