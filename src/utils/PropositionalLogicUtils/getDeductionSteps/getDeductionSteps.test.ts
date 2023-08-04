import getDeductionSteps from "./getDeductionsteps";

describe("getDeductionSteps", () => {
  it("test 1", () => {
    const expected = [
      { from: "2", obtained: ["p"], rule: "Simplification" },
      { from: "2", obtained: ["q"], rule: "Simplification" },
    ];

    expect(getDeductionSteps(["p->q", "p&q"], "q")).toEqual(expected);
  });

  it("test 2", () => {
    const expected = [
      { from: "1", obtained: ["A"], rule: "Simplification" },
      { from: "1", obtained: ["B"], rule: "Simplification" },
      { from: "3", obtained: ["A", "|", "C"], rule: "Addition" },
      { from: "2,5", obtained: ["D"], rule: "Modus Ponens" },
      { from: "3,6", obtained: ["A", "&", "D"], rule: "Conjunction" },
    ];

    expect(getDeductionSteps(["A&B", "(A|C)->D"], "A&D")).toEqual(expected);
  });

  it("test 3", () => {
    const expected = [
      { from: "1,2", obtained: ["~q"], rule: "Modus Ponens" },
      { from: "3,4", obtained: ["s"], rule: "Disjunctive Syllogism" },
    ];

    expect(getDeductionSteps(["p->~q", "p", "q|s"], "s")).toEqual(expected);
  });

  it("test 4", () => {
    const expected = [
      { from: "1,2", obtained: ["q"], rule: "Modus Ponens" },
      { from: "3,4", obtained: ["s"], rule: "Disjunctive Syllogism" },
    ];

    expect(getDeductionSteps(["p->q", "p", "~q|s"], "s")).toEqual(expected);
  });

  it("test 5", () => {
    const expected = [
      {
        from: "4",
        obtained: ["~R"],
        rule: "Simplification",
      },
      {
        from: "4",
        obtained: ["Q"],
        rule: "Simplification",
      },
      {
        from: "2,6",
        obtained: ["H"],
        rule: "Modus Tollens",
      },
      {
        from: "3,8",
        obtained: ["T"],
        rule: "Modus Ponens",
      },
      {
        from: "5,9",
        obtained: ["~D"],
        rule: "Modus Ponens",
      },
      {
        from: "9",
        obtained: ["S", "|", "T"],
        rule: "Addition",
      },
      {
        from: "11",
        obtained: ["~S", "->", "T"],
        rule: "Material Implication",
      },
      {
        from: "7",
        obtained: ["Q", "|", "D"],
        rule: "Addition",
      },
      {
        from: "13",
        obtained: ["~Q", "->", "D"],
        rule: "Material Implication",
      },
      {
        from: "12,14",
        obtained: ["(", "~S", "->", "T", ")", "&", "(", "~Q", "->", "D", ")"],
        rule: "Conjunction",
      },
    ];
    expect(
      getDeductionSteps(
        ["(~S&~H)->D", "~H->R", "H->T", "~R&Q", "T->~D"],
        "(~S->T)&(~Q->D)"
      )
    ).toEqual(expected);
  });

  it("test 6", () => {
    const expected = [
      { obtained: ["T", "->", "~R"], rule: "Transposition", from: "3" },
      {
        obtained: ["T", "->", "Q"],
        rule: "Hypothetical Syllogism",
        from: "8,5",
      },
      { obtained: ["S"], rule: "Modus Tollens", from: "2,9" },
      { obtained: ["~Q"], rule: "Modus Ponens", from: "6,10" },
      { obtained: ["S", "|", "R"], rule: "Addition", from: "10" },
      { obtained: ["~P", "->", "Q"], rule: "Modus Ponens", from: "1,12" },
      { obtained: ["R"], rule: "Modus Tollens", from: "5,11" },
      { obtained: ["~T"], rule: "Modus Tollens", from: "8,14" },
      { obtained: ["~T", "|", "R"], rule: "Addition", from: "15" },
      {
        obtained: ["T", "->", "R"],
        rule: "Material Implication",
        from: "16",
      },
      { obtained: ["~P", "&", "~Q"], rule: "Conjunction", from: "4,11" },
      { obtained: ["~S", "&", "~R"], rule: "Modus Tollens", from: "1,18" },
      { obtained: ["Q"], rule: "Modus Ponens", from: "13,4" },
      { obtained: ["~S"], rule: "Modus Tollens", from: "6,20" },
      { obtained: ["T"], rule: "Modus Ponens", from: "7,21" },
      { obtained: ["~R"], rule: "Modus Ponens", from: "8,22" },
      { obtained: ["P"], rule: "Modus Tollens", from: "13,11" },
      {
        obtained: ["(", "T", "->", "R", ")", "&", "~S"],
        rule: "Conjunction",
        from: "17,21",
      },
    ];

    expect(
      getDeductionSteps(
        [
          "(S|R)->(~P->Q)",
          "~S->~(T->Q)",
          "R->~T",
          "~P",
          "~R->Q",
          "S->~Q",
          "~S->T",
        ],
        "(T->R)&~S"
      )
    ).toEqual(expected);
  });

  it("test 7 -null test", () => {
    expect(getDeductionSteps(["(~Q->P)"], "S")).toEqual(false);
  });

  it("test 8", () => {
    const expected = [
      { obtained: ["~Q", "->", "P"], rule: "Simplification", from: "1" },
      { obtained: ["R", "->", "T"], rule: "Simplification", from: "1" },
      {
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
        from: "2",
      },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "3" },
      { obtained: ["U"], rule: "Simplification", from: "3" },
      { obtained: ["~P"], rule: "Simplification", from: "9" },
      { obtained: ["~S"], rule: "Simplification", from: "9" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "10,11" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "7,12" },
      { obtained: ["T"], rule: "Modus Ponens", from: "8,14" },
      { obtained: ["B"], rule: "Modus Tollens", from: "4,16" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "5,16" },
      { obtained: ["K"], rule: "Modus Tollens", from: "6,18" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "17,15" },
      {
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "DeMorgan Theorem",
        from: "20",
      },
      { obtained: ["~S", "&", "T"], rule: "Conjunction", from: "13,16" },
      {
        obtained: [
          "~",
          "(",
          "B",
          "->",
          "~Q",
          ")",
          "&",
          "(",
          "~S",
          "&",
          "T",
          ")",
        ],
        rule: "Conjunction",
        from: "21,22",
      },
      { obtained: ["X", "|", "K"], rule: "Addition", from: "19" },
      {
        obtained: [
          "(",
          "~",
          "(",
          "B",
          "->",
          "~Q",
          ")",
          "&",
          "(",
          "~S",
          "&",
          "T",
          ")",
          ")",
          "&",
          "(",
          "X",
          "|",
          "K",
          ")",
        ],
        rule: "Conjunction",
        from: "23,24",
      },
    ];

    expect(
      getDeductionSteps(
        ["(~Q->P)&(R->T)", "~(~P->S)", "(~U|R)&U", "~B->~T", "T->Y", "~K->~Y"],
        "(~(B->~Q)&(~S&T))&(X|K)"
      )
    ).toEqual(expected);
  });

  it("deconstructing test 8", () => {
    const expected = [
      {
        from: "1",
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
      },
      {
        from: "2",
        obtained: ["~P"],
        rule: "Simplification",
      },
      {
        from: "2",
        obtained: ["~S"],
        rule: "Simplification",
      },
    ];

    expect(getDeductionSteps(["~(~P->S)"], "~S")).toEqual(expected);
  });

  it("test 8 -- part 2", () => {
    const expected = [
      { obtained: ["~P", "&", "~S"], rule: "DeMorgan Theorem", from: "3" },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "4" },
      { obtained: ["U"], rule: "Simplification", from: "4" },
      { obtained: ["~P"], rule: "Simplification", from: "8" },
      { obtained: ["~S"], rule: "Simplification", from: "8" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "9,10" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "1,11" },
      { obtained: ["T"], rule: "Modus Ponens", from: "2,13" },
      { obtained: ["B"], rule: "Modus Tollens", from: "5,15" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "6,15" },
      { obtained: ["K"], rule: "Modus Tollens", from: "7,17" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "16,14" },
      { obtained: ["~S", "&", "T"], rule: "Conjunction", from: "12,15" },
      {
        obtained: ["(", "B", "&", "Q", ")", "&", "(", "~S", "&", "T", ")"],
        rule: "Conjunction",
        from: "19,20",
      },
      { obtained: ["X", "|", "K"], rule: "Addition", from: "18" },
      {
        obtained: [
          "(",
          "(",
          "B",
          "&",
          "Q",
          ")",
          "&",
          "(",
          "~S",
          "&",
          "T",
          ")",
          ")",
          "&",
          "(",
          "X",
          "|",
          "K",
          ")",
        ],
        rule: "Conjunction",
        from: "21,22",
      },
    ];

    expect(
      getDeductionSteps(
        ["~Q->P", "R->T", "~(~P->S)", "(~U|R)&U", "~B->~T", "T->Y", "~K->~Y"],
        "((B&Q)&(~S&T))&(X|K)"
      )
    ).toEqual(expected);
  });

  it("destructuring test 8 part 2", () => {
    const expected = [
      { from: "1", obtained: ["B"], rule: "Simplification" },
      { from: "1", obtained: ["Q"], rule: "Simplification" },
      {
        from: "1",
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "DeMorgan Theorem",
      },
    ];

    expect(getDeductionSteps(["B & Q"], "~(B->~Q)")).toEqual(expected);
  });

  it("destructuring test 8 part 3", () => {
    const expected = [
      {
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
        from: "3",
      },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "4" },
      { obtained: ["U"], rule: "Simplification", from: "4" },
      { obtained: ["~P"], rule: "Simplification", from: "8" },
      { obtained: ["~S"], rule: "Simplification", from: "8" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "9,10" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "1,11" },
      { obtained: ["T"], rule: "Modus Ponens", from: "2,13" },
      { obtained: ["B"], rule: "Modus Tollens", from: "5,15" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "6,15" },
      { obtained: ["K"], rule: "Modus Tollens", from: "7,17" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "16,14" },
      {
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "DeMorgan Theorem",
        from: "19",
      },
      { obtained: ["~S", "&", "T"], rule: "Conjunction", from: "12,15" },
      {
        obtained: [
          "~",
          "(",
          "B",
          "->",
          "~Q",
          ")",
          "&",
          "(",
          "~S",
          "&",
          "T",
          ")",
        ],
        rule: "Conjunction",
        from: "20,21",
      },
      { obtained: ["X", "|", "K"], rule: "Addition", from: "18" },
      {
        obtained: [
          "(",
          "~",
          "(",
          "B",
          "->",
          "~Q",
          ")",
          "&",
          "(",
          "~S",
          "&",
          "T",
          ")",
          ")",
          "&",
          "(",
          "X",
          "|",
          "K",
          ")",
        ],
        rule: "Conjunction",
        from: "22,23",
      },
    ];

    expect(
      getDeductionSteps(
        ["~Q->P", "R->T", "~(~P->S)", "(~U|R)&U", "~B->~T", "T->Y", "~K->~Y"],
        "(~(B->~Q)&(~S&T))&(X|K)"
      )
    ).toEqual(expected);
  });

  it("destructuring test 8 part 4", () => {
    const expected = [
      { obtained: ["~Q", "->", "P"], rule: "Simplification", from: "1" },
      { obtained: ["R", "->", "T"], rule: "Simplification", from: "1" },
    ];

    expect(getDeductionSteps(["(~Q->P)&(R->T)"], "~Q->P")).toEqual(expected);
  });

  it("test 1 -- quantifiable logic", () => {
    const expected = [{ from: "1,2", obtained: ["~Ba"], rule: "Modus Ponens" }];

    expect(getDeductionSteps(["(Aa -> ~Ba )", "(Aa)"], "(~Ba)")).toEqual(
      expected
    );
  });

  it("test 2 -- quantifiable logic", () => {
    const expected = [
      { from: "2", obtained: ["Ha"], rule: "Simplification" },
      { from: "2", obtained: ["Sa"], rule: "Simplification" },
      { from: "1,3", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "5", obtained: ["Ea"], rule: "Simplification" },
      { from: "5", obtained: ["Da"], rule: "Simplification" },
      { from: "6,4", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
    ];

    expect(
      getDeductionSteps(["Ha -> (Ea & Da )", "Ha & Sa"], "Ea & Sa")
    ).toEqual(expected);
  });

  it.skip("test 9", () => {
    const expected = [];
    expect(
      getDeductionSteps(["Ha -> (Ea & Da )", "Ha & Sa"], "Ea & Sa")
    ).toEqual(null);
  });
});

export {};
