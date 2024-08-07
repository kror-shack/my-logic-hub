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
      { obtained: ["~P", "&", "~Q"], rule: "Conjunction", from: "4,11" },
      {
        obtained: ["~", "(", "P", "|", "Q", ")"],
        rule: "DeMorgan Theorem",
        from: "13",
      },
      {
        obtained: ["~", "(", "~P", "->", "Q", ")"],
        rule: "Material Implication",
        from: "14",
      },
      {
        obtained: [
          "(",
          "S",
          "|",
          "R",
          ")",
          "&",
          "~",
          "(",
          "~P",
          "->",
          "Q",
          ")",
        ],
        rule: "Conjunction",
        from: "12,15",
      },
      {
        obtained: [
          "~",
          "(",
          "~",
          "(",
          "S",
          "|",
          "R",
          ")",
          "|",
          "(",
          "~P",
          "->",
          "Q",
          ")",
          ")",
        ],
        rule: "DeMorgan Theorem",
        from: "16",
      },
      {
        obtained: [
          "~",
          "(",
          "(",
          "S",
          "|",
          "R",
          ")",
          "->",
          "(",
          "~P",
          "->",
          "Q",
          ")",
          ")",
        ],
        rule: "Material Implication",
        from: "17",
      },
      {
        obtained: [
          "(",
          "(",
          "S",
          "|",
          "R",
          ")",
          "->",
          "(",
          "~P",
          "->",
          "Q",
          ")",
          ")",
          "|",
          "(",
          "(",
          "T",
          "->",
          "R",
          ")",
          "&",
          "~S",
          ")",
        ],
        rule: "Addition",
        from: "1",
      },
      {
        obtained: ["(", "T", "->", "R", ")", "&", "~S"],
        rule: "Disjunctive Syllogism",
        from: "19,18",
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

  it("test 6 -- checks kb for negated consequent for MT", () => {
    const expected = [{ from: "1,2", obtained: ["S"], rule: "Modus Tollens" }];

    expect(getDeductionSteps(["~S->~(T->Q)", "T->Q"], "S")).toEqual(expected);
  });

  // (S∨R)∧(¬P∧¬Q) is not understood as ((S∨R)->(¬P->Q))
  /**
   * FIXED
   * issue: The 6th test does not pass even though the this test is passing
   * what this suggests is that the reason the it was working before, had
   * more to do with the algorithm being able to see what it needs to build up the conclusion
   * which now it no longer needs, all the steps are directed towarads the way
   * such that DS would be applicable.
   */
  it("test 6 -- checks knowledge base for negation of complex wff", () => {
    const expected = [
      { obtained: ["S", "|", "R"], rule: "Simplification", from: "1" },
      { obtained: ["~P", "&", "~Q"], rule: "Simplification", from: "1" },
      {
        obtained: ["~", "(", "P", "|", "Q", ")"],
        rule: "DeMorgan Theorem",
        from: "3",
      },
      {
        obtained: ["~", "(", "~P", "->", "Q", ")"],
        rule: "Material Implication",
        from: "4",
      },
      {
        obtained: [
          "(",
          "S",
          "|",
          "R",
          ")",
          "&",
          "~",
          "(",
          "~P",
          "->",
          "Q",
          ")",
        ],
        rule: "Conjunction",
        from: "2,5",
      },
      {
        obtained: [
          "~",
          "(",
          "~",
          "(",
          "S",
          "|",
          "R",
          ")",
          "|",
          "(",
          "~P",
          "->",
          "Q",
          ")",
          ")",
        ],
        rule: "DeMorgan Theorem",
        from: "6",
      },
      {
        obtained: [
          "~",
          "(",
          "(",
          "S",
          "|",
          "R",
          ")",
          "->",
          "(",
          "~P",
          "->",
          "Q",
          ")",
          ")",
        ],
        rule: "Material Implication",
        from: "7",
      },
    ];

    expect(getDeductionSteps(["(S∨R)∧(¬P∧¬Q)"], "~((S∨R)->(¬P->Q))")).toEqual(
      expected
    );
  });

  it("test 6 -- destructurings", () => {
    const expected = [
      { from: "3", obtained: ["S", "|", "R"], rule: "Addition" },
      { from: "1,2", obtained: ["~P", "&", "~Q"], rule: "Conjunction" },
      {
        from: "4,5",
        obtained: ["(", "S", "|", "R", ")", "&", "(", "~P", "&", "~Q", ")"],
        rule: "Conjunction",
      },
    ];
    expect(getDeductionSteps(["~P", "~Q", "S"], "(S|R)&(~P & ~Q)")).toEqual(
      expected
    );
  });

  it("test 7 -null test", () => {
    expect(getDeductionSteps(["(~Q->P)"], "S")).toEqual(false);
  });

  it("test 8", () => {
    const expected = [
      { obtained: ["~Q", "->", "P"], rule: "Simplification", from: "1" },
      { obtained: ["R", "->", "T"], rule: "Simplification", from: "1" },
      {
        obtained: ["~", "(", "P", "|", "S", ")"],
        rule: "Material Implication",
        from: "2",
      },
      {
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
        from: "9",
      },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "3" },
      { obtained: ["U"], rule: "Simplification", from: "3" },
      { obtained: ["~P"], rule: "Simplification", from: "10" },
      { obtained: ["~S"], rule: "Simplification", from: "10" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "11,12" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "7,13" },
      { obtained: ["T"], rule: "Modus Ponens", from: "8,15" },
      { obtained: ["B"], rule: "Modus Tollens", from: "4,17" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "5,17" },
      { obtained: ["K"], rule: "Modus Tollens", from: "6,19" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "18,16" },
      {
        obtained: ["~", "(", "~B", "|", "~Q", ")"],
        rule: "DeMorgan Theorem",
        from: "21",
      },
      {
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "Material Implication",
        from: "22",
      },
      { obtained: ["~S", "&", "T"], rule: "Conjunction", from: "14,17" },
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
        from: "23,24",
      },
      { obtained: ["X", "|", "K"], rule: "Addition", from: "20" },
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
        from: "25,26",
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
        obtained: ["~", "(", "P", "|", "S", ")"],
        rule: "Material Implication",
      },
      { from: "2", obtained: ["~P", "&", "~S"], rule: "DeMorgan Theorem" },
      { from: "3", obtained: ["~P"], rule: "Simplification" },
      { from: "3", obtained: ["~S"], rule: "Simplification" },
    ];

    expect(getDeductionSteps(["~(~P->S)"], "~S")).toEqual(expected);
  });

  it("test 8 -- part 2", () => {
    const expected = [
      {
        obtained: ["~", "(", "P", "|", "S", ")"],
        rule: "Material Implication",
        from: "3",
      },
      {
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
        from: "8",
      },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "4" },
      { obtained: ["U"], rule: "Simplification", from: "4" },
      { obtained: ["~P"], rule: "Simplification", from: "9" },
      { obtained: ["~S"], rule: "Simplification", from: "9" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "10,11" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "1,12" },
      { obtained: ["T"], rule: "Modus Ponens", from: "2,14" },
      { obtained: ["B"], rule: "Modus Tollens", from: "5,16" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "6,16" },
      { obtained: ["K"], rule: "Modus Tollens", from: "7,18" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "17,15" },
      { obtained: ["~S", "&", "T"], rule: "Conjunction", from: "13,16" },
      {
        obtained: ["(", "B", "&", "Q", ")", "&", "(", "~S", "&", "T", ")"],
        rule: "Conjunction",
        from: "20,21",
      },
      { obtained: ["X", "|", "K"], rule: "Addition", from: "19" },
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
        from: "22,23",
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
      { obtained: ["B"], rule: "Simplification", from: "1" },
      { obtained: ["Q"], rule: "Simplification", from: "1" },
      {
        obtained: ["~", "(", "~B", "|", "~Q", ")"],
        rule: "DeMorgan Theorem",
        from: "1",
      },
      {
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "Material Implication",
        from: "4",
      },
    ];

    expect(getDeductionSteps(["B & Q"], "~(B->~Q)")).toEqual(expected);
  });

  it("destructuring test 8 part 3", () => {
    const expected = [
      {
        obtained: ["~", "(", "P", "|", "S", ")"],
        rule: "Material Implication",
        from: "3",
      },
      {
        obtained: ["~P", "&", "~S"],
        rule: "DeMorgan Theorem",
        from: "8",
      },
      { obtained: ["~U", "|", "R"], rule: "Simplification", from: "4" },
      { obtained: ["U"], rule: "Simplification", from: "4" },
      { obtained: ["~P"], rule: "Simplification", from: "9" },
      { obtained: ["~S"], rule: "Simplification", from: "9" },
      { obtained: ["R"], rule: "Disjunctive Syllogism", from: "10,11" },
      { obtained: ["Q"], rule: "Modus Tollens", from: "1,12" },
      { obtained: ["T"], rule: "Modus Ponens", from: "2,14" },
      { obtained: ["B"], rule: "Modus Tollens", from: "5,16" },
      { obtained: ["Y"], rule: "Modus Ponens", from: "6,16" },
      { obtained: ["K"], rule: "Modus Tollens", from: "7,18" },
      { obtained: ["B", "&", "Q"], rule: "Conjunction", from: "17,15" },
      {
        obtained: ["~", "(", "~B", "|", "~Q", ")"],
        rule: "DeMorgan Theorem",
        from: "20",
      },
      {
        obtained: ["~", "(", "B", "->", "~Q", ")"],
        rule: "Material Implication",
        from: "21",
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
        from: "22,23",
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
        from: "24,25",
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

  it("test 9 -- quantifiable logic", () => {
    const expected = [{ from: "1,2", obtained: ["~Ba"], rule: "Modus Ponens" }];

    expect(getDeductionSteps(["(Aa -> ~Ba )", "(Aa)"], "(~Ba)")).toEqual(
      expected
    );
  });

  it("test 10 -- quantifiable logic", () => {
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

  it("test 11", () => {
    const expected = [
      { obtained: ["Ha"], rule: "Simplification", from: "2" },
      { obtained: ["Sa"], rule: "Simplification", from: "2" },
      { obtained: ["Ea", "&", "Da"], rule: "Modus Ponens", from: "1,3" },
      { obtained: ["Ea"], rule: "Simplification", from: "5" },
      { obtained: ["Da"], rule: "Simplification", from: "5" },
      { obtained: ["Ea", "&", "Sa"], rule: "Conjunction", from: "6,4" },
    ];
    expect(
      getDeductionSteps(["Ha -> (Ea & Da )", "Ha & Sa"], "Ea & Sa")
    ).toEqual(expected);
  });

  it("test 13", () => {
    const expected = [
      {
        obtained: ["(", "P", "->", "Q", ")", "&", "(", "Q", "->", "P", ")"],
        rule: "Biconditional Elimination",
        from: "1",
      },
      { obtained: ["P", "|", "Q"], rule: "Addition", from: "2" },
      {
        obtained: ["~P", "->", "Q"],
        rule: "Material Implication",
        from: "4",
      },
      { obtained: ["P", "->", "Q"], rule: "Simplification", from: "3" },
      { obtained: ["Q", "->", "P"], rule: "Simplification", from: "3" },
      { obtained: ["Q"], rule: "Modus Ponens", from: "6,2" },
    ];

    expect(getDeductionSteps(["P <->  Q", "P"], "Q")).toEqual(expected);
  });
  it("test 14", () => {
    const expected = [
      { from: "1", obtained: ["P", "->", "Q"], rule: "Simplification" },
      { from: "1", obtained: ["Q", "->", "P"], rule: "Simplification" },
      {
        from: "1",
        obtained: ["P", "<->", "Q"],
        rule: "Biconditional Introduction",
      },
    ];

    expect(getDeductionSteps(["( P -> Q ) & ( Q -> P )"], "P <-> Q")).toEqual(
      expected
    );
  });

  /**
   * FIXED
   * BRACKETS ISSUE WHILE REMOVING BICONDITIONAL
   */
  it("test 15", () => {
    const expected = [
      { obtained: ["B"], rule: "Simplification", from: "1" },
      { obtained: ["G"], rule: "Simplification", from: "1" },
      {
        obtained: [
          "(",
          "(",
          "B",
          "->",
          "~E",
          ")",
          "->",
          "~A",
          ")",
          "&",
          "(",
          "~A",
          "->",
          "(",
          "B",
          "->",
          "~E",
          ")",
          ")",
        ],
        rule: "Biconditional Elimination",
        from: "3",
      },
      { obtained: ["D"], rule: "Modus Ponens", from: "4,6" },
      { obtained: ["B", "&", "D"], rule: "Conjunction", from: "6,9" },
      { obtained: ["~C"], rule: "Modus Ponens", from: "5,10" },
      { obtained: ["D", "&", "~C"], rule: "Conjunction", from: "9,11" },
      { obtained: ["~A"], rule: "Modus Ponens", from: "2,12" },
      {
        obtained: ["(", "B", "->", "~E", ")", "->", "~A"],
        rule: "Simplification",
        from: "8",
      },
      {
        obtained: ["~A", "->", "(", "B", "->", "~E", ")"],
        rule: "Simplification",
        from: "8",
      },
      {
        obtained: ["~", "(", "B", "&", "E", ")", "|", "~A"],
        rule: "Addition",
        from: "13",
      },
      {
        obtained: ["(", "B", "&", "E", ")", "->", "~A"],
        rule: "Material Implication",
        from: "16",
      },
      {
        obtained: ["(", "B", "->", "~E", ")", "&", "A"],
        rule: "Commutation",
        from: "17",
      },
      {
        obtained: ["~", "(", "~", "(", "B", "->", "~E", ")", "|", "~A", ")"],
        rule: "DeMorgan Theorem",
        from: "18",
      },
      {
        obtained: ["~", "(", "(", "B", "->", "~E", ")", "->", "~A", ")"],
        rule: "Material Implication",
        from: "19",
      },
      {
        obtained: [
          "~",
          "(",
          "(",
          "B",
          "->",
          "~E",
          ")",
          "->",
          "~A",
          ")",
          "|",
          "~",
          "(",
          "~A",
          "->",
          "(",
          "B",
          "->",
          "~E",
          ")",
          ")",
        ],
        rule: "Addition",
        from: "20",
      },
      {
        obtained: [
          "~",
          "(",
          "(",
          "(",
          "B",
          "->",
          "~E",
          ")",
          "->",
          "~A",
          ")",
          "&",
          "(",
          "~A",
          "->",
          "(",
          "B",
          "->",
          "~E",
          ")",
          ")",
          ")",
        ],
        rule: "DeMorgan Theorem",
        from: "21",
      },
      {
        obtained: [
          "(",
          "(",
          "(",
          "B",
          "->",
          "~E",
          ")",
          "->",
          "~A",
          ")",
          "&",
          "(",
          "~A",
          "->",
          "(",
          "B",
          "->",
          "~E",
          ")",
          ")",
          ")",
          "|",
          "(",
          "G",
          "&",
          "~E",
          ")",
        ],
        rule: "Addition",
        from: "8",
      },
      {
        obtained: ["G", "&", "~E"],
        rule: "Disjunctive Syllogism",
        from: "23,22",
      },
    ];

    expect(
      getDeductionSteps(
        [
          "B & G ",
          "( D & ~C ) -> ~A",
          "(B -> ~E ) <-> ~A",
          "B -> D",
          " (B & D) -> ~C",
        ],
        "G & ~E"
      )
    ).toEqual(expected);
  });

  /**
   * FAIL
   * ENTER A TAUTOLOGY RULE
   */

  it.skip("test 16", () => {
    const expected = [];

    expect(getDeductionSteps(["A <-> B", "B | A", "B -> C"], "A & C")).toEqual(
      null
    );
  });

  /**
   * FIXED - NOW RETURNS FALSE
   * NO RETURN
   * VALID ARGUMENT SEEMS TO BE INSOLVABLE WITHOUT ASSUMPTION
   * FOR FITCH STYLE NATURAL DEDUCTION
   */
  it("test 17", () => {
    const expected = [];

    expect(
      getDeductionSteps(
        ["~ (A -> ~B) ", "C -> ( ~A | ~B )", "( C | D) <-> E "],
        " E <-> D"
      )
    ).toEqual(false);
  });

  /**
   * FIXED - NOW RETURNS FALSE
   * NO RETURN
   * ARGUMENT SEEMS TO BE INVALID
   */
  it("test 18", () => {
    const expected = [];

    expect(
      getDeductionSteps(
        [" (Q <-> ~P ) -> ~R ", "(~Q & S ) | ( P & T )", "( S | T ) -> R"],
        " P -> Q"
      )
    ).toEqual(false);
  });

  /**
   * FIXED
   */
  it("test 19", () => {
    const expected = [
      { from: "1", obtained: ["~P", "|", "~Q"], rule: "Commutation" },
      { from: "2", obtained: ["P", "->", "~Q"], rule: "Material Implication" },
    ];
    expect(getDeductionSteps(["~Q | ~P"], " P -> ~Q")).toEqual(expected);
  });

  /**
   * FAIL
   * ADD DERIAVABLE RULE
   */
  it.skip("test 20", () => {
    const expected = [];

    expect(getDeductionSteps(["Q <-> ( Q & P )"], " Q -> P")).toEqual(null);
  });

  /**
   * FAIL
   * RETURNS FALSE
   * WOULD BE SOLVED BY ADDITION OF DERIVATIVE RULES
   *
   * (TECHNINAL FAIL
   * IMPROPER USE OF BRACKETS
   * ALLOWS PROHIBITED INFERENCE) => DEPRECATED
   */
  it.skip("test 21", () => {
    const expected = [
      { obtained: ["Q", "|", "P"], rule: "Simplification", from: "1" },
      { obtained: ["R"], rule: "Simplification", from: "1" },
      { obtained: ["Q", "|", "R"], rule: "Addition", from: "4" },
      {
        obtained: ["~", "(", "Q", "|", "R", ")"],
        rule: "Negation",
        from: "5",
      },
      {
        obtained: ["~", "(", "Q", "|", "R", ")", "|", "S"],
        rule: "Addition",
        from: "6",
      },
      {
        obtained: ["Q", "|", "R", "->", "S"],
        rule: "Material Implication",
        from: "7",
      },
      {
        obtained: ["~Q", "->", "(", "R", "->", "S", ")"],
        rule: "Material Implication",
        from: "8",
      },
    ];
    expect(
      getDeductionSteps(["( Q | P ) &  R", "P -> S"], " ~ Q ->  ( R -> S ) ")
    ).toEqual(null);
  });

  it("test 21 v2", () => {
    const expected = [
      { from: "1", obtained: ["Q", "|", "P"], rule: "Simplification" },
      { from: "1", obtained: ["R"], rule: "Simplification" },
    ];
    expect(getDeductionSteps(["( Q | P ) &  R", "P -> S"], " R")).toEqual(
      expected
    );
  });

  it("test 22", () => {
    const expected = [
      { from: "1", obtained: ["Pa"], rule: "Simplification" },
      { from: "1", obtained: ["Aag"], rule: "Simplification" },
      { from: "3", obtained: ["~Pa", "|", "Aag"], rule: "Addition" },
      {
        from: "4",
        obtained: ["Pa", "->", "Aag"],
        rule: "Material Implication",
      },
      {
        from: "2,5",
        obtained: ["Pa", "&", "(", "Pa", "->", "Aag", ")"],
        rule: "Conjunction",
      },
    ];
    expect(getDeductionSteps(["Pa & Aag"], " Pa & ( Pa -> Aag)")).toEqual(
      expected
    );
  });

  /**
   * A failing test, introuduced to fix double bracketed negation &&
   * wrong premise numbering in contradiction exploitation.
   * Fix Implemented
   */
  it("test 23", () => {
    const expected = [
      { obtained: ["~P"], rule: "Modus Tollens", from: "2,5" },
      {
        obtained: ["~", "(", "T", "->", "~S", ")"],
        rule: "Disjunctive Syllogism",
        from: "4,5",
      },
      {
        obtained: ["~", "(", "~T", "|", "~S", ")"],
        rule: "Material Implication",
        from: "7",
      },
      { obtained: ["T", "&", "S"], rule: "DeMorgan Theorem", from: "8" },
      { obtained: ["S", "&", "T"], rule: "Commutation", from: "9" },
      { obtained: ["T"], rule: "Simplification", from: "9" },
      { obtained: ["S"], rule: "Simplification", from: "9" },
      { obtained: ["S", "&", "~P"], rule: "Conjunction", from: "12,6" },
      {
        obtained: ["~", "(", "~S", "|", "P", ")"],
        rule: "DeMorgan Theorem",
        from: "13",
      },
      {
        obtained: ["S", "&", "~", "(", "~S", "|", "P", ")"],
        rule: "Conjunction",
        from: "12,14",
      },
      {
        obtained: ["~", "(", "~S", "|", "(", "~S", "|", "P", ")", ")"],
        rule: "DeMorgan Theorem",
        from: "15",
      },
      {
        obtained: ["~", "(", "S", "->", "(", "~S", "|", "P", ")", ")"],
        rule: "Material Implication",
        from: "16",
      },
      {
        obtained: [
          "(",
          "S",
          "->",
          "(",
          "~S",
          "|",
          "P",
          ")",
          ")",
          "|",
          "(",
          "(",
          "S",
          "&",
          "T",
          ")",
          "&",
          "R",
          ")",
        ],
        rule: "Addition",
        from: "1",
      },
      {
        obtained: ["(", "S", "&", "T", ")", "&", "R"],
        rule: "Disjunctive Syllogism",
        from: "18,17",
      },
    ];

    expect(
      getDeductionSteps(
        ["S -> (~S | P)", "P -> Q", " Q-> ~R", " ~ ( T -> ~S ) | Q", "~Q"],
        "( S & T ) & R"
      )
    ).toEqual(expected);
  });
});

describe("getDeductionSteps --Basic rules", () => {
  /**
   * FIXED
   * RETURNS FALSE
   */
  it("Contradiction exploitaion", () => {
    const expected = [
      { obtained: ["P", "|", "Q"], rule: "Addition", from: "1" },
      { obtained: ["Q"], rule: "Disjunctive Syllogism", from: "3,2" },
    ];

    expect(getDeductionSteps(["P", "~P"], "Q")).toEqual(expected);
  });

  it("Disjunctive Syllogism", () => {
    const expected = [
      {
        from: "2",
        obtained: ["~", "(", "Q", "&", "R", ")"],
        rule: "DeMorgan Theorem",
      },
      { from: "1,3", obtained: ["P"], rule: "Disjunctive Syllogism" },
    ];
    expect(getDeductionSteps(["P | ( Q & R )", "~Q | ~R"], "P")).toEqual(
      expected
    );
  });

  it("Disjunctive Syllogism v2", () => {
    const expected = [
      {
        from: "2",
        obtained: ["~", "(", "~Q", "|", "~R", ")"],
        rule: "DeMorgan Theorem",
      },
      { from: "1,3", obtained: ["P"], rule: "Disjunctive Syllogism" },
      { from: "2", obtained: ["Q"], rule: "Simplification" },
      { from: "2", obtained: ["R"], rule: "Simplification" },
    ];

    expect(getDeductionSteps(["P | ( ~Q | ~R)", "Q & R"], "P")).toEqual(
      expected
    );
  });

  it("Modus Tollens", () => {
    const expected = [{ from: "1,2", obtained: ["~P"], rule: "Modus Tollens" }];
    expect(getDeductionSteps(["P -> Q", "~Q"], "~P")).toEqual(expected);
  });
  it("Modus Ponens", () => {
    const expected = [{ from: "1,2", obtained: ["Q"], rule: "Modus Ponens" }];

    expect(getDeductionSteps(["P -> Q", "P"], "Q")).toEqual(expected);
  });

  it("Biconditioinal Exploitation", () => {
    const expected = [
      {
        obtained: ["(", "P", "->", "Q", ")", "&", "(", "Q", "->", "P", ")"],
        rule: "Biconditional Elimination",
        from: "1",
      },
      { obtained: ["~P", "|", "~Q"], rule: "Addition", from: "2" },
      {
        obtained: ["P", "->", "~Q"],
        rule: "Material Implication",
        from: "4",
      },
      { obtained: ["P", "->", "Q"], rule: "Simplification", from: "3" },
      { obtained: ["Q", "->", "P"], rule: "Simplification", from: "3" },
      { obtained: ["~Q"], rule: "Modus Tollens", from: "7,2" },
    ];

    expect(getDeductionSteps(["P <-> Q", "~P"], "~Q")).toEqual(expected);
  });

  /**
   * FIXED
   * SKIPS MATERIAL IMPLICATION AND ADDS THAT TO DEMORGAN
   */

  it("Negation conditional", () => {
    const expected = [
      { from: "1", obtained: ["P"], rule: "Simplification" },
      { from: "1", obtained: ["~Q"], rule: "Simplification" },
      {
        from: "1",
        obtained: ["~", "(", "~P", "|", "Q", ")"],
        rule: "DeMorgan Theorem",
      },
      {
        from: "4",
        obtained: ["~", "(", "P", "->", "Q", ")"],
        rule: "Material Implication",
      },
    ];

    expect(getDeductionSteps(["P &~ Q"], "~( P -> Q ) ")).toEqual(expected);
  });

  /**
   * FIXED
   * SKIPS MATERIAL IMPLICATION AND ADDS THAT TO DEMORGAN
   */
  it("Negation conditional --2", () => {
    const expected = [
      {
        from: "1",
        obtained: ["~", "(", "~P", "|", "Q", ")"],
        rule: "Material Implication",
      },
      { from: "2", obtained: ["P", "&", "~Q"], rule: "DeMorgan Theorem" },
    ];

    expect(getDeductionSteps([" ~( P -> Q )"], " P &~ Q ")).toEqual(expected);
  });

  /**
   * FIXED
   * ADDED SUPPORT FOR INFERENCE OF NEGATED BICONDITIONAL
   * INFINITE RECURSION
   */
  it("Negation Biconditional", () => {
    const expected = [
      {
        from: "1",
        obtained: ["(", "P", "->", "~Q", ")", "&", "(", "~Q", "->", "P", ")"],
        rule: "Biconditional Elimination",
      },
      { from: "2", obtained: ["P", "->", "~Q"], rule: "Simplification" },
      { from: "2", obtained: ["~Q", "->", "P"], rule: "Simplification" },
      {
        from: "3,4",
        obtained: ["~", "(", "P", "<->", "Q", ")"],
        rule: "Biconditional Introduction",
      },
    ];
    expect(getDeductionSteps(["P <-> ~Q"], "~( P <-> Q ) ")).toEqual(expected);
  });
  it("Negation Biconditional v2", () => {
    const expected = [
      {
        obtained: ["(", "~P", "->", "Q", ")", "&", "(", "Q", "->", "~P", ")"],
        rule: "Biconditional Elimination",
        from: "1",
      },
      { obtained: ["~P", "->", "Q"], rule: "Simplification", from: "2" },
      { obtained: ["Q", "->", "~P"], rule: "Simplification", from: "2" },
      {
        obtained: ["~", "(", "P", "<->", "Q", ")"],
        rule: "Biconditional Introduction",
        from: "3,4",
      },
    ];

    expect(getDeductionSteps(["~P <-> Q"], "~( P <-> Q ) ")).toEqual(expected);
  });

  it("Demorgan Disjunction", () => {
    const expected = [
      {
        from: "1",
        obtained: ["~", "(", "P", "&", "Q", ")"],
        rule: "DeMorgan Theorem",
      },
    ];

    expect(getDeductionSteps(["~P | ~Q"], "~( P & Q ) ")).toEqual(expected);
  });

  it("Demorgan Conjunction", () => {
    const expected = [
      { from: "1", obtained: ["~P", "|", "~Q"], rule: "DeMorgan Theorem" },
    ];

    expect(getDeductionSteps([" ~( P & Q )"], " ~P | ~Q")).toEqual(expected);
  });

  it("DeMorgan Disjunction -2", () => {
    const expected = [
      { from: "1", obtained: ["~P", "&", "~Q"], rule: "DeMorgan Theorem" },
    ];
    expect(getDeductionSteps(["~( P  | Q )"], "~P & ~Q ")).toEqual(expected);
  });

  it("DeMorgan Conjunction -2", () => {
    const expected = [
      { from: "1", obtained: ["~P", "|", "~Q"], rule: "DeMorgan Theorem" },
    ];
    expect(getDeductionSteps(["~( P  & Q )"], "~P | ~Q ")).toEqual(expected);
  });

  /**
   * FIXED
   * MATERIAL IMPLICATION DOES NOT WORK IN REVERSE
   */
  it("Material Implication", () => {
    const expected = [
      { from: "1", obtained: ["~P", "|", "Q"], rule: "Material Implication" },
    ];

    expect(getDeductionSteps(["P -> Q"], " ~P | Q ")).toEqual(expected);
  });

  it("Material Implication --2", () => {
    const expected = [
      { from: "1", obtained: ["P", "->", "Q"], rule: "Material Implication" },
    ];

    expect(getDeductionSteps(["~ P | Q"], " P -> Q ")).toEqual(expected);
  });

  /**
   * FIXED
   */
  it("Commutativity Disjunction", () => {
    const expected = [
      { from: "1", obtained: ["Q", "|", "P"], rule: "Commutation" },
    ];

    expect(getDeductionSteps(["P | Q"], " Q | P ")).toEqual(expected);
  });

  /**
   * FIXED
   * DISJUNCTION IS NOT GRANTED THIS TECHNICALITY
   */
  it("Commutativity Conjunction", () => {
    const expected = [
      { from: "1", obtained: ["P"], rule: "Simplification" },
      { from: "1", obtained: ["Q"], rule: "Simplification" },
      { from: "1", obtained: ["Q", "&", "P"], rule: "Commutation" },
    ];
    expect(getDeductionSteps(["P & Q"], " Q & P ")).toEqual(expected);
  });

  /**
   * FAIL
   */
  it.skip("Associativity", () => {
    const expected = [];
    expect(getDeductionSteps(["( P  | Q ) | R"], "P | ( Q | R) ")).toEqual(
      null
    );
  });
});

export {};
