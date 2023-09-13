import checkQLInputForErrors from "./checkQLInputForErrors";

describe("checkQLInputForErrors", () => {
  it("should not allow variables with parantheses", () => {
    const input = "\u2203(x)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The quantifier and its variable must exist side by side"
    );
  });

  it("should not allow predicates within quantifier scope", () => {
    const input = "\u2203Px(p)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Predicates cannot exist as variables within quantifiers"
    );
  });

  it("should not allow quantifiers within quantifier scope", () => {
    const input = "\u2203\u2200p";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Quantifiers cannot exist as variables within quantifiers"
    );
  });

  it("should not allow two predicates side by side", () => {
    const input = "PPx -> Qr";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The predicates P and P must contain an operator between them. Uppercase alphabets are treated as predicates whereas lowercase letters are treated as consants, and variables."
    );
  });

  it("should not allow two variables for a quantifier", () => {
    const input = "\u2203xp";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider using different quantifiers for different variables. Eg:- \u2200x \u2200y instead of \u2200xy"
    );
  });

  it("should only allow for quantifier scoped within brackets", () => {
    const input = "\u2203xPx";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider enclosing the scope of the quantifier within parantheses i.e. ∃x(Px)"
    );
  });
  it("should throw error for more than two quantified variables", () => {
    const input = "\u2203x(Pxffffff)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The current model supports only upto binary predicates. Work is currently being done to expand the scope."
    );
  });
  it("should throw error for more than two quantified variables -2", () => {
    const input = "∃x(Px ∧ ∀y(Py -> Axyz))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "The current model supports only upto binary predicates. Work is currently being done to expand the scope."
    );
  });
  it("should throw error for incorrect operator placement", () => {
    const input = "(Qx ->";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Operator '->' cannot be at the start or end of the string"
    );
  });
  it("should throw error for numbers", () => {
    const input = "∃x(Px ∧ ∀y(Py -> Axy2))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid element '2' found in the input string.");
  });
  it("should throw error for operator within a predicate argument", () => {
    const input = "∃x(Px ∧ ∀y(P& -> Axy2))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid placement of operator '∧'");
  });
  it("should throw error for invalid placement", () => {
    const input = "∃x ( Px ∧ Axg )f";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid placement of predicate 'f'");
  });
  it("should throw error for a quantiifer without a variable", () => {
    const input = "∃x ( Px ∧ Axg ) -> \u2200";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("The quantifier ∀ must bind a variable");
  });
  it("should throw error for invalid quantifier placement", () => {
    const input = "∃x ( Px ∧ Axg ) \u2200x";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual("Invalid placement of ∀");
  });
  it("should throw error not enclosing quantified predicates within brackets", () => {
    const input = "∀xF";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider enclosing the scope of the quantifier within parantheses e.g. ∃x(Px)"
    );
  });
  it("should throw error not enclosing quantified predicates within brackets -2", () => {
    const input = "∀xFx";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(
      "Please consider enclosing the scope of the quantifier within parantheses i.e. ∀x(Fx)"
    );
  });
});

describe("should allow correct wffs", () => {
  it("test 1", () => {
    const input = "∃x(Px ∧ ∀y(Py -> Axy))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 2", () => {
    const input = "\u2203x (Px & Lx)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 3", () => {
    const input = "\u2200x(Hx->(Ex&Dx))";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 4", () => {
    const input = "\u2200x(Hx&Sx)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 5", () => {
    const input = "\u2200x \u2200y((Axg & Agy) -> Axy)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 6", () => {
    const input = "\u2203x (Cx -> ~Bx )";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 7", () => {
    const input = "\u2200x \u2200y((Axg & Agy) -> Axy)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
  it("test 8", () => {
    const input = "\u2200x(Px)";
    const result = checkQLInputForErrors(input);
    expect(result).toEqual(false);
  });
});

export {};
