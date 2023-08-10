import inferThroughPermutations from "./inferThroughPermutations";

describe("inferThroughPermutations", () => {
  it("test 1", () => {
    const premiseArr = [
      "\u2203(x) (Gx & Axf)",
      "\u2200(x)(Wx->\u2200(y)(Gy -> Axy))",
      "Wf",
    ];
    const conclusionArr = "\u2203(x) (Axf & Afx)";
    const expected = [
      {
        from: "1",
        obtained: ["Ga", "&", "Aaf"],
        rule: "Existential Instantiation",
      },
      { from: "1", obtained: ["Ga"], rule: "Simplification" },
      { from: "1", obtained: ["Aaf"], rule: "Simplification" },
      {
        from: "2",
        obtained: ["Wf", "->", "∀(y)", "(", "Gy", "->", "Afy", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "6,3",
        obtained: ["∀(y)", "(", "Gy", "->", "Afy", ")"],
        rule: "Modus Ponens",
      },
      {
        from: "7",
        obtained: ["Ga", "->", "Afa"],
        rule: "Universal Instantiation",
      },
      { from: "8,4", obtained: ["Afa"], rule: "Modus Ponens" },
      { from: "5,9", obtained: ["Aaf", "&", "Afa"], rule: "Conjunction" },
      {
        from: "10",
        obtained: ["∃(x)", "(", "Axf", "&", "Afx", ")"],
        rule: "Existential Generalization",
      },
    ];

    const permutations = inferThroughPermutations(premiseArr, conclusionArr);

    expect(permutations).toEqual(expected);
  });

  it("test - 2", () => {
    const premiseArr = [
      "\u2203(x) (Px & Lx)",
      "\u2200(x)(Lx->Rx)",
      "\u2200(x) (Rx->~Fx)",
    ];
    const conclusionArr = "\u2203(x) (Px& ~Fx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Pa", "&", "La"],
        rule: "Existential Instantiation",
      },
      { from: "1", obtained: ["Pa"], rule: "Simplification" },
      { from: "1", obtained: ["La"], rule: "Simplification" },
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
      { from: "6,5", obtained: ["Ra"], rule: "Modus Ponens" },
      { from: "7,8", obtained: ["~Fa"], rule: "Modus Ponens" },
      { from: "4,9", obtained: ["Pa", "&", "~Fa"], rule: "Conjunction" },
      {
        from: "10",
        obtained: ["∃(x)", "(", "Px", "&", "~Fx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 3", () => {
    const premiseArr = ["\u2203(x) (Ax & ~Fx)", "\u2200(x)(Cx->Fx)"];
    const conclusionArr = "\u2203(x) (Ax&~Cx)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Aa", "&", "~Fa"],
        rule: "Existential Instantiation",
      },
      { from: "1", obtained: ["Aa"], rule: "Simplification" },
      { from: "1", obtained: ["~Fa"], rule: "Simplification" },
      {
        from: "2",
        obtained: ["Ca", "->", "Fa"],
        rule: "Universal Instantiation",
      },
      { from: "5,4", obtained: ["~Ca"], rule: "Modus Tollens" },
      { from: "3,6", obtained: ["Aa", "&", "~Ca"], rule: "Conjunction" },
      {
        from: "7",
        obtained: ["∃(x)", "(", "Ax", "&", "~Cx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 4", () => {
    const premiseArr = ["\u2200(x)(Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2203(x)(Ex&Sx)";
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
        obtained: ["∃(x)", "(", "Ex", "&", "Sx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 5", () => {
    const premiseArr = ["\u2200(x) (Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2200(x) (Ex&Sx)";
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
        obtained: ["∀(x)", "(", "Ex", "&", "Sx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 6", () => {
    const premiseArr = ["\u2200(x) (Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2200(x) (Ex&Sx)";
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
        obtained: ["∀(x)", "(", "Ex", "&", "Sx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  /**
   * FAIL
   * MODIFY THE FUNCTION TO ALLOW FOR MORE
   * THAN ONE QUANTIFIER CONCLUSION
   */
  it.skip("test - 7", () => {
    const premiseArr = [
      "\u2200(x) \u2200(y)((Axg & Agy) -> Axy)",
      "\u2200(x)(Px -> Agx)",
      "\u2203(x)(Px & Axg)",
    ];
    const conclusionArr = "\u2203(x)(Px & \u2200(y)(Py -> Axy))";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [];

    expect(result).toEqual(null);
  });

  it("destructuring test-7", () => {
    const premiseArr = [
      "\u2200(x) \u2200(y)((Axg & Agy) -> Axy)",
      "\u2200(x)(Px -> Agx)",
      "\u2203(x)(Px & Axg)",
    ];
    const conclusionArr = "\u2203(x)(Px)";
    const result = inferThroughPermutations(premiseArr, conclusionArr);
    const expected = [
      {
        from: "3",
        obtained: ["Pa", "&", "Aag"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["∀(y)", "(", "(", "Aag", "&", "Agy", ")", "->", "Aay", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Pa", "->", "Aga"],
        rule: "Universal Instantiation",
      },
      { from: "1", obtained: ["Pa"], rule: "Simplification" },
      { from: "1", obtained: ["Aag"], rule: "Simplification" },
      {
        from: "4",
        obtained: ["(", "Aag", "&", "Aga", ")", "->", "Aaa"],
        rule: "Universal Instantiation",
      },
      { from: "5,6", obtained: ["Aga"], rule: "Modus Ponens" },
      { from: "7,9", obtained: ["Aag", "&", "Aga"], rule: "Conjunction" },
      { from: "8,10", obtained: ["Aaa"], rule: "Modus Ponens" },
      {
        from: "6",
        obtained: ["∃(x)", "(", "Px", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 8", () => {
    const premiseArr = ["\u2200(x) ( Ax -> ~Bx )", "\u2200(x) ( Ax )"];
    const conclusionArr = "\u2200(x) ( ~Bx )";
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
        obtained: ["∀(x)", "(", "~Bx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
});
