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

  it("test 2", () => {
    const premiseArr = ["~", "(", "Fx", "<->", "Gy", ")"];
    const domain: AllDomains = { F: [], G: [] };
    const expected = false;
    const truthFE = getPremiseTruthValue(premiseArr, domain);

    expect(truthFE).toEqual(expected);
  });
});
