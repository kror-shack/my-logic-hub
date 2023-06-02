import {
  expandContractions,
  getVerb,
  checkForNegation,
  convertSentenceToArray,
  getWordIndex,
  getSubject,
  removeNegation,
  removeQuantifier,
  checkForExistentialQuantifier,
  getPredicate,
} from "./gssHelperFunctions";

describe("expandContractions", () => {
  test("aren't", () => {
    expect(expandContractions("No squares aren't rectangles")).toBe(
      "No squares are not rectangles"
    );
  });

  test("isn't", () => {
    expect(expandContractions("A cat isn't a dog")).toBe("A cat is not a dog");
  });

  test("don't", () => {
    expect(expandContractions("All men don't pay taxes")).toBe(
      "All men do not pay taxes"
    );
  });

  test("null test", () => {
    expect(expandContractions("It is a good apple")).toBe("It is a good apple");
  });
});
describe("getVerb", () => {
  test("type A: All S are P", () => {
    expect(getVerb("All men are mortal")).toEqual(["are"]);
    expect(getVerb("All cats are animals")).toEqual(["are"]);
    expect(getVerb("All birds can fly")).toEqual(["can"]);
    expect(getVerb("all squares are rectangles")).toEqual(["are"]);
  });

  test("type E: No S are P", () => {
    expect(getVerb("No dogs are cats")).toEqual(["are"]);
    expect(getVerb("No planets are stars")).toEqual(["are"]);
    expect(getVerb("No insects have fur")).toEqual(["have"]);
    expect(getVerb("Socrates is not immortal")).toEqual(["is"]);
  });

  test("type I: Some S are P", () => {
    expect(getVerb("Some birds can swim")).toEqual(["can"]);
    expect(getVerb("Some trees are evergreen")).toEqual(["are"]);
    expect(getVerb("Some people enjoy spicy food")).toEqual(["enjoy"]);
  });

  test("type O: Some S are not P", () => {
    expect(getVerb("Some birds are not flightless")).toEqual(["are"]);
    expect(getVerb("Some fruits are not sweet")).toEqual(["are"]);
    expect(getVerb("Some movies are not worth watching")).toEqual(["are"]);
    expect(getVerb("Some planets do not revolve around the sun")).toEqual([
      "do",
    ]);
  });
});

describe("checkForNegation", () => {
  test("type A: All S are P", () => {
    expect(checkForNegation("All men are mortal")).toBe(false);
    expect(checkForNegation("All cats are animals")).toBe(false);
    expect(checkForNegation("All birds can fly")).toBe(false);
  });

  test("type E: No S are P", () => {
    expect(checkForNegation("No dogs are cats")).toBe(true);
    expect(checkForNegation("No planets are stars")).toBe(true);
    expect(checkForNegation("No insects have fur")).toBe(true);
  });

  test("type I: Some S are P", () => {
    expect(checkForNegation("Some birds can swim")).toBe(false);
    expect(checkForNegation("Some trees are evergreen")).toBe(false);
    expect(checkForNegation("Some people enjoy spicy food")).toBe(false);
  });

  test("type O: Some S are not P", () => {
    expect(checkForNegation("Some birds are not flightless")).toBe(true);
    expect(checkForNegation("Some fruits are not sweet")).toBe(true);
    expect(checkForNegation("Some movies are not worth watching")).toBe(true);
  });
});

describe("convertSentenceToArray", () => {
  test("type A: All S are P", () => {
    expect(convertSentenceToArray("All men are mortal")).toEqual([
      "All",
      "men",
      "are",
      "mortal",
    ]);
    expect(convertSentenceToArray("All cats are animals")).toEqual([
      "All",
      "cats",
      "are",
      "animals",
    ]);
  });

  test("type E: No S are P", () => {
    expect(convertSentenceToArray("No dogs are cats")).toEqual([
      "No",
      "dogs",
      "are",
      "cats",
    ]);
    expect(convertSentenceToArray("No birds are fish")).toEqual([
      "No",
      "birds",
      "are",
      "fish",
    ]);
  });

  test("type I: Some S are P", () => {
    expect(convertSentenceToArray("Some cars are red")).toEqual([
      "Some",
      "cars",
      "are",
      "red",
    ]);
    expect(convertSentenceToArray("Some birds can fly")).toEqual([
      "Some",
      "birds",
      "can",
      "fly",
    ]);
  });

  test("type O: Some S are not P", () => {
    expect(convertSentenceToArray("Some dogs are not friendly")).toEqual([
      "Some",
      "dogs",
      "are",
      "not",
      "friendly",
    ]);
    expect(convertSentenceToArray("Some birds cannot fly")).toEqual([
      "Some",
      "birds",
      "cannot",
      "fly",
    ]);
  });
});

describe("getWordIndex", () => {
  test("type A: All S are P", () => {
    expect(getWordIndex(["All"], ["All", "men", "are", "mortal"])).toEqual([
      0, 0,
    ]);
    expect(getWordIndex(["men"], ["All", "men", "are", "mortal"])).toEqual([
      1, 1,
    ]);
    expect(getWordIndex(["are"], ["All", "men", "are", "mortal"])).toEqual([
      2, 2,
    ]);
    expect(getWordIndex(["mortal"], ["All", "men", "are", "mortal"])).toEqual([
      3, 3,
    ]);
  });

  test("type E: No S are P", () => {
    expect(getWordIndex(["No"], ["No", "men", "are", "mortal"])).toEqual([
      0, 0,
    ]);
    expect(getWordIndex(["men"], ["No", "men", "are", "mortal"])).toEqual([
      1, 1,
    ]);
    expect(getWordIndex(["are"], ["No", "men", "are", "mortal"])).toEqual([
      2, 2,
    ]);
    expect(getWordIndex(["mortal"], ["No", "men", "are", "mortal"])).toEqual([
      3, 3,
    ]);
  });

  test("type I: Some S are P", () => {
    expect(getWordIndex(["Some"], ["Some", "men", "are", "mortal"])).toEqual([
      0, 0,
    ]);
    expect(getWordIndex(["men"], ["Some", "men", "are", "mortal"])).toEqual([
      1, 1,
    ]);
    expect(getWordIndex(["are"], ["Some", "men", "are", "mortal"])).toEqual([
      2, 2,
    ]);
    expect(getWordIndex(["mortal"], ["Some", "men", "are", "mortal"])).toEqual([
      3, 3,
    ]);
  });

  test("type O: Some S are not P", () => {
    expect(
      getWordIndex(["Some"], ["Some", "men", "are", "not", "mortal"])
    ).toEqual([0, 0]);
    expect(
      getWordIndex(["men"], ["Some", "men", "are", "not", "mortal"])
    ).toEqual([1, 1]);
    expect(
      getWordIndex(["are"], ["Some", "men", "are", "not", "mortal"])
    ).toEqual([2, 2]);
    expect(
      getWordIndex(["not"], ["Some", "men", "are", "not", "mortal"])
    ).toEqual([3, 3]);
    expect(
      getWordIndex(["mortal"], ["Some", "men", "are", "not", "mortal"])
    ).toEqual([4, 4]);
  });
});

describe("getSubject", () => {
  test("type A: All S are P", () => {
    expect(getSubject(["All", "men", "are", "mortal"], 2)).toEqual("All men");
    expect(getSubject(["All", "cats", "are", "animals"], 2)).toEqual(
      "All cats"
    );
    expect(getSubject(["All", "birds", "can", "fly"], 2)).toEqual("All birds");
    expect(getSubject(["All", "dogs", "chase", "cats"], 2)).toEqual("All dogs");
    expect(getSubject(["No", "square", "are", "not", "rectangles"], 2)).toBe(
      "No square"
    );
  });

  test("type E: No S are P", () => {
    expect(getSubject(["No", "men", "are", "immortal"], 2)).toEqual("No men");
    expect(getSubject(["No", "cats", "are", "dogs"], 2)).toEqual("No cats");
    expect(getSubject(["No", "birds", "can", "swim"], 2)).toEqual("No birds");
    expect(getSubject(["No", "dogs", "like", "cats"], 2)).toEqual("No dogs");
  });

  test("type I: Some S are P", () => {
    expect(getSubject(["Some", "men", "are", "mortal"], 2)).toEqual("Some men");
    expect(getSubject(["Some", "cats", "are", "animals"], 2)).toEqual(
      "Some cats"
    );
    expect(getSubject(["Some", "birds", "can", "fly"], 2)).toEqual(
      "Some birds"
    );
    expect(getSubject(["Some", "dogs", "chase", "cats"], 2)).toEqual(
      "Some dogs"
    );
  });

  test("type O: Some S are not P", () => {
    expect(getSubject(["Some", "men", "are", "not", "immortal"], 2)).toEqual(
      "Some men"
    );
    expect(getSubject(["Some", "cats", "are", "not", "dogs"], 2)).toEqual(
      "Some cats"
    );
    expect(getSubject(["Some", "birds", "can", "not", "swim"], 2)).toEqual(
      "Some birds"
    );
    expect(getSubject(["Some", "dogs", "like", "not", "cats"], 2)).toEqual(
      "Some dogs"
    );
  });

  test("complex subjects", () => {
    expect(
      getSubject(["All", "men", "and", "women", "are", "mortal"], 4)
    ).toEqual("All men and women");
    expect(getSubject(["No", "cats", "or", "dogs", "are", "birds"], 4)).toEqual(
      "No cats or dogs"
    );
    expect(
      getSubject(["Some", "birds,", "like", "eagles,", "can", "fly"], 4)
    ).toEqual("Some birds, like eagles,");
  });

  test("singular and plural subjects", () => {
    expect(getSubject(["All", "men", "are", "mortal"], 2)).toEqual("All men");
    expect(
      getSubject(
        ["All", "personnel", "are", "required", "to", "wear", "uniforms"],
        2
      )
    ).toEqual("All personnel");
  });
});

describe("getPredicate", () => {
  test("type A: All S are P", () => {
    expect(getPredicate(["All", "men", "are", "mortal"], 2)).toEqual("mortal");
    expect(getPredicate(["All", "cats", "are", "animals"], 2)).toEqual(
      "animals"
    );
    expect(getPredicate(["All", "birds", "can", "fly"], 2)).toEqual("fly");
    expect(getPredicate(["All", "dogs", "chase", "cats"], 2)).toEqual("cats");
    expect(getPredicate(["No", "square", "are", "not", "rectangles"], 2)).toBe(
      "not rectangles"
    );
  });

  test("type E: No S are P", () => {
    expect(getPredicate(["No", "men", "are", "immortal"], 2)).toEqual(
      "immortal"
    );
    expect(getPredicate(["No", "cats", "are", "dogs"], 2)).toEqual("dogs");
    expect(getPredicate(["No", "birds", "can", "swim"], 2)).toEqual("swim");
    expect(getPredicate(["No", "dogs", "like", "cats"], 2)).toEqual("cats");
  });

  test("type I: Some S are P", () => {
    expect(getPredicate(["Some", "men", "are", "mortal"], 2)).toEqual("mortal");
    expect(getPredicate(["Some", "cats", "are", "animals"], 2)).toEqual(
      "animals"
    );
    expect(getPredicate(["Some", "birds", "can", "fly"], 2)).toEqual("fly");
    expect(getPredicate(["Some", "dogs", "chase", "cats"], 2)).toEqual("cats");
  });

  test("type O: Some S are not P", () => {
    expect(getPredicate(["Some", "men", "are", "not", "immortal"], 2)).toEqual(
      "not immortal"
    );
    expect(getPredicate(["Some", "cats", "are", "not", "dogs"], 2)).toEqual(
      "not dogs"
    );
    expect(getPredicate(["Some", "birds", "can", "not", "swim"], 2)).toEqual(
      "not swim"
    );
    expect(getPredicate(["Some", "dogs", "like", "not", "cats"], 2)).toEqual(
      "not cats"
    );
  });

  test("complex predicates", () => {
    expect(
      getPredicate(["All", "men", "and", "women", "are", "mortal"], 4)
    ).toEqual("mortal");
    expect(
      getPredicate(["No", "cats", "or", "dogs", "are", "birds"], 4)
    ).toEqual("birds");
    expect(
      getPredicate(["Some", "birds,", "like", "eagles,", "can", "fly"], 4)
    ).toEqual("fly");
  });

  test("singular and plural predicates", () => {
    expect(getPredicate(["All", "men", "are", "mortal"], 2)).toEqual("mortal");
    expect(
      getPredicate(
        ["All", "personnel", "are", "required", "to", "wear", "uniforms"],
        2
      )
    ).toEqual("required to wear uniforms");
  });
});

describe("removeNegation", () => {
  test("removes 'not' from the beginning of the sentence", () => {
    expect(removeNegation("not good")).toBe("good");
  });

  test("ignores negations in the middle of the sentence", () => {
    expect(removeNegation("very not good")).toBe("very not good");
  });

  test("ignores negations at the end of the sentence", () => {
    expect(removeNegation("good not")).toBe("good not");
  });

  test("returns the original string if it doesn't start with 'not'", () => {
    expect(removeNegation("good")).toBe("good");
  });

  test("works with mixed case", () => {
    expect(removeNegation("NoT good")).toBe("good");
  });

  test("works with multiple negations at the beginning", () => {
    expect(removeNegation("not not good")).toBe("not good");
  });

  test("works with empty string", () => {
    expect(removeNegation("")).toBe("");
  });
});

describe("removeQuantifier", () => {
  test("removes 'all' quantifier", () => {
    expect(removeQuantifier("all men are mortal")).toBe("men are mortal");
  });
  test("removes 'a' quantifier", () => {
    expect(removeQuantifier("a cat is an animal")).toBe("cat is an animal");
  });

  test("removes 'an' quantifier", () => {
    expect(removeQuantifier("an apple a day keeps the doctor away")).toBe(
      "apple a day keeps the doctor away"
    );
  });

  test("removes 'some' quantifier", () => {
    expect(removeQuantifier("some birds can fly")).toBe("birds can fly");
  });

  test("removes 'none' quantifier", () => {
    expect(removeQuantifier("none of the children can swim")).toBe(
      "of the children can swim"
    );
  });

  test("removes 'no' quantifier", () => {
    expect(removeQuantifier("no dogs are black")).toBe("dogs are black");
  });

  test("removes 'few' quantifier", () => {
    expect(removeQuantifier("few people are billionaires")).toBe(
      "people are billionaires"
    );
  });

  test("removes 'that' quantifier", () => {
    expect(removeQuantifier("that cat will come")).toBe("cat will come");
  });

  test("does not remove quantifier if not at the start of sentence", () => {
    expect(removeQuantifier("men are mortal, all of them")).toBe(
      "men are mortal, all of them"
    );
  });

  test("removes quantifier if negation is before it", () => {
    expect(removeQuantifier("not all men are mortal")).toBe("men are mortal");
  });
});

describe("checkForExistentialQuantifier", () => {
  test("should return true if statement contains 'some'", () => {
    const statement = "Some cats are black.";
    expect(checkForExistentialQuantifier(statement)).toBe(true);
  });

  test("should return true if statement contains 'few'", () => {
    const statement = "Few students passed the exam.";
    expect(checkForExistentialQuantifier(statement)).toBe(true);
  });

  test("should return false if statement doesn't contain any existential quantifier", () => {
    const statement = "All birds can fly.";
    expect(checkForExistentialQuantifier(statement)).toBe(false);
  });

  test("should return true if statement contains 'some' in uppercase", () => {
    const statement = "SOME people are afraid of heights.";
    expect(checkForExistentialQuantifier(statement)).toBe(true);
  });

  test("should return true if statement contains 'few' in lowercase", () => {
    const statement = "I have few friends.";
    expect(checkForExistentialQuantifier(statement)).toBe(true);
  });

  test("should return true if statement contains 'some' and 'few'", () => {
    const statement = "Some cats are black, but few dogs are.";
    expect(checkForExistentialQuantifier(statement)).toBe(true);
  });
});

export {};
