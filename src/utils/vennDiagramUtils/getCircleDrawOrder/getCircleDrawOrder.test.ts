import exp from "constants";
import {
  Relations,
  VennRelations,
} from "../../../types/vennDiagramTypes/types";
import getCircleDrawOrder from "./getCircleDrawOrder";

describe("get circle draw order", () => {
  test("AAA-1", () => {
    const relations: Partial<VennRelations>[] = [
      { firstCircle: "shade wrt third" },
      { thirdCircle: "shade wrt second" },
    ];

    const expectedRelation = [
      { firstCircle: "shade wrt third" },
      { thirdCircle: "shade wrt second" },
    ];

    expect(getCircleDrawOrder({ relations })).toEqual(expectedRelation);
  });

  test("EOI-2", () => {
    const relations: Partial<VennRelations>[] = [
      { rightIntersection: "shade" },
      { thirdCircleBorder: "cross" },
    ];

    const expectedRelation = [
      { rightIntersection: "shade" },
      { topCross: "cross" },
    ];

    expect(getCircleDrawOrder({ relations })).toEqual(expectedRelation);
  });

  test("OEO-1", () => {
    const relations: Partial<VennRelations>[] = [
      { firstCircleBorder: "cross" },
      { leftIntersection: "shade" },
    ];

    const expectedRelation = [
      { leftIntersection: "shade" },
      { rightCross: "cross" },
    ];

    expect(getCircleDrawOrder({ relations })).toEqual(expectedRelation);
  });
});

export {};
