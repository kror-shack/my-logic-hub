import { Relations } from "../../../../../../types/types";
import getCircleDrawOrder from "./getCircleDrawOrder";

describe("get circle draw order", () => {
  test("AAA-1", () => {
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

    const circles = [
      {
        center: {
          x: 150,
          y: 100,
        },
        radius: 80,
        color: "red",
        label: syllogisticFigure.minorTerm,
        offset: { x: -220, y: -50 },
      },
      {
        center: {
          x: 270,
          y: 100,
        },
        radius: 80,
        color: "blue",
        label: syllogisticFigure.majorTerm,
        offset: { x: 10, y: -50 },
      },
      {
        center: {
          x: 210,
          y: 180,
        },
        radius: 80,
        color: "green",
        label: syllogisticFigure.middleTerm,
        offset: {
          x: -110,
          y: 120,
        },
      },
    ];

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
