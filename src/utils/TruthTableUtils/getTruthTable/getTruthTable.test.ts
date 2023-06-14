import getTruthTable from "./getTruthTable";

describe("getTruthTable", () => {
  it.only("gets Conjunction truth table", () => {
    const result = getTruthTable("p & (q | r)");
    const expected = {
      p: ["T", "T", "T", "T", "F", "F", "F", "F"],
      q: ["T", "T", "F", "F", "T", "T", "F", "F"],
      r: ["T", "F", "T", "F", "T", "F", "T", "F"],
      "q|r": ["T", "T", "T", "F", "T", "T", "T", "F"],
      "p&q|r": ["T", "T", "T", "F", "F", "F", "F", "F"],
    };
    expect(result).toEqual(expected);
  });

  it("gets Implication truth table", () => {
    const result = getTruthTable("p -> q");
    const expected = [
      ["T", "T", "F", "F"],
      ["T", "F", "T", "F"],
      ["T", "F", "T", "T"],
    ];
    expect(result).toEqual(expected);
  });
});

export {};
