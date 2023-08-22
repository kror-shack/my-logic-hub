import { checkForWordInString } from "./gstHelperFunctions";

describe("checkForWordInString", () => {
  test("exact word match", () => {
    expect(checkForWordInString("men", "men")).toBe(true);
    expect(checkForWordInString("no", "No")).toBe(true);
    expect(checkForWordInString("animals", "animals")).toBe(true);
    expect(checkForWordInString("some", "Some")).toBe(true);
  });

  test("no match", () => {
    expect(checkForWordInString("cat", "All dogs are loyal")).toBe(false);
    expect(checkForWordInString("horse", "Some birds can fly")).toBe(false);
    expect(checkForWordInString("no", "All men are mortal")).toBe(false);
    expect(checkForWordInString("not", "All dogs are loyal")).toBe(false);
    expect(checkForWordInString("some", "No cats or dogs are birds")).toBe(
      false
    );
  });

  test("singular to plural match", () => {
    expect(checkForWordInString("cat", "cats")).toBe(true);
    expect(checkForWordInString("horse", "Horses")).toBe(true);
    expect(checkForWordInString("man", "men")).toBe(true);
    expect(checkForWordInString("book", "books")).toBe(true);
    expect(checkForWordInString("dog", "dogs")).toBe(true);
    expect(checkForWordInString("baby", "babies")).toBe(true);
    expect(checkForWordInString("box", "boxes")).toBe(true);
    expect(checkForWordInString("boy", "boys")).toBe(true);
  });

  test("exact phrase match", () => {
    expect(checkForWordInString("the cat", "the cat")).toBe(true);
  });

  test("phrase containment match", () => {
    expect(checkForWordInString("the cat", "the cat who sings")).toBe(true);
  });

  test("no phrase match", () => {
    expect(checkForWordInString("the dog", "the cat who sings")).toBe(false);
    // expect(checkForWordInString("the cat", "the cat and dog")).toBe(true);
  });

  test("multiple word match", () => {
    expect(
      checkForWordInString(
        "college graduates",
        "great scientists college graduates"
      )
    ).toBe(true);
    // expect(checkForWordInString("the cat", "the cat and dog")).toBe(true);
  });
});

export {};
