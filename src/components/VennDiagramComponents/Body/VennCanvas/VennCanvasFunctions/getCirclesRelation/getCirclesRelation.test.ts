import getCirclesRelation from "./getCirclesRelation";

describe("get circles relation", () => {
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

    const expectedRelation = {
      firstCircle: "shade wrt third",
      thirdCircle: "shade wrt second",
    };

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expectedRelation
    );
  });
});

export {};
