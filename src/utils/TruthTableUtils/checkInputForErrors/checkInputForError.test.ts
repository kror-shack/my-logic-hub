import checkInputForErrors from "./checkInputForError";

describe("checkInputForErrors", () => {
  it("should return true for valid input", () => {
    const input = "p & q -> r";
    const result = checkInputForErrors(input);
    expect(result).toEqual(true);
  });

  it("should return an error message for negation without variable", () => {
    const input = "~ -> p";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Negation must be followed by a variable");
  });

  it("should return an error message for unmatched closing bracket", () => {
    const input = "p & q | r)";
    const result = checkInputForErrors(input);
    expect(result).toEqual(
      "Closing bracket ')' without matching opening bracket '('"
    );
  });

  it("should return an error message for invalid operator placement", () => {
    const input = "(p ->) q";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid placement of operator '->'");
  });

  it("should return an error message for unallowed element", () => {
    const input = "p # q";
    const result = checkInputForErrors(input);
    expect(result).toEqual("Invalid element '#' found in the input string");
  });
});

export {};
