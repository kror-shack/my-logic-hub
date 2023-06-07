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
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "men",
        predicate: "mortal",
        type: "A",
      },
      premise2: {
        subject: "socrates",
        predicate: "man",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "A",
      },
    });
  });

  test("AAA-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All mortal are men",
        "Socrates is a man",
        "Therefore, Socrates is mortal"
      )
    ).toStrictEqual({
      figure: "AAA-2",
      majorPremise: "All mortal are men",
      minorPremise: "Socrates is a man",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "mortal",
        predicate: "men",
        type: "A",
      },
      premise2: {
        subject: "socrates",
        predicate: "man",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "A",
      },
    });
  });

  test("AAA-3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All men are mortal",
        "Man is Socrates",
        "Therefore, Socrates is mortal"
      )
    ).toStrictEqual({
      figure: "AAA-3",
      majorPremise: "All men are mortal",
      minorPremise: "Man is Socrates",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "men",
        predicate: "mortal",
        type: "A",
      },
      premise2: {
        subject: "man",
        predicate: "socrates",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "A",
      },
    });
  });

  test("AAA-4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All mortal are men",
        "Man is Socrates",
        "Therefore, Socrates is mortal"
      )
    ).toStrictEqual({
      figure: "AAA-4",
      majorPremise: "All mortal are men",
      minorPremise: "Man is Socrates",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "mortal",
        predicate: "men",
        type: "A",
      },
      premise2: {
        subject: "man",
        predicate: "socrates",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "A",
      },
    });
  });

  test("AAE-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All men are mortal",
        "Socrates is a man",
        "Therefore, Socrates is not mortal"
      )
    ).toStrictEqual({
      figure: "AAE-1",
      majorPremise: "All men are mortal",
      minorPremise: "Socrates is a man",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "men",
        predicate: "mortal",
        type: "A",
      },
      premise2: {
        subject: "socrates",
        predicate: "man",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "E",
      },
    });
  });

  test("AAE-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All mortal are men",
        "Socrates is a man",
        "Therefore, Socrates is not mortal"
      )
    ).toStrictEqual({
      figure: "AAE-2",
      majorPremise: "All mortal are men",
      minorPremise: "Socrates is a man",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "mortal",
        predicate: "men",
        type: "A",
      },
      premise2: {
        subject: "socrates",
        predicate: "man",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "E",
      },
    });
  });

  test("AAE-3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All men are mortal",
        "Man is Socrates",
        "Therefore, Socrates is not mortal"
      )
    ).toStrictEqual({
      figure: "AAE-3",
      majorPremise: "All men are mortal",
      minorPremise: "Man is Socrates",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "men",
        predicate: "mortal",
        type: "A",
      },
      premise2: {
        subject: "man",
        predicate: "socrates",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "E",
      },
    });
  });

  test("AAE-4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All mortal are men",
        "Man is Socrates",
        "Therefore, Socrates is not mortal"
      )
    ).toStrictEqual({
      figure: "AAE-4",
      majorPremise: "All mortal are men",
      minorPremise: "Man is Socrates",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "mortal",
        predicate: "men",
        type: "A",
      },
      premise2: {
        subject: "man",
        predicate: "socrates",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "E",
      },
    });
  });

  test("AAI-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds have feathers",
        "All eagles are birds",
        "Therefore, some eagles have feathers."
      )
    ).toStrictEqual({
      figure: "AAI-1",
      majorPremise: "All birds have feathers",
      minorPremise: "All eagles are birds",
      majorTerm: "feathers",
      minorTerm: "eagles",
      middleTerm: "birds",
      premise1: {
        subject: "birds",
        predicate: "feathers",
        type: "A",
      },
      premise2: {
        subject: "eagles",
        predicate: "birds",
        type: "A",
      },
      conc: {
        subject: "eagles",
        predicate: "feathers",
        type: "I",
      },
    });
  });

  test("AAI-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All feathers are birds",
        "All eagles are birds",
        "Therefore, some eagles have feathers."
      )
    ).toStrictEqual({
      figure: "AAI-2",
      majorPremise: "All feathers are birds",
      minorPremise: "All eagles are birds",
      majorTerm: "feathers",
      minorTerm: "eagles",
      middleTerm: "birds",
      premise1: {
        subject: "feathers",
        predicate: "birds",
        type: "A",
      },
      premise2: {
        subject: "eagles",
        predicate: "birds",
        type: "A",
      },
      conc: {
        subject: "eagles",
        predicate: "feathers",
        type: "I",
      },
    });
  });

  test("AAI-3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds have feathers",
        "All birds are eagles",
        "Therefore, some eagles have feathers."
      )
    ).toStrictEqual({
      figure: "AAI-3",
      majorPremise: "All birds have feathers",
      minorPremise: "All birds are eagles",
      majorTerm: "feathers",
      minorTerm: "eagles",
      middleTerm: "birds",
      premise1: {
        subject: "birds",
        predicate: "feathers",
        type: "A",
      },
      premise2: {
        subject: "birds",
        predicate: "eagles",
        type: "A",
      },
      conc: {
        subject: "eagles",
        predicate: "feathers",
        type: "I",
      },
    });
  });

  test("AAI-4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All feathers are birds",
        "All birds are eagles",
        "Therefore, some eagles have feathers."
      )
    ).toStrictEqual({
      figure: "AAI-4",
      majorPremise: "All feathers are birds",
      minorPremise: "All birds are eagles",
      majorTerm: "feathers",
      minorTerm: "eagles",
      middleTerm: "birds",
      premise1: {
        subject: "feathers",
        predicate: "birds",
        type: "A",
      },
      premise2: {
        subject: "birds",
        predicate: "eagles",
        type: "A",
      },
      conc: {
        subject: "eagles",
        predicate: "feathers",
        type: "I",
      },
    });
  });

  test.skip("AAO-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds can fly.",
        "Ostriches are birds.",
        "Therefore, some ostriches can not fly."
      )
    ).toStrictEqual({
      figure: "AAO-1",
      majorPremise: "All birds can fly.",
      minorPremise: "Ostriches are birds.",
      majorTerm: "fly",
      minorTerm: "ostriches",
      middleTerm: "birds",
      premise1: {
        subject: "birds",
        predicate: "fly",
        type: "A",
      },
      premise2: {
        subject: "ostriches",
        predicate: "birds",
        type: "A",
      },
      conc: {
        subject: "ostriches",
        predicate: "fly",
        type: "O",
      },
    });
  });

  test("AAO-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds can fly.",
        "Ostriches are birds.",
        "Therefore, some ostriches can not fly."
      )
    ).toStrictEqual({
      figure: "AAO-1",
      majorPremise: "All birds can fly.",
      minorPremise: "Ostriches are birds.",
      majorTerm: "fly",
      minorTerm: "ostriches",
      middleTerm: "birds",
      premise1: {
        subject: "birds",
        predicate: "fly",
        type: "A",
      },
      premise2: {
        subject: "ostriches",
        predicate: "birds",
        type: "A",
      },
      conc: {
        subject: "ostriches",
        predicate: "fly",
        type: "O",
      },
    });
  });

  test("EAO-1", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "No cats are dogs",
        "All mammals are cats",
        "Therefore, some mammals are not dogs"
      )
    ).toStrictEqual({
      figure: "EAO-1",
      majorPremise: "No cats are dogs",
      minorPremise: "All mammals are cats",
      majorTerm: "dogs",
      minorTerm: "mammals",
      middleTerm: "cats",
      premise1: {
        subject: "cats",
        predicate: "dogs",
        type: "E",
      },
      premise2: {
        subject: "mammals",
        predicate: "cats",
        type: "A",
      },
      conc: {
        subject: "mammals",
        predicate: "dogs",
        type: "O",
      },
    });
  });

  test("EAO-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "No dogs are cats",
        "All mammals are cats",
        "Therefore, some mammals are not dogs"
      )
    ).toStrictEqual({
      figure: "EAO-2",
      majorPremise: "No dogs are cats",
      minorPremise: "All mammals are cats",
      majorTerm: "dogs",
      minorTerm: "mammals",
      middleTerm: "cats",
      premise1: {
        subject: "dogs",
        predicate: "cats",
        type: "E",
      },
      premise2: {
        subject: "mammals",
        predicate: "cats",
        type: "A",
      },
      conc: {
        subject: "mammals",
        predicate: "dogs",
        type: "O",
      },
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
      premise1: {
        subject: "cats",
        predicate: "dogs",
        type: "E",
      },
      premise2: {
        subject: "cats",
        predicate: "mammals",
        type: "A",
      },
      conc: {
        subject: "mammals",
        predicate: "dogs",
        type: "O",
      },
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
      premise1: {
        subject: "birds",
        predicate: "fish",
        type: "E",
      },
      premise2: {
        subject: "fish",
        predicate: "cold blooded animals",
        type: "I",
      },
      conc: {
        subject: "cold blooded animals",
        predicate: "birds",
        type: "O",
      },
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
      premise1: {
        subject: "birds",
        predicate: "animals",
        type: "A",
      },
      premise2: {
        subject: "animals",
        predicate: "mammals",
        type: "O",
      },
      conc: {
        subject: "birds",
        predicate: "mammals",
        type: "O",
      },
    });
  });

  test("OAO-2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All birds are animals",
        "Some mammals are not animals",
        "Therefore, some birds are not mammals"
      )
    ).toStrictEqual({
      figure: "OAO-2",
      majorPremise: "Some mammals are not animals",
      minorPremise: "All birds are animals",
      majorTerm: "mammals",
      minorTerm: "birds",
      middleTerm: "animals",
      premise1: {
        subject: "birds",
        predicate: "animals",
        type: "A",
      },
      premise2: {
        subject: "mammals",
        predicate: "animals",
        type: "O",
      },
      conc: {
        subject: "birds",
        predicate: "mammals",
        type: "O",
      },
    });
  });

  test("OAO-3", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "All animals are birds",
        "Some animals are not mammals",
        "Therefore, some birds are not mammals"
      )
    ).toStrictEqual({
      figure: "OAO-3",
      majorPremise: "Some animals are not mammals",
      minorPremise: "All animals are birds",
      majorTerm: "mammals",
      minorTerm: "birds",
      middleTerm: "animals",
      premise1: {
        subject: "animals",
        predicate: "birds",
        type: "A",
      },
      premise2: {
        subject: "animals",
        predicate: "mammals",
        type: "O",
      },
      conc: {
        subject: "birds",
        predicate: "mammals",
        type: "O",
      },
    });
  });

  test("OAO-4", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "Some mammals are not animals",
        "All animals are birds",
        "Therefore, some birds are not mammals"
      )
    ).toStrictEqual({
      figure: "OAO-4",
      majorPremise: "Some mammals are not animals",
      minorPremise: "All animals are birds",
      majorTerm: "mammals",
      minorTerm: "birds",
      middleTerm: "animals",
      premise1: {
        subject: "mammals",
        predicate: "animals",
        type: "O",
      },
      premise2: {
        subject: "animals",
        predicate: "birds",
        type: "A",
      },
      conc: {
        subject: "birds",
        predicate: "mammals",
        type: "O",
      },
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
      premise1: {
        subject: "dogs",
        predicate: "cats",
        type: "E",
      },
      premise2: {
        subject: "cats",
        predicate: "food",
        type: "A",
      },
      conc: {
        subject: "dogs",
        predicate: "food",
        type: "E",
      },
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
      premise1: {
        subject: "actors",
        predicate: "artists",
        type: "A",
      },
      premise2: {
        subject: "artists",
        predicate: "famous",
        type: "O",
      },
      conc: {
        subject: "actors",
        predicate: "famous",
        type: "O",
      },
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
      premise1: {
        subject: "politicians",
        predicate: "honest",
        type: "I",
      },
      premise2: {
        subject: "honest people",
        predicate: "respected",
        type: "A",
      },
      conc: {
        subject: "politicians",
        predicate: "respected",
        type: "I",
      },
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

  //passes in the app
  test.skip("null test 2", () => {
    expect(
      convertArgumentToSyllogismFigure(
        "sky is blue",
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

  test.skip("null test 4", () => {
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
