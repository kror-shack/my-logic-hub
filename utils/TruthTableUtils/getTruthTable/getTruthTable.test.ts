import getTruthTable from "./getTruthTable";

describe("getTruthTable", () => {
  it("gets Conjunction truth table", () => {
    const result = getTruthTable("p & (q | r)");
    const expected = {
      p: ["T", "T", "T", "T", "F", "F", "F", "F"],
      q: ["T", "T", "F", "F", "T", "T", "F", "F"],
      r: ["T", "F", "T", "F", "T", "F", "T", "F"],
      "(q|r)": ["T", "T", "T", "F", "T", "T", "T", "F"],
      "(p&(q|r))": ["T", "T", "T", "F", "F", "F", "F", "F"],
    };
    expect(result).toEqual(expected);
  });

  it("gets Implication truth table", () => {
    const result = getTruthTable("p -> q");
    const expected = {
      p: ["T", "T", "F", "F"],
      q: ["T", "F", "T", "F"],
      "(p->q)": ["T", "F", "T", "T"],
    };
    expect(result).toEqual(expected);
  });
  it("gets H.S truth table", () => {
    const result = getTruthTable("(p -> q) & (q -> r) -> ( p -> r)");
    const expected = {
      "(((p->q)&(q->r))->(p->r))": ["T", "T", "T", "T", "T", "T", "T", "T"],
      "((p->q)&(q->r))": ["T", "F", "F", "F", "T", "F", "T", "T"],
      "(p->q)": ["T", "T", "F", "F", "T", "T", "T", "T"],
      "(p->r)": ["T", "F", "T", "F", "T", "T", "T", "T"],
      "(q->r)": ["T", "F", "T", "T", "T", "F", "T", "T"],
      p: ["T", "T", "T", "T", "F", "F", "F", "F"],
      q: ["T", "T", "F", "F", "T", "T", "F", "F"],
      r: ["T", "F", "T", "F", "T", "F", "T", "F"],
    };

    expect(result).toEqual(expected);
  });
  it("gets Biconditional truth table", () => {
    const result = getTruthTable("p<->q");
    const expected = {
      "(p<->q)": ["T", "F", "F", "T"],
      p: ["T", "T", "F", "F"],
      q: ["T", "F", "T", "F"],
    };
    expect(result).toEqual(expected);
  });
  it("test 4", () => {
    const result = getTruthTable("((I | J) -> (I  & J) )-> ~ ( I & J )");
    const expected = {
      "(((I|J)->(I&J))->~(I&J))": ["F", "T", "T", "T"],
      "((I|J)->(I&J))": ["T", "F", "F", "T"],
      "(I&J)": ["T", "F", "F", "F"],
      "(I|J)": ["T", "T", "T", "F"],
      I: ["T", "T", "F", "F"],
      J: ["T", "F", "T", "F"],
      "~(I&J)": ["F", "T", "T", "T"],
    };

    expect(result).toEqual(expected);
  });
  it("test 5", () => {
    const result = getTruthTable(
      "(((p -> q) & (r -> s)) & (q | s)) -> (p | r)"
    );
    const expected = {
      p: [
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
      ],
      q: [
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
      ],
      "(p->q)": [
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
      ],
      r: [
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
      ],
      s: [
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
      ],
      "(r->s)": [
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
      ],
      "((p->q)&(r->s))": [
        "T",
        "F",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
      ],
      "(q|s)": [
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "T",
        "F",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "T",
        "F",
      ],
      "(((p->q)&(r->s))&(q|s))": [
        "T",
        "F",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "F",
      ],
      "(p|r)": [
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
      ],
      "((((p->q)&(r->s))&(q|s))->(p|r))": [
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "T",
      ],
    };

    expect(result).toEqual(expected);
  });
  it("test 6", () => {
    const result = getTruthTable("(Q -> P) <-> ~( Q & P )");
    const expected = {
      "((Q->P)<->~(Q&P))": ["F", "F", "T", "T"],
      "(Q&P)": ["T", "F", "F", "F"],
      "(Q->P)": ["T", "F", "T", "T"],
      P: ["T", "F", "T", "F"],
      Q: ["T", "T", "F", "F"],
      "~(Q&P)": ["F", "T", "T", "T"],
    };

    expect(result).toEqual(expected);
  });
  it("test 6 -v1", () => {
    const result = getTruthTable("(Q -> P) <-> ~( Q -> P )");
    const expected = {
      "((Q->P)<->~(Q->P))": ["F", "F", "F", "F"],
      "(Q->P)": ["T", "F", "T", "T"],
      P: ["T", "F", "T", "F"],
      Q: ["T", "T", "F", "F"],
      "~(Q->P)": ["F", "T", "F", "F"],
    };

    expect(result).toEqual(expected);
  });
  it("test 6 -v3", () => {
    const result = getTruthTable("(R | S) <-> ~( Q -> P )");
    const expected = {
      R: [
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
        "F",
      ],
      S: [
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
      ],
      "(R|S)": [
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "T",
        "F",
        "F",
        "F",
        "F",
      ],
      Q: [
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
        "T",
        "T",
        "F",
        "F",
      ],
      P: [
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
        "T",
        "F",
      ],
      "(Q->P)": [
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
        "T",
        "F",
        "T",
        "T",
      ],
      "~(Q->P)": [
        "F",
        "T",
        "F",
        "F",
        "F",
        "T",
        "F",
        "F",
        "F",
        "T",
        "F",
        "F",
        "F",
        "T",
        "F",
        "F",
      ],

      "((R|S)<->~(Q->P))": [
        "F",
        "T",
        "F",
        "F",
        "F",
        "T",
        "F",
        "F",
        "F",
        "T",
        "F",
        "F",
        "T",
        "F",
        "T",
        "T",
      ],
    };

    expect(result).toEqual(expected);
  });
  it("test 6 -v4", () => {
    const result = getTruthTable("(P | Q) & ~( Q -> P )");
    const expected = {
      "((P|Q)&~(Q->P))": ["F", "F", "T", "F"],
      "(P|Q)": ["T", "T", "T", "F"],
      "(Q->P)": ["T", "T", "F", "T"],
      P: ["T", "T", "F", "F"],
      Q: ["T", "F", "T", "F"],
      "~(Q->P)": ["F", "F", "T", "F"],
    };

    expect(result).toEqual(expected);
  });
  it("test 7", () => {
    const result = getTruthTable("((Q -> P) <-> ~( Q & P ))->((~Q|P)<->(Q|P))");
    const expected = {
      "(((Q->P)<->~(Q&P))->((~Q|P)<->(Q|P)))": ["T", "T", "T", "F"],
      "((Q->P)<->~(Q&P))": ["F", "F", "T", "T"],
      "((~Q|P)<->(Q|P))": ["T", "F", "T", "F"],
      "(Q&P)": ["T", "F", "F", "F"],
      "(Q->P)": ["T", "F", "T", "T"],
      "(Q|P)": ["T", "T", "T", "F"],
      "(~Q|P)": ["T", "F", "T", "T"],
      P: ["T", "F", "T", "F"],
      Q: ["T", "T", "F", "F"],
      "~(Q&P)": ["F", "T", "T", "T"],
      "~Q": ["F", "F", "T", "T"],
    };

    expect(result).toEqual(expected);
  });
});
export {};
