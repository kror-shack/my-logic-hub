import checkWithConclusion from "./checkWithConclusion";

describe("checkWithConclusion", () => {
  it("test 1", () => {
    expect(
      checkWithConclusion(
        [
          ["(", "p", "->", "r", ")", "->", "q"],
          ["s"],
          ["~p", "|", "r"],
          ["p", "->", "r"],
          ["q"],
        ],
        ["s"]
      )
    ).toEqual(true);
  });

  it("test 2", () => {
    expect(
      checkWithConclusion(
        [
          ["(", "p", "->", "r", ")", "->", "q"],
          ["s", "&", "r"],
          ["r"],
          ["s"],
          ["~p", "|", "r"],
          ["p", "->", "r"],
          ["q"],
        ],
        ["t"]
      )
    ).toEqual(false);
  });
});

export {};
