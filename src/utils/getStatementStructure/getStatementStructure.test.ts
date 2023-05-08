import getStatementStructure from "./getStatementStructure";

describe("A type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("All men are mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "A type",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("All birds have wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "A type",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("All planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "A type",
    });
  });

  test("singular subject", () => {
    expect(getStatementStructure("a cat is an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "A type",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("All cats are animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "A type",
    });
  });

  test("singular predicate", () => {
    expect(getStatementStructure("That cat is an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "A type",
    });
  });

  test("singular subject and predicate", () => {
    expect(getStatementStructure("That cat is a mammal")).toStrictEqual({
      subject: "cat",
      predicate: "mammal",
      type: "A type",
    });
  });

  test("plural subject and predicate", () => {
    expect(getStatementStructure("All cats are mammals")).toStrictEqual({
      subject: "cats",
      predicate: "mammals",
      type: "A type",
    });
  });

  test("plural subject and singular predicate", () => {
    expect(getStatementStructure("All people are happy")).toStrictEqual({
      subject: "people",
      predicate: "happy",
      type: "A type",
    });
  });
});

describe("I type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("Some men are mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "I type",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("Some birds have wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "I type",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("Some planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "I type",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("Some cats are animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "I type",
    });
  });
});

describe("E type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("No men are immortal")).toStrictEqual({
      subject: "men",
      predicate: "immortal",
      type: "E type",
    });
  });

  test("contraction", () => {
    expect(getStatementStructure("socrates isn't immortal")).toStrictEqual({
      subject: "socrates",
      predicate: "immortal",
      type: "E type",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("No birds have no wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "E type",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("No planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "E type",
    });
  });

  test("singular subject", () => {
    expect(getStatementStructure("a cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E type",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("All cats are not animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "E type",
    });
  });

  test("singular predicate", () => {
    expect(getStatementStructure("That cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E type",
    });
  });

  test("singular subject and predicate", () => {
    expect(getStatementStructure("That cat is not a mammal")).toStrictEqual({
      subject: "cat",
      predicate: "mammal",
      type: "E type",
    });
  });

  test("plural subject and predicate", () => {
    expect(getStatementStructure("All cats are not mammals")).toStrictEqual({
      subject: "cats",
      predicate: "mammals",
      type: "E type",
    });
  });

  test("plural subject and singular predicate", () => {
    expect(getStatementStructure("All people are not happy")).toStrictEqual({
      subject: "people",
      predicate: "happy",
      type: "E type",
    });
  });
});

describe("O type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("Some men are not mortal")).toStrictEqual({
      subject: "men",
      predicate: "mortal",
      type: "O type",
    });
  });

  test("contraction", () => {
    expect(
      getStatementStructure("Some squares aren't rectangles")
    ).toStrictEqual({
      subject: "squares",
      predicate: "rectangles",
      type: "O type",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("Some birds do not have wings")).toStrictEqual(
      {
        subject: "birds",
        predicate: "have wings",
        type: "O type",
      }
    );
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("Some planets do not revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "revolve around the sun",
      type: "O type",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("Some cats are not animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "O type",
    });
  });
});

describe("E type Sentence", () => {
  test("assertive", () => {
    expect(getStatementStructure("No men are immortal")).toStrictEqual({
      subject: "men",
      predicate: "immortal",
      type: "E type",
    });
  });

  test("contraction", () => {
    expect(getStatementStructure("socrates isn't immortal")).toStrictEqual({
      subject: "socrates",
      predicate: "immortal",
      type: "E type",
    });
  });

  test("assertive possesive", () => {
    expect(getStatementStructure("No birds have no wings")).toStrictEqual({
      subject: "birds",
      predicate: "wings",
      type: "E type",
    });
  });

  test("assertive action", () => {
    expect(
      getStatementStructure("No planets revolve around the sun")
    ).toStrictEqual({
      subject: "planets",
      predicate: "around the sun",
      type: "E type",
    });
  });

  test("singular subject", () => {
    expect(getStatementStructure("a cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E type",
    });
  });

  test("plural subject", () => {
    expect(getStatementStructure("All cats are not animals")).toStrictEqual({
      subject: "cats",
      predicate: "animals",
      type: "E type",
    });
  });

  test("singular predicate", () => {
    expect(getStatementStructure("That cat is not an animal")).toStrictEqual({
      subject: "cat",
      predicate: "animal",
      type: "E type",
    });
  });

  test("singular subject and predicate", () => {
    expect(getStatementStructure("That cat is not a mammal")).toStrictEqual({
      subject: "cat",
      predicate: "mammal",
      type: "E type",
    });
  });

  test("plural subject and predicate", () => {
    expect(getStatementStructure("All cats are not mammals")).toStrictEqual({
      subject: "cats",
      predicate: "mammals",
      type: "E type",
    });
  });

  test("plural subject and singular predicate", () => {
    expect(getStatementStructure("All people are not happy")).toStrictEqual({
      subject: "people",
      predicate: "happy",
      type: "E type",
    });
  });
});
