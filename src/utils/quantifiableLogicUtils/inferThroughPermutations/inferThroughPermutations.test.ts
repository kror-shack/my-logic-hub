import inferThroughPermutations from "./inferThroughPermutations";

describe("inferThroughPermutations", () => {
  it("test 1", () => {
    const premiseArr = [
      "\u2203x (Gx & Axf)",
      "\u2200x(Wx->\u2200y(Gy -> Axy))",
      "Wf",
    ];
    const conclusionArr = "\u2203x (Axf & Afx)";
    const expected = [
      {
        from: "1",
        obtained: ["Ga", "&", "Aaf"],
        rule: "Existential Instantiation",
      },
      { from: "4", obtained: ["Ga"], rule: "Simplification" },
      { from: "4", obtained: ["Aaf"], rule: "Simplification" },
      {
        from: "2",
        obtained: ["Wf", "->", "∀y", "(", "Gy", "->", "Afy", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "7,3",
        obtained: ["∀y", "(", "Gy", "->", "Afy", ")"],
        rule: "Modus Ponens",
      },
      {
        from: "8",
        obtained: ["Ga", "->", "Afa"],
        rule: "Universal Instantiation",
      },
      { from: "9,5", obtained: ["Afa"], rule: "Modus Ponens" },
      { from: "6,10", obtained: ["Aaf", "&", "Afa"], rule: "Conjunction" },
      {
        from: "11",
        obtained: ["∃x", "(", "Axf", "&", "Afx", ")"],
        rule: "Existential Generalization",
      },
    ];

    const deductionSteps = inferThroughPermutations(premiseArr, conclusionArr);

    expect(deductionSteps).toEqual(expected);
  });

  it("test - 2", () => {
    const premiseArr = [
      "\u2203x (Px & Lx)",
      "\u2200x (Lx->Rx)",
      "\u2200x (Rx->~Fx)",
    ];
    const conclusionArr = "\u2203x (Px& ~Fx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Pa", "&", "La"],
        rule: "Existential Instantiation",
      },
      { from: "4", obtained: ["Pa"], rule: "Simplification" },
      { from: "4", obtained: ["La"], rule: "Simplification" },
      {
        from: "2",
        obtained: ["La", "->", "Ra"],
        rule: "Universal Instantiation",
      },
      {
        from: "3",
        obtained: ["Ra", "->", "~Fa"],
        rule: "Universal Instantiation",
      },
      { from: "7,6", obtained: ["Ra"], rule: "Modus Ponens" },
      { from: "8,9", obtained: ["~Fa"], rule: "Modus Ponens" },
      { from: "5,10", obtained: ["Pa", "&", "~Fa"], rule: "Conjunction" },
      {
        from: "11",
        obtained: ["∃x", "(", "Px", "&", "~Fx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 3", () => {
    const premiseArr = ["\u2203x (Ax & ~Fx)", "\u2200x(Cx->Fx)"];
    const conclusionArr = "\u2203x (Ax&~Cx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Aa", "&", "~Fa"],
        rule: "Existential Instantiation",
      },
      { from: "3", obtained: ["Aa"], rule: "Simplification" },
      { from: "3", obtained: ["~Fa"], rule: "Simplification" },
      {
        from: "2",
        obtained: ["Ca", "->", "Fa"],
        rule: "Universal Instantiation",
      },
      { from: "6,5", obtained: ["~Ca"], rule: "Modus Tollens" },
      { from: "4,7", obtained: ["Aa", "&", "~Ca"], rule: "Conjunction" },
      {
        from: "8",
        obtained: ["∃x", "(", "Ax", "&", "~Cx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 4", () => {
    const premiseArr = ["\u2200x(Hx->(Ex&Dx))", "\u2200x(Hx&Sx)"];
    const conclusionArr = "\u2203x(Ex&Sx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Ha", "->", "(", "Ea", "&", "Da", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Ha", "&", "Sa"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ha"], rule: "Simplification" },
      { from: "4", obtained: ["Sa"], rule: "Simplification" },
      { from: "3,5", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "7", obtained: ["Ea"], rule: "Simplification" },
      { from: "7", obtained: ["Da"], rule: "Simplification" },
      { from: "8,6", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
      {
        from: "10",
        obtained: ["∃x", "(", "Ex", "&", "Sx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 5", () => {
    const premiseArr = ["\u2200x (Hx->(Ex&Dx))", "\u2200x(Hx&Sx)"];
    const conclusionArr = "\u2200x (Ex&Sx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Ha", "->", "(", "Ea", "&", "Da", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Ha", "&", "Sa"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ha"], rule: "Simplification" },
      { from: "4", obtained: ["Sa"], rule: "Simplification" },
      { from: "3,5", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "7", obtained: ["Ea"], rule: "Simplification" },
      { from: "7", obtained: ["Da"], rule: "Simplification" },
      { from: "8,6", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
      {
        from: "10",
        obtained: ["∀x", "(", "Ex", "&", "Sx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 6", () => {
    const premiseArr = ["\u2200x (Hx->(Ex&Dx))", "\u2200x(Hx&Sx)"];
    const conclusionArr = "\u2200x (Ex&Sx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Ha", "->", "(", "Ea", "&", "Da", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Ha", "&", "Sa"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ha"], rule: "Simplification" },
      { from: "4", obtained: ["Sa"], rule: "Simplification" },
      { from: "3,5", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "7", obtained: ["Ea"], rule: "Simplification" },
      { from: "7", obtained: ["Da"], rule: "Simplification" },
      { from: "8,6", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
      {
        from: "10",
        obtained: ["∀x", "(", "Ex", "&", "Sx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  /**
   * FIXED
   * MODIFY THE FUNCTION TO ALLOW FOR MORE
   * THAN ONE QUANTIFIER CONCLUSION
   */
  it("test - 7", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px & \u2200y(Py -> Axy))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
        from: "3",
      },
      {
        obtained: ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
        rule: "Universal Instantiation",
        from: "1",
      },
      {
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
        from: "2",
      },
      { obtained: ["Pa"], rule: "Simplification", from: "4" },
      { obtained: ["Aag"], rule: "Simplification", from: "4" },
      {
        obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
        rule: "Universal Instantiation",
        from: "5",
      },
      { obtained: ["Aga"], rule: "Modus Ponens", from: "6,7" },
      {
        obtained: ["Aag", "&", "Aga"],
        rule: "Conjunction",
        from: "8,10",
      },
      { obtained: ["Aaa"], rule: "Modus Ponens", from: "9,11" },
      { obtained: ["~Pa", "|", "Aaa"], rule: "Addition", from: "12" },
      {
        obtained: ["Pa", "->", "Aaa"],
        rule: "Material Implication",
        from: "13",
      },
      {
        obtained: ["∀y", "(", "Py", "->", "Aay", ")"],
        rule: "Universal Generalization",
        from: "14",
      },
      {
        obtained: ["Pa", "&", "∀y", "(", "Py", "->", "Aay", ")"],
        rule: "Conjunction",
        from: "7,15",
      },
      {
        obtained: [
          "∃x",
          "(",
          "Px",
          "&",
          "∀y",
          "(",
          "Py",
          "->",
          "Axy",
          ")",
          ")",
        ],
        rule: "Existential Generalization",
        from: "16",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("destructuring test-7", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "3",
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Pa"], rule: "Simplification" },
      { from: "4", obtained: ["Aag"], rule: "Simplification" },
      {
        from: "5",
        obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
        rule: "Universal Instantiation",
      },
      { from: "6,7", obtained: ["Aga"], rule: "Modus Ponens" },
      { from: "8,10", obtained: ["Aag", "&", "Aga"], rule: "Conjunction" },
      { from: "9,11", obtained: ["Aaa"], rule: "Modus Ponens" },
      {
        from: "7",
        obtained: ["∃x", "(", "Px", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 8", () => {
    const premiseArr = ["\u2200x ( Ax -> ~Bx )", "\u2200x ( Ax )"];
    const conclusionArr = "\u2200x ( ~Bx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Aa", "->", "~Ba"],
        rule: "Universal Instantiation",
      },
      { from: "2", obtained: ["Aa"], rule: "Universal Instantiation" },
      { from: "3,4", obtained: ["~Ba"], rule: "Modus Ponens" },
      {
        from: "5",
        obtained: ["∀x", "(", "~Bx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 9 --null test", () => {
    const premiseArr = ["\u2203x ( Ax & ~Bx )", "\u2203x(Cx & Bx )"];
    const conclusionArr = "\u2200x (Cx -> ~Ax )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [];

    expect(result).toEqual(false);
  });

  //pg: 459
  it("test - 10", () => {
    const premiseArr = ["\u2200x ( Ax -> ~Bx )", "\u2203x(Cx & Ax )"];
    const conclusionArr = "\u2203x (Cx -> ~Bx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "2",
        obtained: ["Ca", "&", "Aa"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["Aa", "->", "~Ba"],
        rule: "Universal Instantiation",
      },
      { from: "3", obtained: ["Ca"], rule: "Simplification" },
      { from: "3", obtained: ["Aa"], rule: "Simplification" },
      { from: "4,6", obtained: ["~Ba"], rule: "Modus Ponens" },
      { from: "7", obtained: ["~Ca", "|", "~Ba"], rule: "Addition" },
      {
        from: "8",
        obtained: ["Ca", "->", "~Ba"],
        rule: "Material Implication",
      },
      {
        from: "9",
        obtained: ["∃x", "(", "Cx", "->", "~Bx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  //pg: 459
  it("test - 11", () => {
    const premiseArr = ["\u2200x ( Bx -> ~Cx )", "\u2203x (Cx & Dx )"];
    const conclusionArr = "\u2203x (Dx & ~Bx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "2",
        obtained: ["Ca", "&", "Da"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["Ba", "->", "~Ca"],
        rule: "Universal Instantiation",
      },
      { from: "3", obtained: ["Ca"], rule: "Simplification" },
      { from: "3", obtained: ["Da"], rule: "Simplification" },
      { from: "4,5", obtained: ["~Ba"], rule: "Modus Tollens" },
      { from: "6,7", obtained: ["Da", "&", "~Ba"], rule: "Conjunction" },
      {
        from: "8",
        obtained: ["∃x", "(", "Dx", "&", "~Bx", ")"],
        rule: "Existential Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("test - 12 -for contradiction exploitation", () => {
    const premiseArr = ["\u2200x ( Bx -> ~Cx )", "\u2200x (Cx & Ba )"];
    const conclusionArr = "\u2203x (Fx & ~Bx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Ba", "->", "~Ca"],
        rule: "Universal Instantiation",
        from: "1",
      },
      {
        obtained: ["Ca", "&", "Ba"],
        rule: "Universal Instantiation",
        from: "2",
      },
      { obtained: ["Ca"], rule: "Simplification", from: "4" },
      { obtained: ["Ba"], rule: "Simplification", from: "4" },
      { obtained: ["Ba", "&", "Ca"], rule: "Commutation", from: "4" },
      {
        obtained: ["~", "(", "~Ba", "|", "~Ca", ")"],
        rule: "DeMorgan Theorem",
        from: "7",
      },
      {
        obtained: ["~", "(", "Ba", "->", "~Ca", ")"],
        rule: "Material Implication",
        from: "8",
      },
      {
        obtained: [
          "(",
          "Ba",
          "->",
          "~Ca",
          ")",
          "|",
          "(",
          "\u2203x",
          "(",
          "Fx",
          "&",
          "~Bx",
          ")",
          ")",
        ],
        rule: "Addition",
        from: "3",
      },
      {
        obtained: ["\u2203x", "(", "Fx", "&", "~Bx", ")"],
        rule: "Disjunctive Syllogism",
        from: "10,9",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 14 -universal generalization restriction", () => {
    const premiseArr = ["\u2203x ( Px )"];
    const conclusionArr = "\u2200x ( Px )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [];

    expect(result).toEqual(false);
  });

  it("test - 13 -not a null test", () => {
    const premiseArr = ["\u2200x ( Px-> Agx )", "\u2203x ( Px ∧ Axg )"];
    const conclusionArr = "\u2203x ( Px ∧ \u2200y ( Py-> Axy ) )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
        from: "2",
      },
      {
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
        from: "1",
      },
      { obtained: ["Pa"], rule: "Simplification", from: "3" },
      { obtained: ["Aag"], rule: "Simplification", from: "3" },
      { obtained: ["Aga"], rule: "Modus Ponens", from: "4,5" },
      { obtained: ["~Pg", "|", "Aag"], rule: "Addition", from: "6" },
      {
        obtained: ["Pg", "->", "Aag"],
        rule: "Material Implication",
        from: "8",
      },
      {
        obtained: ["\u2200y", "(", "Py", "->", "Aay", ")"],
        rule: "Universal Generalization",
        from: "9",
      },
      {
        obtained: ["Pa", "&", "\u2200y", "(", "Py", "->", "Aay", ")"],
        rule: "Conjunction",
        from: "5,10",
      },
      {
        obtained: [
          "\u2203x",
          "(",
          "Px",
          "&",
          "\u2200y",
          "(",
          "Py",
          "->",
          "Axy",
          ")",
          ")",
        ],
        rule: "Existential Generalization",
        from: "11",
      },
    ];
    expect(result).toEqual(expected);
  });
  it("test - 14", () => {
    const premiseArr = ["\u2200x ( Mx -> Nx )", "\u2203x ( Ox & Mx )"];
    const conclusionArr = "\u2203x ( Ox & Nx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "2",
        obtained: ["Oa", "&", "Ma"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["Ma", "->", "Na"],
        rule: "Universal Instantiation",
      },
      { from: "3", obtained: ["Oa"], rule: "Simplification" },
      { from: "3", obtained: ["Ma"], rule: "Simplification" },
      { from: "4,6", obtained: ["Na"], rule: "Modus Ponens" },
      { from: "5,7", obtained: ["Oa", "&", "Na"], rule: "Conjunction" },
      {
        from: "8",
        obtained: ["\u2203x", "(", "Ox", "&", "Nx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  /**
   * Distribution rule as of yet not implemented
   */
  it.skip("test - 15", () => {
    const premiseArr = ["\u2200x ((Ax | Bx) -> (Cx & Dx))"];
    const conclusionArr = "\u2203x ( Bx -> Cx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [];

    expect(result).toEqual(null);
  });

  //pg 482 question 10 from Introuction to logic
  //TODO: proper references for questions passed as tests
  /**
   * Add intermediate step for DeMorgan when comparing negations i.e., ~P & ~ Q === ~( P | Q)
   */
  it("test - 16", () => {
    const premiseArr = [
      "\u2203x ( Cx & Rx )",
      "\u2200x ( Rx -> (Sx | Bx))",
      "\u2200x ( Bx -> (Dx | Px))",
      "\u2200x (Px -> Lx)",
      "\u2200x (Dx -> Hx)",
      "\u2200x (~Hx)",
      "\u2200x (((Cx & Rx) & Fx) -> Ax)",
      "\u2200x (Rx -> Fx)",
      "\u2200x (Cx -> ~(Lx & Ax))",
    ];
    const conclusionArr = "\u2203x ( Cx & Sx )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Ca", "&", "Ra"],
        rule: "Existential Instantiation",
        from: "1",
      },
      { obtained: ["Ca"], rule: "Simplification", from: "10" },
      { obtained: ["Ra"], rule: "Simplification", from: "10" },
      {
        obtained: ["Ra", "->", "(", "Sa", "|", "Ba", ")"],
        rule: "Universal Instantiation",
        from: "2",
      },
      {
        obtained: ["Ba", "->", "(", "Da", "|", "Pa", ")"],
        rule: "Universal Instantiation",
        from: "3",
      },
      {
        obtained: ["Pa", "->", "La"],
        rule: "Universal Instantiation",
        from: "4",
      },
      {
        obtained: ["Da", "->", "Ha"],
        rule: "Universal Instantiation",
        from: "5",
      },
      { obtained: ["~Ha"], rule: "Universal Instantiation", from: "6" },
      {
        obtained: ["(", "(", "Ca", "&", "Ra", ")", "&", "Fa", ")", "->", "Aa"],
        rule: "Universal Instantiation",
        from: "7",
      },
      {
        obtained: ["Ra", "->", "Fa"],
        rule: "Universal Instantiation",
        from: "8",
      },
      {
        obtained: ["Ca", "->", "~", "(", "La", "&", "Aa", ")"],
        rule: "Universal Instantiation",
        from: "9",
      },
      {
        obtained: ["Sa", "|", "Ba"],
        rule: "Modus Ponens",
        from: "13,12",
      },
      { obtained: ["~Da"], rule: "Modus Tollens", from: "16,17" },
      { obtained: ["Fa"], rule: "Modus Ponens", from: "19,12" },
      {
        obtained: ["~", "(", "La", "&", "Aa", ")"],
        rule: "Modus Ponens",
        from: "20,11",
      },
      {
        obtained: ["(", "Ca", "&", "Ra", ")", "&", "Fa"],
        rule: "Conjunction",
        from: "10,23",
      },
      { obtained: ["Aa"], rule: "Modus Ponens", from: "18,25" },
      {
        obtained: ["~La", "|", "~Aa"],
        rule: "DeMorgan Theorem",
        from: "24",
      },
      { obtained: ["~La"], rule: "Disjunctive Syllogism", from: "27,26" },
      { obtained: ["~Pa"], rule: "Modus Tollens", from: "15,28" },
      {
        obtained: ["~Da", "&", "~Pa"],
        rule: "Conjunction",
        from: "22,29",
      },
      {
        obtained: ["~", "(", "Da", "|", "Pa", ")"],
        rule: "DeMorgan Theorem",
        from: "30",
      },
      { obtained: ["~Ba"], rule: "Modus Tollens", from: "14,31" },
      { obtained: ["Sa"], rule: "Disjunctive Syllogism", from: "21,32" },
      { obtained: ["Ca", "&", "Sa"], rule: "Conjunction", from: "11,33" },
      {
        obtained: ["\u2203x", "(", "Cx", "&", "Sx", ")"],
        rule: "Existential Generalization",
        from: "34",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 18  -- basic universal to existential transfer", () => {
    const premiseArr = ["\u2200x (Px)"];
    const conclusionArr = "\u2203x ( Px )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      { from: "1", obtained: ["Pa"], rule: "Universal Instantiation" },
      {
        from: "2",
        obtained: ["∃x", "(", "Px", ")"],
        rule: "Existential Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe("inferThroughPermutations test 7 expansion", () => {
  it("or operator in nested quantifier conc", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px | \u2200y(Py -> Axy))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
        from: "3",
      },
      {
        obtained: ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
        rule: "Universal Instantiation",
        from: "1",
      },
      {
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
        from: "2",
      },
      { obtained: ["Pa"], rule: "Simplification", from: "4" },
      { obtained: ["Aag"], rule: "Simplification", from: "4" },
      {
        obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
        rule: "Universal Instantiation",
        from: "5",
      },
      { obtained: ["Aga"], rule: "Modus Ponens", from: "6,7" },
      {
        obtained: ["Aag", "&", "Aga"],
        rule: "Conjunction",
        from: "8,10",
      },
      { obtained: ["Aaa"], rule: "Modus Ponens", from: "9,11" },
      {
        obtained: ["Pa", "|", "∀y", "(", "Py", "->", "Aay", ")"],
        rule: "Addition",
        from: "7",
      },
      {
        obtained: [
          "∃x",
          "(",
          "Px",
          "|",
          "∀y",
          "(",
          "Py",
          "->",
          "Axy",
          ")",
          ")",
        ],
        rule: "Existential Generalization",
        from: "13",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("conditional operator in nested quantifier conc", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px -> \u2200y(Py -> Axy))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
        from: "3",
      },
      {
        obtained: ["∀y", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
        rule: "Universal Instantiation",
        from: "1",
      },
      {
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
        from: "2",
      },
      { obtained: ["Pa"], rule: "Simplification", from: "4" },
      { obtained: ["Aag"], rule: "Simplification", from: "4" },
      {
        obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
        rule: "Universal Instantiation",
        from: "5",
      },
      { obtained: ["Aga"], rule: "Modus Ponens", from: "6,7" },
      {
        obtained: ["Aag", "&", "Aga"],
        rule: "Conjunction",
        from: "8,10",
      },
      { obtained: ["Aaa"], rule: "Modus Ponens", from: "9,11" },
      { obtained: ["~Pa", "|", "Aaa"], rule: "Addition", from: "12" },
      {
        obtained: ["Pa", "->", "Aaa"],
        rule: "Material Implication",
        from: "13",
      },
      {
        obtained: ["∀y", "(", "Py", "->", "Aay", ")"],
        rule: "Universal Generalization",
        from: "14",
      },
      {
        obtained: ["~Pa", "|", "(", "∀y", "(", "Py", "->", "Aay", ")", ")"],
        rule: "Addition",
        from: "15",
      },
      {
        obtained: ["Pa", "->", "∀y", "(", "Py", "->", "Aay", ")"],
        rule: "Material Implication",
        from: "16",
      },
      {
        obtained: [
          "∃x",
          "(",
          "Px",
          "->",
          "∀y",
          "(",
          "Py",
          "->",
          "Axy",
          ")",
          ")",
        ],
        rule: "Existential Generalization",
        from: "17",
      },
    ];

    expect(result).toEqual(expected);
  });

  /**
   * Failing
   */
  it.skip("Biconditional operator in nested quantifier conc", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px <-> \u2200y(Py -> Axy))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);

    expect(result).toEqual(false);
  });

  /**
   * Failing
   */
  it.skip("Biconditional operator in nested quantifier conc", () => {
    const premiseArr = [
      "\u2200x \u2200y((Axg & Agy) -> Axy)",
      "\u2200x(Px -> Agx)",
      "\u2203x(Px & Axg)",
    ];
    const conclusionArr = "\u2203x(Px <-> \u2200y(Py))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);

    expect(result).toEqual(false);
  });
});

describe("report-id: vSeIoabNKV3nuqQWPQQZ", () => {
  it("test 17 -reported ", () => {
    const premiseArr = ["\u2203x\u2200y(Kxy)", "\u2200x \u2200y(Lyx)"];
    const conclusionArr = "\u2203x\u2203y(Kxy & Lyx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["∀y", "(", "Kay", ")"],
        rule: "Existential Instantiation",
      },
      { from: "3", obtained: ["Kaa"], rule: "Universal Instantiation" },
      {
        from: "2",
        obtained: ["∀y", "(", "Lya", ")"],
        rule: "Universal Instantiation",
      },
      { from: "5", obtained: ["Laa"], rule: "Universal Instantiation" },
      { from: "4,6", obtained: ["Kaa", "&", "Laa"], rule: "Conjunction" },
      {
        from: "7",
        obtained: ["∃y", "(", "Kay", "&", "Lya", ")"],
        rule: "Existential Generalization",
      },
      {
        from: "8",
        obtained: ["∃x", "∃y", "(", "Kxy", "&", "Lyx", ")"],
        rule: "Existential Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("test -17 expansion -diff quanitifiers ", () => {
    const premiseArr = ["\u2203x \u2200y(Kxy)"];
    const conclusionArr = "\u2203x\u2203y(Kxy)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);

    const expected = [
      {
        from: "1",
        obtained: ["∀y", "(", "Kay", ")"],
        rule: "Existential Instantiation",
      },
      { from: "2", obtained: ["Kaa"], rule: "Universal Instantiation" },
      {
        from: "3",
        obtained: ["∃y", "(", "Kay", ")"],
        rule: "Existential Generalization",
      },
      {
        from: "4",
        obtained: ["∃x", "∃y", "(", "Kxy", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test -17 expansion -2", () => {
    const expected = [
      { from: "1", obtained: ["Ka"], rule: "Existential Instantiation" },
      {
        from: "2",
        obtained: ["∃y", "(", "Ky", ")"],
        rule: "Existential Generalization",
      },
    ];

    const premiseArr = ["\u2203x(Kx)"];
    const conclusionArr = "\u2203y(Ky)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);

    expect(result).toEqual(expected);
  });

  it("test -17 expansion -3", () => {
    const premiseArr = ["\u2203x\u2203y(Kxy)"];
    const conclusionArr = "\u2203y\u2203x(Kxy)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);

    const expected = [
      {
        from: "1",
        obtained: ["∃y", "(", "Kby", ")"],
        rule: "Existential Instantiation",
      },
      { from: "2", obtained: ["Kba"], rule: "Existential Instantiation" },
      {
        from: "3",
        obtained: ["∃x", "(", "Kxa", ")"],
        rule: "Existential Generalization",
      },
      {
        from: "4",
        obtained: ["∃y", "∃x", "(", "Kxy", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 17  -- check for double universal", () => {
    const premiseArr = ["\u2200x\u2200y (Pyx)"];
    const conclusionArr = "\u2200y \u2200x ( Pxy )";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["∀y", "(", "Pya", ")"],
        rule: "Universal Instantiation",
      },
      { from: "2", obtained: ["Paa"], rule: "Universal Instantiation" },
      {
        from: "3",
        obtained: ["∀x", "(", "Pxa", ")"],
        rule: "Universal Generalization",
      },
      {
        from: "4",
        obtained: ["∀y", "∀x", "(", "Pxy", ")"],
        rule: "Universal Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe("argument-id: nJk4TskzHUgf0xArQgUW ", () => {
  it("main test", () => {
    const premiseArr = ["∀x(Px) ∧ ∀x(Qx)"];
    const conclusionArr = "∀x(Qx) ∧ ∀x(Px)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      { from: "1", obtained: ["∀x", "(", "Px", ")"], rule: "Simplification" },
      { from: "1", obtained: ["∀x", "(", "Qx", ")"], rule: "Simplification" },
      {
        from: "3,2",
        obtained: ["∀x", "(", "Qx", ")", "&", "∀x", "(", "Px", ")"],
        rule: "Conjunction",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("test 2", () => {
    const premiseArr = ["∀x(Px)"];
    const conclusionArr = "∀x(Px) | ∀x(Qx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      { from: "1", obtained: ["Pa"], rule: "Universal Instantiation" },
      {
        from: "1",
        obtained: ["∀x", "(", "Px", ")", "|", "∀x", "(", "Qx", ")"],
        rule: "Addition",
      },
    ];
    expect(result).toEqual(expected);
  });

  it("test 3", () => {
    const premiseArr = ["∀x(Px)"];
    const conclusionArr = "Pa | Qa";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      { from: "1", obtained: ["Pa"], rule: "Universal Instantiation" },
      { from: "2", obtained: ["Pa", "|", "Qa"], rule: "Addition" },
    ];
    expect(result).toEqual(expected);
  });
  it("test 4", () => {
    const premiseArr = ["∀x(~Px)"];
    const conclusionArr = "~Pa";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      { from: "1", obtained: ["~Pa"], rule: "Universal Instantiation" },
    ];
    expect(result).toEqual(expected);
  });
  it("test 5", () => {
    const premiseArr = ["∀x(~Px | Rx)"];
    const conclusionArr = "\u2200x(Px -> Rx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["~Pa", "|", "Ra"],
        rule: "Universal Instantiation",
      },
      { from: "2", obtained: ["Pa", "->", "Ra"], rule: "Material Implication" },
      {
        from: "3",
        obtained: ["∀x", "(", "Px", "->", "Rx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
});
