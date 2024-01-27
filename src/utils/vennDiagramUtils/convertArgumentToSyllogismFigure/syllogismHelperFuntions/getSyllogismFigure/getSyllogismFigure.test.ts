import getSyllogismFigure from "./getSyllogismFigure";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};
describe("getSyllogismFigure", () => {
  test("AAA - 1 type", () => {
    const type = "AAA";
    const p1: Structure = {
      subject: "men",
      predicate: "mortal",
      type: "A",
    };
    const p2: Structure = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };
    const conclusion: Structure = {
      subject: "socrates",
      predicate: "mortal",
      type: "A",
    };
    expect(getSyllogismFigure(type, p1, p2, conclusion)).toBe("AAA-1");
  });

  test("EAE - 2 type", () => {
    const type = "EAE";

    const p1: Structure = {
      subject: "dogs",
      predicate: "animals",
      type: "A",
    };
    const p2: Structure = {
      subject: "cats",
      predicate: "animals",
      type: "E",
    };
    const conclusion: Structure = {
      subject: "cats",
      predicate: "dogs",
      type: "E",
    };
    expect(getSyllogismFigure(type, p1, p2, conclusion)).toBe("EAE-2");
  });

  test("IAI - 3 type", () => {
    const type = "IAI";
    const p1: Structure = {
      subject: "tulips",
      predicate: "flowers",
      type: "A",
    };
    const p2: Structure = {
      subject: "roses",
      predicate: "flowers",
      type: "I",
    };
    const conclusion: Structure = {
      subject: "roses",
      predicate: "tulips",
      type: "I",
    };
    expect(getSyllogismFigure(type, p1, p2, conclusion)).toBe("IAI-2");
  });

  test("OEO - 4 type", () => {
    const type = "OEO";
    const p2: Structure = {
      subject: "bacteria",
      predicate: "microorganisms",
      type: "O",
    };
    const p1: Structure = {
      subject: "plants",
      predicate: "microorganisms",
      type: "E",
    };
    const conclusion: Structure = {
      subject: "bacteria",
      predicate: "plants",
      type: "O",
    };
    expect(getSyllogismFigure(type, p1, p2, conclusion)).toBe("OEO-2");
  });
});

export {};
