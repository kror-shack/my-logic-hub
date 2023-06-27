import checkKnowledgeBase from "./checkKnowledgeBase";

describe("check knowledge base", () => {
  it("test 2", () => {
    expect(
      checkKnowledgeBase(
        ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        [["T"], ["Q"]],
        []
      )
    ).toEqual(true);
  });
});

export {};
