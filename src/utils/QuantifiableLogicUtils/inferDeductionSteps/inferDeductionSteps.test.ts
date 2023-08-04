import inferDeductionSteps from "./inferDeductionSteps"; // Replace this with the correct path to your function

describe("inferDeductionSteps function", () => {
  it("test - 1", () => {
    const premiseArr = ["\u2200(x)  Ax -> ~Bx", "\u2200(x) Ax"];
    const conclusionArr = "\u2200(x) ~Bx";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
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
        obtained: ["\u2200(x)", "~Bx"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 1 --brackets added", () => {
    const premiseArr = ["\u2200(x) ( Ax -> ~Bx )", "\u2200(x) ( Ax )"];
    const conclusionArr = "\u2200(x) ( ~Bx )";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Aa", "->", "~Ba"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["Aa"],
        rule: "Universal Instantiation",
      },
      { from: "3,4", obtained: ["~Ba"], rule: "Modus Ponens" },
      {
        from: "5",
        obtained: ["\u2200(x)", "(", "~Bx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  // it.only("test - 2", () => {
  //   const premiseArr = ["\u2200(x) (A^x -> ~B^x)", "\u2203(x) (C^x & A^x)"];
  //   const conclusionArr = "\u2203(x)( C^x & ~B^x)";
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   const expected = [
  //     {
  //       from: "2",
  //       obtained: ["C", "^", "x", "&", "A", "^", "x"],
  //       rule: "Existential Instantiation",
  //     },
  //     {
  //       from: "1",
  //       obtained: ["A", "^", "x", "->", "~B", "^", "x"],
  //       rule: "Universal Instantiation",
  //     },
  //     { from: "3", obtained: ["C^x"], rule: "Simplification" },
  //     { from: "3", obtained: ["A^x"], rule: "Simplification" },
  //     { from: "4,6", obtained: ["~B^x"], rule: "Modus Ponens" },
  //     { from: "5,7", obtained: ["C^x", "&", "~B^x"], rule: "Conjunction" },
  //     {
  //       from: "8",
  //       obtained: ["∃(x)", "(", "C", "^", "x", "&", "~B", "^", "x", ")"],
  //       rule: "Existential Generalization",
  //     },
  //   ];

  //   expect(result).toEqual(expected);
  // });

  it("test - 3", () => {
    const premiseArr = ["\u2200(x)(Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2203(x)(Ex&Sx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
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
  it("test - 4", () => {
    const premiseArr = ["\u2200(x) (Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2200(x) (Ex&Sx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
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
  it("test - 5", () => {
    const premiseArr = ["\u2203(x) (Ax & ~Fx)", "\u2200(x)(Cx->Fx)"];
    const conclusionArr = "\u2203(x) (Ax&~Cx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Aa", "&", "~Fa"],
        rule: "Existential Instantiation",
      },
      {
        from: "2",
        obtained: ["Ca", "->", "Fa"],
        rule: "Universal Instantiation",
      },
      { from: "3", obtained: ["Aa"], rule: "Simplification" },
      { from: "3", obtained: ["~Fa"], rule: "Simplification" },
      { from: "4,6", obtained: ["~Ca"], rule: "Modus Tollens" },
      { from: "5,7", obtained: ["Aa", "&", "~Ca"], rule: "Conjunction" },
      {
        from: "8",
        obtained: ["∃(x)", "(", "Ax", "&", "~Cx", ")"],
        rule: "Existential Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });
  it("test - 6", () => {
    const premiseArr = [
      "\u2203(x) (Px & Lx)",
      "\u2200(x)(Lx->Rx)",
      "\u2200(x) (Rx->~Fx)",
    ];
    const conclusionArr = "\u2203(x) (Px& ~Fx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Pa", "&", "La"],
        rule: "Existential Instantiation",
      },
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
      { from: "4", obtained: ["Pa"], rule: "Simplification" },
      { from: "4", obtained: ["La"], rule: "Simplification" },
      { from: "5,8", obtained: ["Ra"], rule: "Modus Ponens" },
      { from: "6,9", obtained: ["~Fa"], rule: "Modus Ponens" },
      { from: "7,10", obtained: ["Pa", "&", "~Fa"], rule: "Conjunction" },
      {
        from: "11",
        obtained: ["∃(x)", "(", "Px", "&", "~Fx", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test -7", () => {
    const premiseArr = [
      "\u2203(x) (Gx & Axf)",
      "\u2200(x)(Wx->\u2200(y)(Gy -> Axy))",
      "Wf",
    ];
    const conclusionArr = "\u2203(x) (Axf & Afx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["Ga", "&", "Aaf"],
        rule: "Existential Instantiation",
      },
      {
        from: "2",
        obtained: ["Wf", "->", "∀(y)", "(", "Gy", "->", "Afy", ")"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ga"], rule: "Simplification" },
      { from: "4", obtained: ["Aaf"], rule: "Simplification" },
      {
        from: "5,3",
        obtained: ["∀(y)", "(", "Gy", "->", "Afy", ")"],
        rule: "Modus Ponens",
      },
      {
        from: "8",
        obtained: ["Ga", "->", "Afa"],
        rule: "Universal Instantiation",
      },
      { from: "9,6", obtained: ["Afa"], rule: "Modus Ponens" },
      { from: "7,10", obtained: ["Aaf", "&", "Afa"], rule: "Conjunction" },
      {
        from: "11",
        obtained: ["∃(x)", "(", "Axf", "&", "Afx", ")"],
        rule: "Existential Generalization",
      },
    ];
    expect(result).toEqual(expected);
  });
  // it("test - 2 --invalid", () => {
  //   const premiseArr = [
  //     ["forall[x]", "D^x", "->", "~E^x"],
  //     ["forall[x]", "E^x", "->", "F^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "F^x", "->", "~D^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(false);
  // });
});
