import { checkIfWffIsBranchingNode, negateWff } from "./pLTHelperFunctions";

describe("checkIfWffIsPrimitive", () => {
  it("test 1", () => {
    expect(checkIfWffIsBranchingNode(["~", "(", "t", "&", "~S", ")"])).toBe(
      true
    );
  });
});

describe("negateWff", () => {
  it("test 1", () => {
    expect(negateWff(["~", "(", "t", "&", "~S", ")"])).toStrictEqual([
      "t",
      "&",
      "~S",
    ]);
  });

  it("test 2", () => {
    expect(negateWff(["\u2200(x)", "(", "Px", "&", "~Sx", ")"])).toStrictEqual([
      "~",
      "(",
      "\u2200(x)",
      "(",
      "Px",
      "&",
      "~Sx",
      ")",
      ")",
    ]);
  });
});

// describe("replaceQuantifiers", () => {
//   it("test 1", () => {
//     expect(replaceQuantifiers(["\u2200(x)"])).toStrictEqual(["∃(x)"]);
//   });
// });
export {};
