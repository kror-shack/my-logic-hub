import checkValidity from "./checkValidity";

describe("check validity", () => {
  test("Valid key: AAA-1", () => {
    expect(checkValidity("AAA-1")).toBe(true);
  });

  test("Valid key: AEE-2", () => {
    expect(checkValidity("AEE-2")).toBe(true);
  });

  test("Valid key: AII-3", () => {
    expect(checkValidity("AII-3")).toBe(true);
  });

  test("Valid key: AEE-4", () => {
    expect(checkValidity("AEE-4")).toBe(true);
  });

  test("Valid key: EAE-1", () => {
    expect(checkValidity("EAE-1")).toBe(true);
  });

  test("Valid key: EAE-2", () => {
    expect(checkValidity("EAE-2")).toBe(true);
  });

  test("Valid key: IAI-3", () => {
    expect(checkValidity("IAI-3")).toBe(true);
  });

  test("Valid key: IAI-4", () => {
    expect(checkValidity("IAI-4")).toBe(true);
  });

  test("Valid key: AII-1", () => {
    expect(checkValidity("AII-1")).toBe(true);
  });

  test("Valid key: AOO-2", () => {
    expect(checkValidity("AOO-2")).toBe(true);
  });

  test("Valid key: EIO-3", () => {
    expect(checkValidity("EIO-3")).toBe(true);
  });

  test("Valid key: EIO-4", () => {
    expect(checkValidity("EIO-4")).toBe(true);
  });

  test("Valid key: EIO-1", () => {
    expect(checkValidity("EIO-1")).toBe(true);
  });

  test("Valid key: EIO-2", () => {
    expect(checkValidity("EIO-2")).toBe(true);
  });

  test("Valid key: OAO-3", () => {
    expect(checkValidity("OAO-3")).toBe(true);
  });

  test("Invalid key: ABC-1", () => {
    expect(checkValidity("ABC-1")).toBe(false);
  });

  test("Invalid key: XYZ-2", () => {
    expect(checkValidity("XYZ-2")).toBe(false);
  });

  test("Invalid key: AAA-5", () => {
    expect(checkValidity("AAA-5")).toBe(false);
  });

  test("Invalid key: EIO-10", () => {
    expect(checkValidity("EIO-10")).toBe(false);
  });

  test("Invalid key: IAI-0", () => {
    expect(checkValidity("IAI-0")).toBe(false);
  });

  test("Invalid key: EAE-11", () => {
    expect(checkValidity("EAE-11")).toBe(false);
  });

  test("Invalid key: AII-22", () => {
    expect(checkValidity("AII-22")).toBe(false);
  });

  test("Invalid key: OAO-99", () => {
    expect(checkValidity("OAO-99")).toBe(false);
  });

  test("Empty key", () => {
    expect(checkValidity("")).toBe(false);
  });
});

export {};
