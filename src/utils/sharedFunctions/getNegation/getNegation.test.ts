import getNegation from "./getNegation";

describe("getNegation", () => {
  it('should negate "p & q" to "~p|~q"', () => {
    expect(getNegation(["p", "&", "q"])).toEqual(["~p", "|", "~q"]);
  });

  it('should negate "p -> q" to "p&~q"', () => {
    expect(getNegation(["p", "->", "q"])).toEqual(["p", "&", "~q"]);
  });

  it.skip('should negate "~(p -> q) & r" to "p&~q&r"', () => {
    expect(getNegation(["~", "(", "p", "->", "q", ")", "&", "r"])).toEqual([
      "(",
      "p",
      "->",
      "q",
      ")",
      "|",
      "~r",
    ]);
  });

  it.skip('should negate "(p & q) -> (r | s)" to "p&q&~(r|s)"', () => {
    expect(
      getNegation(["(", "p", "&", "q", ")", "->", "(", "r", "|", "s", ")"])
    ).toEqual(["(", "p", "&", "q", ")", "&", "~", "(", "r", "|", "s", ")"]);
  });

  it('should negate "~p"', () => {
    expect(getNegation(["~p"])).toEqual(["p"]);
  });

  //   it('should negate "(p & q) -> ~(r | s)" to "p&q&(r|s)"', () => {
  //     expect(getNegation("(p & q) -> ~(r | s)")).toEqual("p&q&(r|s)");
  //   });

  //   it('should negate "~((p & q) -> (r | s))" to "(p&q)&~(r|s)"', () => {
  //     expect(getNegation("~((p & q) -> (r | s))")).toEqual("(p&q)&~(r|s)");
  //   });

  //   it('should negate "(p & (q -> r)) -> ~(s & t)" to "p&(q&~r)&(s|t)"', () => {
  //     expect(getNegation("(p & (q -> r)) -> ~(s & t)")).toEqual("p&(q&~r)&(s|t)");
  //   });

  //   it('should negate "~(~(p & q) -> ~(r | s))" to "(p&q)&~(r|s)"', () => {
  //     expect(getNegation("~(~(p & q) -> ~(r | s))")).toEqual("(p&q)&~(r|s)");
  //   });

  //   it('should negate "p & (q -> r) -> ~(s & (t -> u))" to "p&(q&~r)&(s&~u)"', () => {
  //     expect(getNegation("p & (q -> r) -> ~(s & (t -> u))")).toEqual(
  //       "p&(q&~r)&(s&~u)"
  //     );
  //   });
});

export {};
