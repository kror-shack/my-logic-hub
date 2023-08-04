import removeOutermostBrackets from "./removeOutermostBrackets";

describe("removeOutermostBrackets", () => {
  it("should remove outermost brackets when they exist", () => {
    expect(removeOutermostBrackets(["(", "a", "b", "c", ")"])).toEqual([
      "a",
      "b",
      "c",
    ]);
  });

  it("should not remove outermost brackets if they are not at the same level", () => {
    expect(
      removeOutermostBrackets(["(", "(", "a", "b", "c", ")", ")"])
    ).toEqual(["(", "a", "b", "c", ")"]);
    expect(
      removeOutermostBrackets([
        "(",
        "(",
        "a",
        ")",
        "(",
        "b",
        ")",
        "(",
        "c",
        ")",
        ")",
      ])
    ).toEqual(["(", "a", ")", "(", "b", ")", "(", "c", ")"]);
  });

  it("should handle nested brackets correctly", () => {
    expect(
      removeOutermostBrackets(["(", "a", "(", "b", "(", "c", ")", ")", ")"])
    ).toEqual(["a", "(", "b", "(", "c", ")", ")"]);
  });

  it("should preserve brackets when they are not outermost", () => {
    expect(
      removeOutermostBrackets([
        "(",
        "[",
        "1",
        ",",
        " ",
        "2",
        ",",
        " ",
        "3",
        "]",
        ")",
      ])
    ).toEqual(["[", "1", ",", " ", "2", ",", " ", "3", "]"]);
  });

  it("should not modify the array if there are no outermost brackets", () => {
    expect(removeOutermostBrackets(["a", "b", "c"])).toEqual(["a", "b", "c"]);
  });

  it("should handle empty arrays", () => {
    expect(removeOutermostBrackets([])).toEqual([]);
  });

  it("should not remove outermost but nested brackets", () => {
    expect(
      removeOutermostBrackets([
        "(",
        "p",
        "->",
        "q",
        ")",
        "&",
        "(",
        "q",
        "->",
        "p",
        ")",
      ])
    ).toEqual(["(", "p", "->", "q", ")", "&", "(", "q", "->", "p", ")"]);
  });
  it("should  remove outermost brackets --quanitfiable", () => {
    expect(removeOutermostBrackets(["(", "A^a", "->", "B^a", ")"])).toEqual([
      "A^a",
      "->",
      "B^a",
    ]);
  });
  it("should  remove outermost brackets --quanitfiable 1", () => {
    expect(removeOutermostBrackets(["(", "A^a", ")"])).toEqual(["A^a"]);
  });
  it("should  remove outermost brackets --quanitfiable 3", () => {
    expect(removeOutermostBrackets(["(", "~B^a", ")"])).toEqual(["~B^a"]);
  });

  it("with negation", () => {
    expect(
      removeOutermostBrackets(["~S", "->", "~", "(", "T", "->", "Q", ")"])
    ).toEqual(["~S", "->", "~", "(", "T", "->", "Q", ")"]);
  });
});

export {};
