import checkForHypotheticalSyllogism from "./checkForHypotheticalSyllogism";

describe("check for Hypothetical Syllogism", () => {
  it("test 1", () => {
    const expected = [
      {
        from: "0,1",
        obtained: ["p", "->", "r"],
        rule: "Hypothetical Syllogism",
      },
    ];

    expect(
      checkForHypotheticalSyllogism(
        ["p", "->", "r"],
        [
          ["p", "->", "q"],
          ["q", "->", "r"],
        ],
        []
      )
    ).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      {
        from: "1,0",
        obtained: ["p", "->", "r"],
        rule: "Hypothetical Syllogism",
      },
    ];

    expect(
      checkForHypotheticalSyllogism(
        ["p", "->", "r"],
        [
          ["q", "->", "r"],
          ["p", "->", "q"],
        ],
        []
      )
    ).toEqual(expected);
  });

  it("test 3", () => {
    const expected = [
      { from: "2", obtained: ["T", "->", "~R"], rule: "Transposition" },
      {
        from: "7,4",
        obtained: ["T", "->", "Q"],
        rule: "Hypothetical Syllogism",
      },
    ];

    expect(
      checkForHypotheticalSyllogism(
        ["T", "->", "Q"],
        [
          ["(", "S", "|", "R", ")", "->", "(", "~P", "->", "Q", ")"],
          ["~S", "->", "~", "(", "T", "->", "Q", ")"],
          ["R", "->", "~T"],
          ["~P"],
          ["~R", "->", "Q"],
          ["S", "->", "~Q"],
          ["~S", "->", "T"],
        ],
        []
      )
    ).toEqual(expected);
  });
});

export {};
