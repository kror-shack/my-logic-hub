import convertArgumentToSyllogismFigure from "./convertArgumentToSyllogismFigure";

describe("convertArgumentToSyllogismFigure", () => {
  test("AAA-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All men are mortal",
        "Socrates is a man",
        "Therefore, Socrates is mortal"
      )
    ).toStrictEqual({
      figure: "AAA-1",

      majorPremise: "All men are mortal",

      minorPremise: "Socrates is a man",

      majorTerm: "mortal",

      minorTerm: "Socrates",

      middleTerm: "men",
    });
  });

  test("EAO-3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "No cats are dogs",
        "All cats are mammals",
        "Therefore, some mammals are not dogs"
      )
    ).toStrictEqual({
      figure: "EAO-3",

      majorPremise: "No cats are dogs",

      minorPremise: "All cats are mammals",

      majorTerm: "dogs",

      minorTerm: "mammals",

      middleTerm: "cats",
    });
  });

  test("EAO-4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "No birds are fish",
        "Some fish are cold-blooded animals",
        "Therefore, some cold-blooded animals are not birds"
      )
    ).toStrictEqual({
      figure: "EIO-4",

      majorPremise: "No birds are fish",

      minorPremise: "Some fish are cold-blooded animals",

      majorTerm: "birds",

      minorTerm: "cold blooded animals",

      middleTerm: "fish",
    });
  });

  test("OAO-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds are animals",
        "Some animals are not mammals",
        "Therefore, some birds are not mammals"
      )
    ).toStrictEqual({
      figure: "OAO-1",

      majorPremise: "Some animals are not mammals",

      minorPremise: "All birds are animals",

      majorTerm: "mammals",

      minorTerm: "birds",

      middleTerm: "animals",
    });
  });

  test("AOO-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "Some dogs are not friendly animals",
        "All friendly animals make good pets",
        "Therefore, some dogs do not make good pets"
      )
    ).toStrictEqual({
      figure: "AOO-1",

      majorPremise: "All friendly animals make good pets",

      minorPremise: "Some dogs are not friendly animals",

      majorTerm: "make good pets",

      minorTerm: "dogs",

      middleTerm: "friendly animals",
    });
  });

  test("AEE-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "No dogs are cats",
        "All cats need food",
        "Therefore, no dogs need food"
      )
    ).toStrictEqual({
      figure: "AEE-1",

      majorPremise: "All cats need food",

      minorPremise: "No dogs are cats",

      majorTerm: "food",

      minorTerm: "dogs",

      middleTerm: "cats",
    });
  });

  test("OAO-1 -test 2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All actors are artists",
        "Some artists are not famous",
        "Therefore, some actors are not famous"
      )
    ).toStrictEqual({
      figure: "OAO-1",

      majorPremise: "Some artists are not famous",

      minorPremise: "All actors are artists",

      majorTerm: "famous",

      minorTerm: "actors",

      middleTerm: "artists",
    });
  });

  test("AII-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "Some politicians are honest",
        "All honest people are respected",
        "Therefore, some politicians are respected"
      )
    ).toStrictEqual({
      figure: "AII-1",

      majorPremise: "All honest people are respected",

      minorPremise: "Some politicians are honest",

      majorTerm: "respected",

      minorTerm: "politicians",

      middleTerm: "honest",
    });
  });

  test("null test", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "is there a meaning of life",
        "Is eternal recurrence terrifying",
        "what do we owe to each other"
      )
    ).toBeFalsy();
  });

  test("null test 2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "The sky is blue",
        "The cat is sleeping",
        "The book is on the table"
      )
    ).toBeFalsy();
  });

  test("null test 3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "John likes pizza",
        "Sarah studies hard",
        "We should exercise regularly"
      )
    ).toBeFalsy();
  });

  test("null test 4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "The moon is made of cheese",
        "Elephants can fly",
        "The sun rises in the west"
      )
    ).toBeFalsy();
  });
});

export {};
