import getSyllogismTerms from "./getSyllogismTerms";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

//how are the tests passing?

describe("getSyllogismTerms", () => {
  test("All men are mortal. Socrates is a man. Therefore, Socrates is mortal.", () => {
    const premise1: Structure = {
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

    const syllogisticTerms = getSyllogismTerms(premise1, p2, conclusion);
    const expectedTerms = {
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
    };
    expect(syllogisticTerms).toStrictEqual(expectedTerms);
  });

  test("All humans are mortal. Some Greeks are humans. Therefore, some Greeks are mortal.", () => {
    const premise1: Structure = {
      subject: "humans",
      predicate: "mortal",
      type: "A",
    };
    const p2: Structure = {
      subject: "greeks",
      predicate: "humans",
      type: "I",
    };

    const conclusion: Structure = {
      subject: "greeks",
      predicate: "mortal",
      type: "I",
    };

    const syllogisticTerms = getSyllogismTerms(premise1, p2, conclusion);
    const expectedTerms = {
      majorTerm: "mortal",
      minorTerm: "greeks",
      middleTerm: "humans",
    };
    expect(syllogisticTerms).toStrictEqual(expectedTerms);
  });

  test("All birds can fly. Penguins are birds. Therefore, Penguins can fly.", () => {
    const premise1: Structure = {
      subject: "birds",
      predicate: "fly",
      type: "A",
    };
    const p2: Structure = {
      subject: "Penguins",
      predicate: "birds",
      type: "I",
    };

    const conclusion: Structure = {
      subject: "Penguins",
      predicate: "fly",
      type: "I",
    };

    const syllogisticTerms = getSyllogismTerms(premise1, p2, conclusion);
    const expectedTerms = {
      majorTerm: "fly",
      minorTerm: "penguins",
      middleTerm: "birds",
    };
    expect(syllogisticTerms).toStrictEqual(expectedTerms);
  });

  test("No dogs are cats. Some animals are dogs. Therefore, some animals are not cats.", () => {
    const premise1: Structure = {
      subject: "dogs",
      predicate: "cats",
      type: "E type",
    };
    const p2: Structure = {
      subject: "animals",
      predicate: "dogs",
      type: "I",
    };

    const conclusion: Structure = {
      subject: "animals",
      predicate: "cats",
      type: "O",
    };

    const syllogisticTerms = getSyllogismTerms(premise1, p2, conclusion);
    const expectedTerms = {
      majorTerm: "cats",
      minorTerm: "animals",
      middleTerm: "dogs",
    };
    expect(syllogisticTerms).toStrictEqual(expectedTerms);
  });
});
