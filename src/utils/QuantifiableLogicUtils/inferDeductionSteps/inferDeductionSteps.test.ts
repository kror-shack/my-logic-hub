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
        rule: "Existential Instantiation",
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
        rule: "Existential Instantiation",
      },
    ];

    expect(result).toEqual(expected);
  });
  // it.only("test - 2", () => {
  //   const premiseArr = ["\u2200(x) (A^x -> ~B^x)", "\u2203(x) (C^x & A^x)"];
  //   const conclusionArr = "\u2203(x) C^x & ~B^x";
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(null);
  // });
  // it("test - 2 --invalid", () => {
  //   const premiseArr = [
  //     ["forall[x]", "D^x", "->", "~E^x"],
  //     ["forall[x]", "E^x", "->", "F^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "F^x", "->", "~D^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(false);
  // });
  // it("test - 3", () => {
  //   const premiseArr = [
  //     ["forall[x]", "H^x", "->", "(", "E^x", "&", "D^x", ")"],
  //     ["forall[x]", "H^x", "&", "S^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "E^x", "&", "S^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(true);
  // });
  // it("test - 4", () => {
  //   const premiseArr = [
  //     ["forall[x]", "H^x", "->", "(", "E^x", "&", "D^x", ")"],
  //     ["forall[x]", "H^x", "&", "S^x"],
  //   ];
  //   const conclusionArr = ["forsome[x]", "E^x", "&", "S^x"];
  //   const result = inferDeductionSteps(premiseArr, conclusionArr);
  //   expect(result).toEqual(true);
  // });
});
