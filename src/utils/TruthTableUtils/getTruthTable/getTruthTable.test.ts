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
    const result = getTruthTable(
      "(I | J) -> (I  & J) & ~( I | J) -> ~ ( I & J )"
    );
    const expected = {
      "((I&J)->~(I&J))": ["F", "T", "T", "T"],
      "((I|J)->(~(I|J)&((I&J)->~(I&J))))": ["F", "F", "F", "T"],
      "(I&J)": ["T", "F", "F", "F"],
      "(I|J)": ["T", "T", "T", "F"],
      "(~(I|J)&((I&J)->~(I&J)))": ["F", "F", "F", "T"],
      I: ["T", "T", "F", "F"],
      J: ["T", "F", "T", "F"],
      "~(I&J)": ["F", "T", "T", "T"],
      "~(I|J)": ["F", "F", "F", "T"],
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
});
export {};
