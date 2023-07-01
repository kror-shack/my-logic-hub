import {
  getTranspose,
  removeOutermostBrackets,
} from "./propositionalLogicHelperFunction"; // Replace 'your-file' with the actual file name

describe("removeOutermostBrackets", () => {
  it("should remove outermost brackets when they exist", () => {
    expect(removeOutermostBrackets(["(", "a", "b", "c", ")"])).toEqual([
      "a",
      "b",
      "c",
    ]);
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
    expect(
      removeOutermostBrackets(["(", "a", "(", "b", "(", "c", ")", ")", ")"])
    ).toEqual(["a", "(", "b", "(", "c", ")", ")"]);
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
});

describe("get transpose", () => {
  it("~S ->  T", () => {
    expect(getTranspose(["~S", "->", "T"])).toEqual(["~T", "->", "S"]);
  });
});

export {};
