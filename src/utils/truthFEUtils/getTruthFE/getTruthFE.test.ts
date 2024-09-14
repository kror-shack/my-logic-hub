import getTruthFE from "./getTruthFE";

describe("getTruthFE", () => {
  it("test 1", () => {
    const premiseArr = ["\u2203y(Fx <-> ~Fy)"];
    const conclusionArr = "\u2203y(Fy <-> ~Fy)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: { 0 }",
      "Adding closure for premise(1): ∀(x)(∃(y)(Fx<->~Fy))  ",
      "Instantiating premise(1): ( ( ( F0 <-> ~F0 ) | ( F0 <-> ~F1 ) ) ) & ( ( ( F1 <-> ~F0 ) | ( F1 <-> ~F1 ) ) )  ",
      "Truth replacement for premise(1): ( ( ( T <-> ~T ) | ( T <-> ~F ) ) ) & ( ( ( F <-> ~T ) | ( F <-> ~F ) ) )",
      "Truth value of premise(1) is true",
      "Instantiating the conclusion: ( F0 <-> ~F0 ) | ( F1 <-> ~F1 )  ",
      "Truth replacement for the conclusion: ( T <-> ~T ) | ( F <-> ~F )",
      "Truth value of the conclusion is false",
    ];

    expect(truthFE).toEqual(expected);
  });
  it("test 2", () => {
    const premiseArr = ["\u2200x \u2203y(Fx <-> Gy)"];
    const conclusionArr = "\u2203y \u2200x(Fx <-> Gy)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: { 0 }",
      "G: { 0 }",
      "Instantiating premise(1): ( ( F0 <-> G0 ) | ( F0 <-> G1 ) ) & ( ( F1 <-> G0 ) | ( F1 <-> G1 ) )  ",
      "Truth replacement for premise(1): ( ( T <-> T ) | ( T <-> F ) ) & ( ( F <-> T ) | ( F <-> F ) )",
      "Truth value of premise(1) is true",
      "Instantiating the conclusion: ( ( F0 <-> G0 ) & ( F1 <-> G0 ) ) | ( ( F0 <-> G1 ) & ( F1 <-> G1 ) )  ",
      "Truth replacement for the conclusion: ( ( T <-> T ) & ( F <-> T ) ) | ( ( T <-> F ) & ( F <-> F ) )",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });
  it("test 3 - without any premises", () => {
    const conclusionArr = "\u2203y \u2200x(Fx <-> Gy)";
    const truthFE = getTruthFE([], conclusionArr);
    const expected = [
      "The universe of this counter model is U:{  } i.e., an empty universe.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: {  }",
      "G: {  }",
      "Since there are no elements in the domain, the quantifiers can be removed without instantiation, as there are no values that would satisfy the predicate for the conclusion: Fx <-> Gy  ",
      "Truth replacement for the conclusion: F <-> F",
      "Truth value of the conclusion is false",
    ];

    expect(truthFE).toEqual(expected);
  });
  it("test 4 - without any quantifiers", () => {
    const conclusionArr = "F -> G";
    const truthFE = getTruthFE([], conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: T",
      "G: F",
      "Truth replacement for the conclusion: T -> F",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });
  it("test 5 - with constants", () => {
    const conclusionArr = "\u2200x(Fx <-> GA)";
    const truthFE = getTruthFE([], conclusionArr);
    const expected = [
      "The universe of this counter model is U:{  } i.e., an empty universe.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: {  }",
      "G: {  }",
      "A: { 0 }",
      "Replacing constant letters with their values for the conclusion: ∀(x)(Fx<->G0)  ",
      "Since there are no elements in the domain, the quantifiers can be removed without instantiation, as there are no values that would satisfy the predicate for the conclusion: Fx <-> G0  ",
      "Truth replacement for the conclusion: F <-> F",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });

  it("test 6 - with constants", () => {
    const premiseArr = ["\u2200x \u2203y(Fx <-> Gy)"];

    const conclusionArr = "\u2200x(Fx <-> GA)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: {  }",
      "G: { 0 }",
      "A: { 0 }",
      "Instantiating premise(1): ( ( F0 <-> G0 ) | ( F0 <-> G1 ) ) & ( ( F1 <-> G0 ) | ( F1 <-> G1 ) )  ",
      "Truth replacement for premise(1): ( ( F <-> T ) | ( F <-> F ) ) & ( ( F <-> T ) | ( F <-> F ) )",
      "Truth value of premise(1) is true",
      "Replacing constant letters with their values for the conclusion: ∀(x)(Fx<->G0)  ",
      "Instantiating the conclusion: ( F0 <-> G0 ) & ( F1 <-> G0 )  ",
      "Truth replacement for the conclusion: ( F <-> T ) & ( F <-> T )",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });
  it("test 6 - with required closure", () => {
    const premiseArr = [" \u2203y(Fx <-> Gy)"];

    const conclusionArr = "\u2200x(Fx <-> GA)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: {  }",
      "G: { 0 }",
      "A: { 0 }",
      "Adding closure for premise(1): ∀(x)(∃(y)(Fx<->Gy))  ",
      "Instantiating premise(1): ( ( ( F0 <-> G0 ) | ( F0 <-> G1 ) ) ) & ( ( ( F1 <-> G0 ) | ( F1 <-> G1 ) ) )  ",
      "Truth replacement for premise(1): ( ( ( F <-> T ) | ( F <-> F ) ) ) & ( ( ( F <-> T ) | ( F <-> F ) ) )",
      "Truth value of premise(1) is true",
      "Replacing constant letters with their values for the conclusion: ∀(x)(Fx<->G0)  ",
      "Instantiating the conclusion: ( F0 <-> G0 ) & ( F1 <-> G0 )  ",
      "Truth replacement for the conclusion: ( F <-> T ) & ( F <-> T )",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });

  it("test 7 - only constants", () => {
    const premiseArr = ["F"];

    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: T",
      "G: F",
      "Truth replacement for premise(1): T",
      "Truth value of premise(1) is true",
      "Truth replacement for the conclusion: F",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });

  it("test 8 - no quantifiers but closure is required", () => {
    const premiseArr = ["Fx"];

    const conclusionArr = "Gx";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: { 0 }",
      "G: {  }",
      "Adding closure for premise(1): ∀(x)(Fx)  ",
      "Instantiating premise(1): F0  ",
      "Truth replacement for premise(1): T",
      "Truth value of premise(1) is true",
      "Adding closure for the conclusion: ∀(x)(Gx)  ",
      "Instantiating the conclusion: G0  ",
      "Truth replacement for the conclusion: F",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });
  it("test 9 - negated quantifiers", () => {
    const premiseArr = ["~\u2200x \u2203y(Fx <-> Gy)"];
    const conclusionArr = "A";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0 }.",
      "The following are the domain values, with the constants inside { } representing the values where the predicate is true.",
      "F: {  }",
      "G: { 0 }",
      "A: F",
      "Instantiating premise(1): ~ ( F0 <-> G0 )  ",
      "Truth replacement for premise(1): ~ ( F <-> T )",
      "Truth value of premise(1) is true",
      "Truth replacement for the conclusion: F",
      "Truth value of the conclusion is false",
    ];
    expect(truthFE).toEqual(expected);
  });
});
