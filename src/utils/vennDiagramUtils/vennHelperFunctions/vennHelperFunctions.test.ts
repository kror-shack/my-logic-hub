import { findPremise } from "./vennHelperFunctions";

describe("find premise", () => {
  test("first premise", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("mortal", "men", [premise1, premise2])).toEqual(
      premise1
    );
  });

  test("first premise -reverse", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("men", "mortal", [premise1, premise2])).toEqual(
      premise1
    );
  });

  test("second premise", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("man", "socrates", [premise1, premise2])).toEqual(
      premise2
    );
  });

  test("second premise -plural", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("men", "socrates", [premise1, premise2])).toEqual(
      premise2
    );
  });

  test("null test", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("man", "plato", [premise1, premise2])).toBeFalsy();
  });
});
