import getCounterModel from "./getCounterModel";

describe("getCounterModel -without quantifiers", () => {
  it("test 1", () => {
    const premiseArr = ["F"];
    const conclusionArr = "G";
    const expected = { F: "T", G: "F", universe: [0] };
    const truthFE = getCounterModel(premiseArr, conclusionArr);

    expect(truthFE).toEqual(expected);
  });

  it("test 2", () => {
    const premiseArr = ["F"];
    const conclusionArr = "G | F";
    const truthFE = getCounterModel(premiseArr, conclusionArr);

    expect(truthFE).toEqual(false);
  });

  it("test 3", () => {
    const premiseArr = ["F", "I"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "T", universe: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 4", () => {
    const premiseArr = ["F & I", "I | G"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "T", universe: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 5 - simple negation", () => {
    const premiseArr = ["~F"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", universe: [] };

    expect(truthFE).toEqual(expected);
  });

  it("test 6 - negation with secondary operator", () => {
    const premiseArr = ["~(F&I)"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "T", universe: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 7 - implication", () => {
    const premiseArr = ["F ->I"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "F", universe: [] };
    expect(truthFE).toEqual(expected);
  });

  it("test 8 - negated implication", () => {
    const premiseArr = ["~(F ->I)"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "T", G: "F", I: "F", universe: [0] };
    expect(truthFE).toEqual(expected);
  });

  it("test 9 - biConditional", () => {
    const premiseArr = ["F <->I"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "F", universe: [] };
    expect(truthFE).toEqual(expected);
  });

  it("test 10 - negated biConditional -a contradiction", () => {
    const premiseArr = ["~(F <->I)"];
    const conclusionArr = "G";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: "F", G: "F", I: "T", universe: [0] };
    expect(truthFE).toEqual(expected);
  });

  // NOTE: while checking input for errors allow the form PA

  it("test 11", () => {
    const premiseArr = ["GA"];
    const conclusionArr = "F";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { A: 0, F: "F", G: [0], universe: [0] };
    expect(truthFE).toEqual(expected);
  });
});

describe("getCounterModel -with quantifiers", () => {
  it("test 11", () => {
    const premiseArr = ["\u2200x(Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: [0], G: [], universe: [0] };

    expect(truthFE).toEqual(expected);
  });
  it("test 12", () => {
    const premiseArr = ["\u2200x(Fx & Ix)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: [0], G: [], I: [0], universe: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 13", () => {
    const premiseArr = ["\u2200x(~Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: [], G: [], universe: [0] };

    expect(truthFE).toEqual(expected);
  });

  it("test 14", () => {
    const premiseArr = ["\u2200x(Fx & ~Fx)"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);

    expect(truthFE).toEqual(false);
  });
  it("test 15", () => {
    const premiseArr = ["\u2200x(Wx->\u2200y(Py -> Ay))"];
    const conclusionArr = "\u2200x(Gx)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { A: [], G: [], P: [], W: [], universe: [0] };

    expect(truthFE).toEqual(expected);
  });
  it("test 16", () => {
    const premiseArr = ["\u2203y(Fx <-> ~Fy)"];
    const conclusionArr = "\u2203y(Fy <-> ~Fy)";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { F: [0], universe: [0, 1] };

    expect(truthFE).toEqual(expected);
  });
  it("test 17", () => {
    const conclusionArr = "∃y ∀x(Fx <-> Gy)";
    const truthFE = getCounterModel([], conclusionArr);
    const expected = { F: [], G: [], universe: [] };

    expect(truthFE).toEqual(expected);
  });
  it("test 18", () => {
    const conclusionArr = "∀x(Fx <-> GA)";
    const truthFE = getCounterModel([], conclusionArr);
    const expected = { F: [], G: [], A: 0, universe: [] };

    expect(truthFE).toEqual(expected);
  });
  it("test 19", () => {
    const premiseArr = ["~\u2200x \u2203y(Fx <-> Gy)"];
    const conclusionArr = "A";
    const truthFE = getCounterModel(premiseArr, conclusionArr);
    const expected = { A: "F", F: [], G: [0], universe: [0] };

    expect(truthFE).toEqual(expected);
  });
});
