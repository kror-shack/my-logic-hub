import checkVennInputForErrors from "./checkVennInputForErrors";

describe("checkVennInputForErrors", () => {
  test("should throw error for more than 3 terms", () => {
    const premiseOne = "All men are mortal";
    const premiseTwo = "Socrates is a philospher";
    const conc = "Therefore socrates is mortal";

    expect(checkVennInputForErrors([premiseOne, premiseTwo, conc])).toBe(
      "A valid standard-form categorical syllogism must contain exactly three terms, each of which is used in the same sense throughout the argument."
    );
  });
  test("Should not throw error if standard form", () => {
    const premiseOne = "All men are mortal";
    const premiseTwo = "Socrates is a man";
    const conc = "Therefore socrates is mortal";

    expect(checkVennInputForErrors([premiseOne, premiseTwo, conc])).toBe(false);
  });
  test("Should throw error for less than 3 terms", () => {
    const premiseOne = "All men are mortal";
    const premiseTwo = "Mortal are man";
    const conc = "Therefore men are mortal";

    expect(checkVennInputForErrors([premiseOne, premiseTwo, conc])).toBe(
      "A valid standard-form categorical syllogism must contain exactly three terms, each of which is used in the same sense throughout the argument."
    );
  });
  test("Should throw error for no verb", () => {
    const premiseOne = "All men mortal";
    const premiseTwo = "Mortal are man";
    const conc = "Therefore men are mortal";

    expect(checkVennInputForErrors([premiseOne, premiseTwo, conc])).toBe(
      "The first premise is missing a verb."
    );
  });
});

export {};
