import formatOutput from "./formatOutput";

describe("formatOutput", () => {
  it("should add spaces after each element", () => {
    const input = "(p|s)&(q|r)|q";
    const expected = "( p ∨ s ) ∧ ( q ∨ r ) ∨ q";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });

  it('should preserve "->" without adding a space', () => {
    const input = "p -> q";
    const expected = "p -> q";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });

  it('should preserve "<->" without adding a space', () => {
    const input = "p <-> q";
    const expected = "p <-> q";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });

  it('should convert "&" to "∧"', () => {
    const input = "p & q";
    const expected = "p ∧ q";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });

  it('should convert "|" to "∧"', () => {
    const input = "p | q";
    const expected = "p ∨ q";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });

  it("should handle complex expression", () => {
    const input = "(p|q)&(r|s) -> (t|u)";
    const expected = "( p ∨ q ) ∧ ( r ∨ s ) -> ( t ∨ u )";
    const result = formatOutput(input);
    expect(result).toEqual(expected);
  });
});

export {};
