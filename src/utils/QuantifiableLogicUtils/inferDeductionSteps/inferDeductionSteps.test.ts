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
        from: 5,
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
        obtained: ["(", "Aa", "->", "~Ba", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["(", "Aa", ")"],
        rule: "Universal Instantiation",
      },
      { from: "3,4", obtained: ["~Ba"], rule: "Modus Ponens" },
      {
        from: 5,
        obtained: ["\u2200(x)", "(", "~Bx", ")"],
        rule: "Universal Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("test - 2", () => {
    const premiseArr = ["\u2200(x) (A^x -> ~B^x)", "\u2203(x) (C^x & A^x)"];
    const conclusionArr = "\u2203(x)( C^x & ~B^x)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "2",
        obtained: ["(", "C", "^", "x", "&", "A", "^", "x", ")"],
        rule: "Existential Instantiation",
      },
      {
        from: "1",
        obtained: ["(", "A", "^", "x", "->", "~B", "^", "x", ")"],
        rule: "Universal Instantiation",
      },
      { from: "3", obtained: ["C^x"], rule: "Simplification" },
      { from: "3", obtained: ["A^x"], rule: "Simplification" },
      { from: "4,6", obtained: ["~B^x"], rule: "Modus Ponens" },
      { from: "5,7", obtained: ["C^x", "&", "~B^x"], rule: "Conjunction" },
      {
        from: 8,
        obtained: ["∃(x)", "(", "C", "^", "x", "&", "~B", "^", "x", ")"],
        rule: "Existential Generalization",
      },
    ];

    expect(result).toEqual(expected);
  });

  it("test - 3", () => {
    const premiseArr = ["\u2200(x)(Hx->(Ex&Dx))", "\u2200(x)(Hx&Sx)"];
    const conclusionArr = "\u2203(x)(Ex&Sx)";
    const result = inferDeductionSteps(premiseArr, conclusionArr);
    const expected = [
      {
        from: "1",
        obtained: ["(", "Ha", "->", "(", "Ea", "&", "Da", ")", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["(", "Ha", "&", "Sa", ")"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ha"], rule: "Simplification" },
      { from: "4", obtained: ["Sa"], rule: "Simplification" },
      { from: "3,5", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "7", obtained: ["Ea"], rule: "Simplification" },
      { from: "7", obtained: ["Da"], rule: "Simplification" },
      { from: "8,6", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
      {
        from: 10,
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
        obtained: ["(", "Ha", "->", "(", "Ea", "&", "Da", ")", ")"],
        rule: "Universal Instantiation",
      },
      {
        from: "2",
        obtained: ["(", "Ha", "&", "Sa", ")"],
        rule: "Universal Instantiation",
      },
      { from: "4", obtained: ["Ha"], rule: "Simplification" },
      { from: "4", obtained: ["Sa"], rule: "Simplification" },
      { from: "3,5", obtained: ["Ea", "&", "Da"], rule: "Modus Ponens" },
      { from: "7", obtained: ["Ea"], rule: "Simplification" },
      { from: "7", obtained: ["Da"], rule: "Simplification" },
      { from: "8,6", obtained: ["Ea", "&", "Sa"], rule: "Conjunction" },
      {
        from: 10,
        obtained: ["∀(x)", "(", "Ex", "&", "Sx", ")"],
        rule: "Universal Generalization",
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
