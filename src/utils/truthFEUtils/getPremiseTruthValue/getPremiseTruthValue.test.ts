import { AllDomains } from "../../../types/truthFETypes/truthFETypes";
import { getPremiseTruthValue } from "./getPremiseTruthValue";

describe("getPremiseTruthValue", () => {
  it("test 1", () => {
    const premiseArr = ["I"];
    const domain: AllDomains = { F: "T", G: "F", I: "F" };
    const expected = false;
    const truthFE = getPremiseTruthValue(premiseArr, domain);

    expect(truthFE).toEqual(expected);
  });
});
