import getTruthFE from "./getTruthFE";

describe("getTruthFE -without quantifiers", () => {
  it("test 1", () => {
    const premiseArr = ["F"];
    const conclusionArr = "G";
    const expected = { F: "T", G: "F" };
    const truthFE = getTruthFE(premiseArr, conclusionArr);

    expect(truthFE).toEqual(expected);
  });

  it("test 2", () => {
    const premiseArr = ["F"];
    const conclusionArr = "G | F";
    const truthFE = getTruthFE(premiseArr, conclusionArr);

    expect(truthFE).toEqual(false);
  });

  it("test 3", () => {
    const premiseArr = ["F", "I"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "T" };

    expect(truthFE).toEqual(expected);
  });

  it("test 4", () => {
    const premiseArr = ["F & I", "I | G"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "T" };

    expect(truthFE).toEqual(expected);
  });

  it("test 5 - simple negation", () => {
    const premiseArr = ["~F"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F" };

    expect(truthFE).toEqual(expected);
  });

  it("test 6 - negation with secondary operator", () => {
    const premiseArr = ["~(F&I)"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "T" };

    expect(truthFE).toEqual(expected);
  });

  it("test 7 - implication", () => {
    const premiseArr = ["F ->I"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "F" };
    expect(truthFE).toEqual(expected);
  });

  it("test 8 - negated implication", () => {
    const premiseArr = ["~(F ->I)"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "F" };
    expect(truthFE).toEqual(expected);
  });

  it("test 9 - biConditional", () => {
    const premiseArr = ["F <->I"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "F" };
    expect(truthFE).toEqual(expected);
  });

  it("test 10 - negated biConditional -a contradiction", () => {
    const premiseArr = ["~(F <->I)"];
    const conclusionArr = "G";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = false;
    expect(truthFE).toEqual(expected);
  });

  // NOTE: while checking input for errors allow the form PA

  it("test 11", () => {
    const premiseArr = ["GA"];
    const conclusionArr = "F";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { A: 0, F: "F", G: [0] };
    expect(truthFE).toEqual(expected);
  });
});

describe("getTruthFE -with quantifiers", () => {
  it("test 11", () => {
    const premiseArr = ["\u2200x(Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: [0], G: [] };

    expect(truthFE).toEqual(expected);
  });
  it("test 12", () => {
    const premiseArr = ["\u2200x(Fx & Ix)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: [0], G: [], I: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 13", () => {
    const premiseArr = ["\u2200x(~Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);
    const expected = { F: [], G: [] };

    expect(truthFE).toEqual(expected);
  });

  it("test 14", () => {
    const premiseArr = ["\u2200x(Fx & ~Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);

    expect(truthFE).toEqual(false);
  });
  it("test 15", () => {
    const premiseArr = ["\u2200x(Wx->\u2200y(Py -> Ay))"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getTruthFE(premiseArr, conclusionArr);

    expect(truthFE).toEqual({ A: [], G: [], P: [], W: [] });
  });
});
