import { getTranspose } from "./deductionHelperFunctions";

describe("get transpose", () => {
  it("~S ->  T", () => {
    expect(getTranspose(["~S", "->", "T"])).toEqual(["~T", "->", "S"]);
  });
});

export {};
