import getAnnotatedDerivation from "./getAnnotatedDerivation";

describe("test with premises", () => {
  it("test 1", () => {
    const expected = [
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["q"], rule: "R", from: 0, show: false, closed: null },
    ];

    expect(getAnnotatedDerivation("p->q", ["q"])).toEqual(expected);
  });
  it("test 2", () => {
    expect(getAnnotatedDerivation("p->s", ["r"])).toEqual(false);
  });
  it("test 3", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "r", "|", "s", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "|", "s"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "|", "s"],
        rule: "Addition",
        from: 0,
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("p->(r|s)", ["r"])).toEqual(expected);
  });
  it("test 4", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "r", "&", "s", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "&", "s"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "&", "s"],
        rule: "Conjunction",
        from: "0,1",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("p->(r&s)", ["r", "s"])).toEqual(expected);
  });

  it("test 5", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "r", "->", "s", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "->", "s"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "->", "s"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["s"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["s"], rule: "R", from: 1, show: false, closed: null },
    ];
    expect(getAnnotatedDerivation("p->(r->s)", ["r", "s"])).toEqual(expected);
  });
  it("test 6", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "r", "->", "(", "s", "->", "t", ")", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "->", "(", "s", "->", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "->", "(", "s", "->", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["s", "->", "t"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["s", "->", "t"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["s"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["t"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["t"], rule: "R", from: 2, show: false, closed: null },
    ];
    expect(getAnnotatedDerivation("p->(r->(s->t))", ["r", "s", "t"])).toEqual(
      expected
    );
  });
  it("test 7", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "r", "->", "(", "s", "|", "t", ")", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "->", "(", "s", "|", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "->", "(", "s", "|", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["s", "|", "t"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["s", "|", "t"],
        rule: "Addition",
        from: 1,
        show: false,
        closed: null,
      },
    ];

    expect(getAnnotatedDerivation("p->(r->(s|t))", ["r", "s"])).toEqual(
      expected
    );
  });
  it("test 8", () => {
    const expected = [
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["s"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "->", "(", "r", "->", "(", "s", "|", "t", ")", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["r", "->", "(", "s", "|", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r", "->", "(", "s", "|", "t", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["s", "|", "t"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["s", "|", "t"],
        rule: "Addition",
        from: 2,
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("p->(r->(s|t))", ["r&s"])).toEqual(expected);
  });
  it("test 9", () => {
    expect(getAnnotatedDerivation("p->(r->(s|t))", ["r|s"])).toEqual(false);
  });
});

describe("test theorums", () => {
  it("test 1", () => {
    const expected = [
      {
        closed: true,
        from: null,
        obtained: ["p", "->", "p"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
      { closed: true, from: null, obtained: ["p"], rule: null, show: true },
      { closed: null, from: 0, obtained: ["p"], rule: "R", show: false },
    ];
    expect(getAnnotatedDerivation("p->p")).toEqual(expected);
  });
  it("test 2 -30 ", () => {
    const expected = [
      {
        obtained: ["(", "p", "&", "q", ")", "->", "(", "p", "<->", "q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "<->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "<->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["q"], rule: "R", from: 2, show: false, closed: null },
      {
        obtained: ["q", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["p"], rule: "R", from: 1, show: false, closed: null },
      {
        obtained: ["(", "p", "->", "q", ")", "&", "(", "q", "->", "p", ")"],
        rule: "Conjunction",
        from: "5,8",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "<->", "q"],
        rule: "Biconditional Introduction",
        from: "9",
        show: false,
        closed: null,
      },
    ];

    expect(getAnnotatedDerivation("(p&q) -> (p <-> q)")).toEqual(expected);
  });
  it("test 3", () => {
    const expected = [
      {
        closed: true,
        from: null,
        obtained: ["p", "->", "p"],
        rule: null,
        show: true,
      },
      { closed: null, from: null, obtained: ["p"], rule: "ACD", show: false },
      { closed: true, from: null, obtained: ["p"], rule: null, show: true },
      { closed: null, from: 0, obtained: ["p"], rule: "R", show: false },
    ];
    expect(getAnnotatedDerivation("p->p")).toEqual(expected);
  });
  it("test 4", () => {
    const expected = [
      {
        obtained: ["p", "<->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: null,
      },
      {
        obtained: ["p", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      { obtained: ["p"], rule: "R", from: 0, show: false, closed: null },
      {
        obtained: ["(", "p", "->", "p", ")", "&", "(", "p", "->", "p", ")"],
        rule: "Conjunction",
        from: "2,2",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "<->", "p"],
        rule: "Biconditional Introduction",
        from: "3",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("p<->p")).toEqual(expected);
  });
  it("test 5", () => {
    expect(getAnnotatedDerivation("~(p->q) -> p & ~q")).toEqual(false);
  });
});
