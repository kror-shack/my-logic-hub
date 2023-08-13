import { checkIfWffIsBranchingNode } from "./PLTHelperFunctions";

describe("checkIfWffIsPrimitive", () => {
  it.only("test 1", () => {
    expect(checkIfWffIsBranchingNode(["~", "(", "t", "&", "~S", ")"])).toBe(
      true
    );
  });
});

export {};
