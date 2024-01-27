import getStatementStructure from "./getStatementStructure";

describe("A type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("All men are mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "A",
    });
  });

  test("assertive conclusion", () => {
    expect(
      getStatementStructure("Therefore, socrates is mortal")
    ).toStrictEqual({
      subject: "socrates",
      predicate: "mortal",
      type: "A",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("All birds have wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "A",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("All planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "A",
    });
  });

  test("singular subject", () => {
    expect(getStatementStructure("a cat is an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "A",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("All cats are animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "A",
    });
  });

  test("singular predicate", () => {
    expect(getStatementStructure("That cat is an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "A",
    });
  });

  test("singular subject and predicate", () => {
    expect(getStatementStructure("That cat is a mammal")).toStrictEqual({
      subject: "cat",
      predicate: "mammal",
      type: "A",
    });
  });

  test("plural subject and predicate", () => {
    expect(getStatementStructure("All cats are mammals")).toStrictEqual({
      subject: "cats",
      predicate: "mammals",
      type: "A",
    });
  });

  test("plural subject and singular predicate", () => {
    expect(getStatementStructure("All people are happy")).toStrictEqual({
      subject: "people",
      predicate: "happy",
      type: "A",
    });
  });
});

describe("I type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("Some men are mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "I",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("Some birds have wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "I",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("Some planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "I",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("Some cats are animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "I",
    });
  });
});

describe("E type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("No men are immortal")).toStrictEqual({
      subject: "men",
      predicate: "immortal",
      type: "E",
    });
    expect(
      getStatementStructure(
        "No nuclear-powered submarines are commercial vessels"
      )
    ).toStrictEqual({
      subject: "nuclear powered submarines",
      predicate: "commercial vessels",
      type: "E",
    });
  });

  test("contraction", () => {
    expect(getStatementStructure("socrates isn't immortal")).toStrictEqual({
      subject: "socrates",
      predicate: "immortal",
      type: "E",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("No birds have no wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "E",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("No planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "E",
    });
  });

  test("singular subject", () => {
    expect(getStatementStructure("a cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("All cats are not animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "E",
    });
  });

  test("singular predicate", () => {
    expect(getStatementStructure("That cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E",
    });
  });

  test("singular subject and predicate", () => {
    expect(getStatementStructure("That cat is not a mammal")).toStrictEqual({
      subject: "cat",
      predicate: "mammal",
      type: "E",
    });
  });

  test("plural subject and predicate", () => {
    expect(getStatementStructure("All cats are not mammals")).toStrictEqual({
      subject: "cats",
      predicate: "mammals",
      type: "E",
    });
  });

  test("plural subject and singular predicate", () => {
    expect(getStatementStructure("All people are not happy")).toStrictEqual({
      subject: "people",
      predicate: "happy",
      type: "E",
    });
  });
});

describe("O type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("Some men are not mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "O",
    });
  });

  test("contraction", () => {
    expect(
      getStatementStructure("Some squares aren't rectangles")
    ).toStrictEqual({
      subject: "squares",
      predicate: "rectangles",
      type: "O",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("Some birds do not have wings")).toStrictEqual(
      {
        subject: "birds",
        predicate: "have wings",
        type: "O",
      }
    );
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("Some planets do not revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "revolve around the sun",
      type: "O",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("Some cats are not animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "O",
    });
  });
});
