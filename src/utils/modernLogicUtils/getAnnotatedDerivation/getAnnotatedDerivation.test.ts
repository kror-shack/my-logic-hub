import getAnnotatedDerivation from "./getAnnotatedDerivation";

/**
 * Main Tests
 */

describe("test theorems -- only conditional derivation", () => {
  it("theorem 1 --basic conditional derivation", () => {
    const expected = [
      {
        closed: true,
        from: null,
        obtained: ["p", "->", "p"],
        rule: null,
        show: true,
      },
      {
        closed: null,
        from: null,
        obtained: ["p"],
        rule: "ACD",
        show: false,
        nonUsable: true,
      },
      {
        closed: true,
        from: null,
        obtained: ["p"],
        rule: null,
        show: true,
        nonUsable: true,
      },
      {
        closed: null,
        from: 1,
        obtained: ["p"],
        rule: "R",
        show: false,
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("p->p")).toEqual(expected);
  });

  /**
   * Removed repititon
   */
  it("theorem 2 - double conditional", () => {
    const expected = [
      {
        obtained: ["q", "->", "(", "p", "->", "q", ")"],
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
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "R",
        from: 1,
        show: false,
        closed: null,
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("q->(p->q)")).toEqual(expected);
  });
  it("theorem 3 - triple conditional", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "(", "p", "->", "q", ")", "->", "q", ")"],
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
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "3,1",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("p->((p->q)->q)")).toEqual(expected);
  });
  it("theorem 4", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "(",
          "(",
          "q",
          "->",
          "r",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "q", "->", "r", ")", "->", "(", "p", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "1,5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "3,7",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(p->q)->((q->r)->(p->r))")).toEqual(
      expected
    );
  });
  it("theorem 5", () => {
    const expected = [
      {
        obtained: [
          "(",
          "q",
          "->",
          "r",
          ")",
          "->",
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "(", "p", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "3,5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "1,7",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(q->r)->((p->q)->(p->r))")).toEqual(
      expected
    );
  });
  it("theorem 6", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "(", "p", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "Modus Ponens",
        from: "1,5",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "3,5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "7,8",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->(q->r))->((p->q)->(p->r))")).toEqual(
      expected
    );
  });
});

describe("test theorems by complexity ascending  -- conditional + basic indirect derivation", () => {
  /**
   * TODO: REMOVE REDUNDANCY
   */
  it("theorem 7 --should add the antecedent as a assertion if it is not solvable by any direct/indirect method", () => {
    const expected = [
      {
        obtained: [
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "(", "p", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "(", "q", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~r"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "R",
        from: 5,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: "Modus Ponens",
        from: "8, 1",
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: "Modus Ponens",
        from: "1,8",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "13,3",
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "Modus Tollens",
        from: "13,7",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~p"],
        rule: "Conjunction",
        from: "3, 15",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("((p->q)->(p->r))->(p->(q->r))")).toEqual(
      expected
    );
  });
  it("theorem 8", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "q",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "(", "p", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "Modus Ponens",
        from: "1,5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "7,3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->(q->r))->(q->(p->r))")).toEqual(
      expected
    );
  });
  it("theorem 9", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "p",
          "->",
          "q",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "q",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "p", "->", "q", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "Modus Ponens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "5,3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->(p->q))->(p->q)")).toEqual(expected);
  });
  it("theorem 10", () => {
    const expected = [
      {
        obtained: [
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "->",
          "q",
          ")",
          "->",
          "(",
          "(",
          "q",
          "->",
          "p",
          ")",
          "->",
          "p",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "q", "->", "p", ")", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "5, 7",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "6, 1",
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "1,6",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Ponens",
        from: "3,12",
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "Modus Tollens",
        from: "3,5",
        nonUsable: true,
      },
      {
        obtained: ["~", "(", "p", "->", "q", ")"],
        rule: "Modus Tollens",
        from: "1,14",
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "5, 13",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("((p->q)->q)->((q->p)->p)")).toEqual(
      expected
    );
  });
  it("theorem 11 --currently uses contradiction instead of DN", () => {
    const expected = [
      {
        obtained: ["~~p", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~~p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~~p", "&", "~p"],
        rule: "Conjunction",
        from: "1, 3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(~~p->p)")).toEqual(expected);
  });
  it("theorem 12 --currently uses contradiction instead of DN", () => {
    const expected = [
      {
        obtained: ["p", "->", "~~p"],
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
        nonUsable: true,
      },
      {
        obtained: ["~~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~p"],
        rule: "Conjunction",
        from: "1, 3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("p->~~p")).toEqual(expected);
  });

  it("theorem 13", () => {
    const expected = [
      {
        obtained: ["(", "p", "->", "q", ")", "->", "(", "~q", "->", "~p", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~q", "->", "~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "Modus Tollens",
        from: "1,3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->q) -> (~q-> ~p)")).toEqual(expected);
  });

  /**
   * For 14 and 15 fix double negation in checking implication solvability
   * and others, it skips over double negation
   */
  it("theorem  14", () => {
    const expected = [
      {
        obtained: ["(", "p", "->", "~q", ")", "->", "(", "q", "->", "~p", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "~q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "Modus Tollens",
        from: "1,3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->~q) -> (q-> ~p)")).toEqual(expected);
  });

  it("theorem 15", () => {
    const expected = [
      {
        obtained: ["(", "~p", "->", "q", ")", "->", "(", "~q", "->", "p", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~p", "->", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~q", "->", "p"],
        rule: null,
        from: null,
        show: true,
        nonUsable: true,
        closed: true,
      },
      {
        obtained: ["~q"],
        rule: "ACD",
        from: null,
        show: false,
        nonUsable: true,
        closed: null,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        nonUsable: true,
        closed: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Tollens",
        from: "1,3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(~p-> q) -> (~q-> p)")).toEqual(expected);
  });

  it("theorem 16", () => {
    const expected = [
      {
        obtained: ["(", "~p", "->", "~q", ")", "->", "(", "q", "->", "p", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~p", "->", "~q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Tollens",
        from: "1,3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(~p-> ~q) -> (q-> p)")).toEqual(expected);
  });
  it("theorem 17", () => {
    const expected = [
      {
        obtained: ["p", "->", "(", "~p", "->", "q", ")"],
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
        nonUsable: true,
      },
      {
        obtained: ["~p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~p"],
        rule: "Conjunction",
        from: "1, 3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("p-> (~p->q)")).toEqual(expected);
  });

  it("theorem 18", () => {
    const expected = [
      {
        obtained: ["~p", "->", "(", "p", "->", "q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "1, 3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("~p->(p->q)")).toEqual(expected);
  });

  it("theroum 19", () => {
    const expected = [
      {
        obtained: ["(", "~p", "->", "p", ")", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~p", "->", "p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Ponens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "3, 4",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(~p->p)->p")).toEqual(expected);
  });

  it("theorem 20", () => {
    const expected = [
      {
        obtained: ["(", "p", "->", "~p", ")", "->", "~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "~p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "Modus Ponens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~p"],
        rule: "Conjunction",
        from: "3, 4",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->~p)->~p")).toEqual(expected);
  });

  it("theorem 21", () => {
    const expected = [
      {
        obtained: ["~", "(", "p", "->", "q", ")", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~", "(", "p", "->", "q", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: [
          "~",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "q",
          ")",
        ],
        rule: "Conjunction",
        from: "1, 4",
        nonUsable: true,
      },
      {
        obtained: [
          "~",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "q",
          ")",
        ],
        rule: "Conjunction",
        from: "1, 4",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("~(p->q)->p")).toEqual(expected);
  });

  it("theorem 22", () => {
    const expected = [
      {
        obtained: ["~", "(", "p", "->", "q", ")", "->", "~q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["~", "(", "p", "->", "q", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "R",
        from: 3,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: [
          "~",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "q",
          ")",
        ],
        rule: "Conjunction",
        from: "1, 4",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("~(p->q)->~q")).toEqual(expected);
  });
  it("theorem 23", () => {
    const expected = [
      {
        obtained: ["(", "(", "p", "->", "q", ")", "->", "p", ")", "->", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "->", "p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~p"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "3, 5",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Ponens",
        from: "4, 1",
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Modus Ponens",
        from: "1,4",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "4,10",
        nonUsable: true,
      },
      {
        obtained: ["~", "(", "p", "->", "q", ")"],
        rule: "Modus Tollens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["~p", "&", "p"],
        rule: "Conjunction",
        from: "3, 10",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("((p->q)->p)->p")).toEqual(expected);
  });

  it("theorem 26", () => {
    const expected = [
      {
        obtained: [
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "&", "(", "q", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "3,5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "4,7",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("((p->q)&(q->r))->(p->r)")).toEqual(expected);
  });
});

/*Copy paste */

it.skip("theorem", () => {
  expect(getAnnotatedDerivation("(~p->p)->p)")).toEqual(false);
});

describe("test theorems -- biconditional", () => {
  it("theorem 24", () => {
    const expected = [
      {
        obtained: ["(", "p", "&", "q", ")", "<->", "(", "q", "&", "p", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "->", "(", "q", "&", "p", ")"],
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
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "2",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "2",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: "Conjunction",
        from: "5,4",
        nonUsable: true,
      },
      {
        obtained: ["(", "q", "&", "p", ")", "->", "(", "p", "&", "q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "8",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "8",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Conjunction",
        from: "11,10",
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "<->", "(", "q", "&", "p", ")"],
        rule: "CB",
        from: "1,7 ",
        show: false,
        closed: null,
      },
    ];

    expect(getAnnotatedDerivation("(p&q) <-> (q&p)")).toEqual(expected);
  });

  it("theorem 25", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "&",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "&",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: [
          "(",
          "p",
          "&",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "->",
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "&",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "&", "(", "q", "&", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "&", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "2",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Simplification",
        from: "2",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Conjunction",
        from: "4,6",
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "&", "r"],
        rule: "Conjunction",
        from: "8,7",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "&",
          "r",
          ")",
          "->",
          "(",
          "p",
          "&",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "&", "r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "(", "q", "&", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Simplification",
        from: "11",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "11",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "13",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "13",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Conjunction",
        from: "16,14",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "(", "q", "&", "r", ")"],
        rule: "Conjunction",
        from: "15,17",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "p",
          "&",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "&",
          "r",
          ")",
        ],
        rule: "CB",
        from: "1,10 ",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("(p&(q&r)) <-> ((p&q)&r)")).toEqual(expected);
  });

  it("theorem 27", () => {
    const expected = [
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "<->",
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "->",
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "->", "r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "(", "q", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Conjunction",
        from: "4,6",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "2,8",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "13",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "13",
        nonUsable: true,
      },
      {
        obtained: ["q", "->", "r"],
        rule: "Modus Ponens",
        from: "11,15",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "17,16",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "<->",
          "(",
          "p",
          "->",
          "(",
          "q",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: "CB",
        from: "1,10 ",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("((p&q)->r) <-> (p->(q->r))")).toEqual(
      expected
    );
  });
  it("theorem 28 --required ID for more than one place predicate", () => {
    const expected = [
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "&",
          "~r",
          ")",
          "->",
          "~q",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "->",
          "(",
          "(",
          "p",
          "&",
          "~r",
          ")",
          "->",
          "~q",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "->", "r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "~r", ")", "->", "~q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~r"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "4",
        nonUsable: true,
      },
      {
        obtained: ["~r"],
        rule: "Simplification",
        from: "4",
        nonUsable: true,
      },
      {
        obtained: ["~", "(", "p", "&", "q", ")"],
        rule: "Modus Tollens",
        from: "2,7",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Conjunction",
        from: "6,9",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "2,10",
        nonUsable: true,
      },
      {
        obtained: ["~r", "&", "r"],
        rule: "Conjunction",
        from: "7, 11",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "~r",
          ")",
          "->",
          "~q",
          ")",
          "->",
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "&", "~r", ")", "->", "~q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "&", "q", ")", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "16",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "16",
        nonUsable: true,
      },
      {
        obtained: ["~", "(", "p", "&", "~r", ")"],
        rule: "Modus Tollens",
        from: "14,19",
        nonUsable: true,
      },
      {
        obtained: ["~r"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "~r"],
        rule: "Conjunction",
        from: "18,21",
        nonUsable: true,
      },
      {
        obtained: ["~q"],
        rule: "Modus Ponens",
        from: "14,22",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "~q"],
        rule: "Conjunction",
        from: "19,23",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "&",
          "q",
          ")",
          "->",
          "r",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "&",
          "~r",
          ")",
          "->",
          "~q",
          ")",
        ],
        rule: "CB",
        from: "1,13 ",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("((p&q)->r) <-> ((p&~r)->~q)")).toEqual(
      expected
    );
  });

  it("theorem 29", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "->",
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "&", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "&", "(", "p", "->", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Modus Ponens",
        from: "2,5",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "7",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "7",
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Modus Ponens",
        from: "2,11",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "4,11",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "13",
        nonUsable: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "&", "(", "p", "->", "r", ")"],
        rule: "Conjunction",
        from: "4,0 ",
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["(", "p", "->", "q", ")", "&", "(", "p", "->", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "(", "q", "&", "r", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: "Simplification",
        from: "18",
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: "Simplification",
        from: "18",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Modus Ponens",
        from: "20,22",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Modus Ponens",
        from: "21,22",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Conjunction",
        from: "24,25",
        nonUsable: true,
      },
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "<->",
          "(",
          "(",
          "p",
          "->",
          "q",
          ")",
          "&",
          "(",
          "p",
          "->",
          "r",
          ")",
          ")",
        ],
        rule: "CB",
        from: "1,17 ",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("(p->(q&r)) <-> ((p->q)&(p->r))")).toEqual(
      expected
    );
  });
});

describe("expansion of theorems", () => {
  it("theorem 24 --expansion to check leftToRight impllication", () => {
    const expected = [
      {
        obtained: ["(", "p", "&", "q", ")", "->", "(", "q", "&", "p", ")"],
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
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: "Conjunction",
        from: "4,3",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p&q) -> (q&p)")).toEqual(expected);
  });
  it("theorem 24 --expansion to check rightToLeft impllication", () => {
    const expected = [
      {
        obtained: ["(", "q", "&", "p", ")", "->", "(", "p", "&", "q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["q", "&", "p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "1",
        nonUsable: true,
      },
      {
        obtained: ["p", "&", "q"],
        rule: "Conjunction",
        from: "4,3",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(q&p) -> (p&q)")).toEqual(expected);
  });
  it("theorem 29 --only before operator of consequent", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "q",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "&", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Modus Ponens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
    ];

    expect(getAnnotatedDerivation("(p->(q&r)) -> (p->q)")).toEqual(expected);
  });

  it("theorem 29 --only after operator of consequent", () => {
    const expected = [
      {
        obtained: [
          "(",
          "p",
          "->",
          "(",
          "q",
          "&",
          "r",
          ")",
          ")",
          "->",
          "(",
          "p",
          "->",
          "r",
          ")",
        ],
        rule: null,
        from: null,
        show: true,
        closed: true,
      },
      {
        obtained: ["p", "->", "(", "q", "&", "r", ")"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["p", "->", "r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: null,
        from: null,
        show: true,
        closed: true,
        nonUsable: true,
      },
      {
        obtained: ["q", "&", "r"],
        rule: "Modus Ponens",
        from: "1,3",
        nonUsable: true,
      },
      {
        obtained: ["q"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "5",
        nonUsable: true,
      },
    ];
    expect(getAnnotatedDerivation("(p->(q&r)) -> (p->r)")).toEqual(expected);
  });
});

/**
 * FIX: infinite loop
 * FIXED: added a check for ID assumption step
 */
it.skip("theroum 15 -expansion --checking infinite loop", () => {
  expect(getAnnotatedDerivation("(~p-> ~q) -> (~q-> p)")).toEqual(false);
});

/**
 * Testing arguments with premises present
 * This could be done by using Conjunction and Imp to make the entire argument
 * a theorem and running the proof as a theorem
 */
describe.skip("test with premises", () => {
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
  it("test 10 - check indirect derivation in conditional", () => {
    const expected = [
      {
        obtained: ["~r"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["r"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "->", "q"],
        rule: null,
        from: null,
        show: true,
        closed: null,
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
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["~r", "|", "q"],
        rule: "Addition",
        from: "1",
        show: false,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: "Modues Tollendo Ponens",
        from: "4, 2",
        show: false,
        closed: null,
      },
    ];

    expect(getAnnotatedDerivation("p->q", ["~r & r"])).toEqual(expected);
  });

  it("test 11 - check basic indirect derivation", () => {
    const expected = [
      {
        obtained: ["p"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["~p"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["~q"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "|", "q"],
        rule: "Addition",
        from: "1",
        show: false,
        closed: null,
      },
      {
        obtained: ["q"],
        rule: "Modues Tollendo Ponens",
        from: "3, 2",
        show: false,
        closed: null,
      },
    ];

    expect(getAnnotatedDerivation("q", ["p & ~p"])).toEqual(expected);
  });
  it("test 12 - 39", () => {
    expect(getAnnotatedDerivation("(p->r)|(q->s)", ["(p&q) -> (r|s)"])).toEqual(
      false
    );
  });
});

describe.skip("test theorems", () => {
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

  /**
   * FAILING
   * SHOULD NOT RETURN FALSE
   */
  it("test 5 -check contradiction exploitation for theorem", () => {
    const expected = [
      {
        obtained: ["p", "&", "~p", "->", "(", "p", "&", "~q", ")"],
        rule: null,
        from: null,
        show: true,
        closed: null,
      },
      {
        obtained: ["p", "&", "~p"],
        rule: "ACD",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "&", "~q"],
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
        obtained: ["~p"],
        rule: "Simplification",
        from: "0",
        show: false,
        closed: null,
      },
      {
        obtained: ["~", "(", "p", "&", "~q", ")"],
        rule: "AID",
        from: null,
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "|", "(", "p", "&", "~q", ")"],
        rule: "Addition",
        from: "1",
        show: false,
        closed: null,
      },
      {
        obtained: ["p", "&", "~q"],
        rule: "Modues Tollendo Ponens",
        from: "3, 2",
        show: false,
        closed: null,
      },
    ];
    expect(getAnnotatedDerivation("p & ~p -> (p & ~q)")).toEqual(expected);
  });
});
