import getSyllogismMood from "./getSyllogsimMood";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

describe("getSyllogismMood", () => {
  test("AAA type", () => {
    const terms = {
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
    };
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
    expect(getSyllogismMood(terms, p1, p2, conclusion)).toBe("AAA");
  });

  test("EAE type", () => {
    const terms = {
      majorTerm: "fish",
      minorTerm: "cats",
      middleTerm: "mammals",
    };
    const p1: Structure = {
      subject: "mammals",
      predicate: "fish",
      type: "E",
    };
    const p2: Structure = {
      subject: "cats",
      predicate: "mammals",
      type: "A",
    };
    const conclusion: Structure = {
      subject: "cats",
      predicate: "fish",
      type: "E",
    };
    expect(getSyllogismMood(terms, p1, p2, conclusion)).toBe("EAE");
  });

  test("IAI type", () => {
    const terms = {
      majorTerm: "knowledgeable",
      minorTerm: "doctors",
      middleTerm: "professionals",
    };
    const p1: Structure = {
      subject: "professionals",
      predicate: "knowledgeable",
      type: "I",
    };
    const p2: Structure = {
      subject: "doctors",
      predicate: "proffesionals",
      type: "A",
    };
    const conclusion: Structure = {
      subject: "doctors",
      predicate: "knowledgeable",
      type: "I",
    };
    expect(getSyllogismMood(terms, p1, p2, conclusion)).toBe("IAI");
  });

  test("OAO type", () => {
    const terms = {
      majorTerm: "birds",
      minorTerm: "dangerous",
      middleTerm: "predators",
    };
    const p1: Structure = {
      subject: "predators",
      predicate: "dangerous",
      type: "O",
    };
    const p2: Structure = {
      subject: "eagles",
      predicate: "birds of prey",
      type: "E",
    };
    const conclusion: Structure = {
      subject: "birds",
      predicate: "dangerous",
      type: "O",
    };
    expect(getSyllogismMood(terms, p1, p2, conclusion)).toBe("EOO");
  });

  test("EAE type - test 2", () => {
    const terms = {
      majorTerm: "commercial vessels",
      middleTerm: "nuclear powered submarines",
      minorTerm: "warships",
    };
    const p1: Structure = {
      predicate: "commercial vessels",
      subject: "nuclear powered submarines",
      type: "E",
    };
    const p2: Structure = {
      subject: "warships",
      predicate: "nuclear powered submarines",
      type: "A",
    };
    const conclusion: Structure = {
      subject: "warships",
      predicate: "commercial vessels",
      type: "E",
    };
    expect(getSyllogismMood(terms, p1, p2, conclusion)).toBe("EAE");
  });
});

export {};
