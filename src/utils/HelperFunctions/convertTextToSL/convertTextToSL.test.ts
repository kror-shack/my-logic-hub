import convertTextToSL from "./convertTextToSL";

describe("convertTextToSL", () => {
  it("test 1", () => {
    const input = "8.~(B-0)D(DVE)\n~(B+C)\nSVE";
    const result = convertTextToSL(input);
    const expectedResult = ["~(B&)->(DVE)", "~(B&C)", "SVE"];
    expect(result).toEqual(expectedResult);
  });

  it("test 2", () => {
    const input = "cq";
    const result = convertTextToSL(input);
    const expectedResult = ["q"];
    expect(result).toEqual(expectedResult);
  });
});

export {};
