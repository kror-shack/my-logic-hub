import getAnnotatedDerivation from "./getAnnotatedDerivation";

describe("test theorems -- only conditional derivation", () => {
  it("Basic conditional derivation", () => {
    const expected = [
      {
        closed: true,
        from: null,
        obtained: ["∀(x)", "(", "Fx", ")", "->", "Fa"],
        rule: null,
        show: true,
      },
      {
        closed: null,
        from: null,
        nonUsable: true,
        obtained: ["∀(x)", "(", "Fx", ")"],
        rule: "ACD",
        show: false,
      },
      {
        closed: true,
        from: null,
        nonUsable: true,
        obtained: ["Fa"],
        rule: null,
        show: true,
      },
      {
        from: "1",
        nonUsable: true,
        obtained: ["Fa"],
        rule: "Universal Instantiation",
      },
    ];

    expect(getAnnotatedDerivation("\u2200x(Fx) -> Fa")).toEqual(expected);
  });
  it.skip("theorem 201 --basic conditional derivation", () => {
    expect(
      getAnnotatedDerivation("(\u2200x(Fx -> Gx)) -> (\u2200xFx -> \u2200xGx)")
    ).toEqual(false);
  });
});
