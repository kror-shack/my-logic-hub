import evalulateReversePolishNotaion from "./evaluateReversePolishNotation";

describe("convertToReversePolishNotaion", () => {
  it("p & q", () => {
    const result = evalulateReversePolishNotaion(["p", "q", "&"], 4);
    const expected = {
      p: ["T", "T", "F", "F"],
      q: ["T", "F", "T", "F"],
      "p&q": ["T", "F", "F", "F"],
    };
    expect(result).toEqual(expected);
  });

  it("p | q", () => {
    const result = evalulateReversePolishNotaion(["p", "q", "|"], 4);
    const expected = {
      p: ["T", "T", "F", "F"],
      q: ["T", "F", "T", "F"],
      "p|q": ["T", "T", "T", "F"],
    };
    expect(result).toEqual(expected);
  });

  it("p  q", () => {
    const result = evalulateReversePolishNotaion(["p", "q", "r", "|", "&"], 8);
    const expected = {
      p: ["T", "T", "T", "T", "F", "F", "F", "F"],
      q: ["T", "T", "F", "F", "T", "T", "F", "F"],
      r: ["T", "F", "T", "F", "T", "F", "T", "F"],
      "q|r": ["T", "T", "T", "F", "T", "T", "T", "F"],
      "p&q|r": ["T", "T", "T", "F", "F", "F", "F", "F"],
    };
    expect(result).toEqual(expected);
  });
});

export {};
