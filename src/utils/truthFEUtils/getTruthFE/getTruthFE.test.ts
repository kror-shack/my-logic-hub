import getTruthFE from "./getTruthFE";

describe("getTruthFE", () => {
  it("test 1", () => {
    const premiseArr = ["\u2203y(Fx <-> ~Fy)"];
    const conclusionArr = "\u2203y(Fy <-> ~Fy)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }",
      "The following are the domain values where items between { } are values where that predicate is true",
      "F: {0}",
      "Adding closure for premise(1): ∀(x)(∃(y)(Fx<->~Fy))  ",
      "Expanded premise(1): ( ( ( F0 <-> ~F0 ) | ( F0 <-> ~F1 ) ) ) & ( ( ( F1 <-> ~F0 ) | ( F1 <-> ~F1 ) ) )  ",
      "Truth replacement for premise(1): ( ( ( T <-> ~T ) | ( T <-> ~F ) ) ) & ( ( ( F <-> ~T ) | ( F <-> ~F ) ) )",
      "Truth value for premise(1): true",
      "Expanded conclusion: ( F0 <-> ~F0 ) | ( F1 <-> ~F1 )  ",
      "Truth replacement for conclusion: ( T <-> ~T ) | ( F <-> ~F )",
      "Truth value for conclusion: false",
    ];

    expect(truthFE).toEqual(expected);
  });
  it("test 2", () => {
    const premiseArr = ["\u2200x \u2203y(Fx <-> Gy)"];
    const conclusionArr = "\u2203y \u2200x(Fx <-> Gy)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = [
      "The universe of this counter model is U:{ 0,1 }",
      "The following are the domain values where items between { } are values where that predicate is true",
      "F: {0}",
      "G: {0}",
      "Expanded premise(1): ( ( F0 <-> G0 ) | ( F0 <-> G1 ) ) & ( ( F1 <-> G0 ) | ( F1 <-> G1 ) )  ",
      "Truth replacement for premise(1): ( ( T <-> T ) | ( T <-> F ) ) & ( ( F <-> T ) | ( F <-> F ) )",
      "Truth value for premise(1): true",
      "Expanded conclusion: ( ( F0 <-> G0 ) & ( F1 <-> G0 ) ) | ( ( F0 <-> G1 ) & ( F1 <-> G1 ) )  ",
      "Truth replacement for conclusion: ( ( T <-> T ) & ( F <-> T ) ) | ( ( T <-> F ) & ( F <-> F ) )",
      "Truth value for conclusion: false",
    ];

    expect(truthFE).toEqual(expected);
  });
});
