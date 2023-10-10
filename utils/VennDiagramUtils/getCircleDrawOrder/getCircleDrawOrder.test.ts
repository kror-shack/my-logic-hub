import { Relations } from "../../../types/VennDiagramTypes/types";
import getCircleDrawOrder from "./getCircleDrawOrder";

describe("get circle draw order", () => {
  test.skip("AAA-1", () => {
    const syllogisticFigure = {
      figure: "AAA-1",
      majorPremise: "All men are mortal",
      minorPremise: "Socrates is a man",
      majorTerm: "mortal",
      minorTerm: "socrates",
      middleTerm: "men",
      premise1: {
        subject: "men",
        predicate: "mortal",
        type: "A",
      },
      premise2: {
        subject: "socrates",
        predicate: "man",
        type: "A",
      },
      conc: {
        subject: "socrates",
        predicate: "mortal",
        type: "A",
      },
    };

    const relations = {} as Relations;
    relations.firstCircle = "shade wrt third";
    relations.thirdCircle = "shade wrt second";

    const expectedRelation = {
      firstFill: { firstCircle: "shade wrt third" },
      secondFill: { thirdCircle: "shade wrt second" },
    };

    expect(getCircleDrawOrder({ relations, syllogisticFigure })).toEqual(
      expectedRelation
    );
  });
});

export {};
