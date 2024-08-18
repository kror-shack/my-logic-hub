import getCirclesRelation from "./getCirclesRelation";

describe("get circles relation", () => {
  const getCircles = (
    minorTerm: string,
    majorTerm: string,
    middleTerm: string
  ) => {
    return [
      {
        center: {
          x: 150,
          y: 100,
        },
        radius: 80,
        color: "red",
        label: minorTerm,
        offset: { x: -220, y: -50 },
      },
      {
        center: {
          x: 270,
          y: 100,
        },
        radius: 80,
        color: "blue",
        label: majorTerm,
        offset: { x: 10, y: -50 },
      },
      {
        center: {
          x: 210,
          y: 180,
        },
        radius: 80,
        color: "green",
        label: middleTerm,
        offset: {
          x: -110,
          y: 120,
        },
      },
    ];
  };
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

    const expectedRelation = [
      { thirdCircle: "shade wrt second" },
      { firstCircle: "shade wrt third" },
    ];

    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expectedRelation
    );
  });

  test("AAI-2", () => {
    const syllogisticFigure = {
      figure: "AAI-2",
      majorPremise: "All P are T",
      minorPremise: "All L are P",
      majorTerm: "p",
      minorTerm: "l",
      middleTerm: "t",
      premise1: {
        subject: "p",
        predicate: "t",
        type: "A",
      },
      premise2: {
        subject: "l",
        predicate: "p",
        type: "A",
      },
      conc: {
        subject: "l",
        predicate: "p",
        type: "I",
      },
    };

    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    const expected = [
      { secondCircle: "shade wrt third" },
      { firstCircle: "shade wrt second" },
    ];

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expected
    );
  });
  test("EEI-2", () => {
    const syllogisticFigure = {
      figure: "EEI-2",
      majorPremise: "All P are not T",
      minorPremise: "All L are not P",
      majorTerm: "p",
      minorTerm: "l",
      middleTerm: "t",
      premise1: {
        subject: "p",
        predicate: "t",
        type: "E",
      },
      premise2: {
        subject: "l",
        predicate: "p",
        type: "E",
      },
      conc: {
        subject: "l",
        predicate: "p",
        type: "I",
      },
    };

    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    const expected = [
      { rightIntersection: "shade" },
      { topIntersection: "shade" },
    ];

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expected
    );
  });

  test("EOI-2", () => {
    const syllogisticFigure = {
      figure: "EOI-2",
      majorPremise: "All P are not T",
      minorPremise: "Some L are not P",
      majorTerm: "p",
      minorTerm: "l",
      middleTerm: "t",
      premise1: {
        subject: "p",
        predicate: "t",
        type: "E",
      },
      premise2: {
        subject: "l",
        predicate: "p",
        type: "O",
      },
      conc: {
        subject: "l",
        predicate: "p",
        type: "I",
      },
    };

    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    const expected = [
      { rightIntersection: "shade" },
      { thirdWrtFirstBorder: "cross" },
    ];

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expected
    );
  });

  test("OEO-1", () => {
    const syllogisticFigure = {
      figure: "OEO-1",
      majorPremise: "No S are M",
      minorPremise: "Some M are not P",
      majorTerm: "p",
      minorTerm: "s",
      middleTerm: "m",
      premise1: {
        subject: "m",
        predicate: "p",
        type: "O",
      },
      premise2: {
        subject: "s",
        predicate: "m",
        type: "E",
      },
      conc: {
        subject: "s",
        predicate: "p",
        type: "O",
      },
    };
    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    const expected = [
      { firstWrtThirdBorder: "cross" },
      { leftIntersection: "shade" },
    ];

    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expected
    );
  });
  test("AAA-3", () => {
    const syllogisticFigure = {
      figure: "AIA-3",
      majorPremise: "All salamanders are amphibians.",
      minorPremise: "all salamanders are newts.",
      majorTerm: "amphibians",
      minorTerm: "newts",
      middleTerm: "salamanders",
      premise1: {
        subject: "salamanders",
        predicate: "amphibians",
        type: "A",
      },
      premise2: {
        subject: "salamanders",
        predicate: "newts",
        type: "A",
      },
      conc: {
        subject: "newts",
        predicate: "amphibians",
        type: "A",
      },
    };
    const circles = getCircles(
      syllogisticFigure.minorTerm,
      syllogisticFigure.majorTerm,
      syllogisticFigure.middleTerm
    );

    const expected = [
      { thirdCircle: "shade wrt second" },
      { thirdCircle: "shade wrt first" },
    ];
    expect(getCirclesRelation({ circles, syllogisticFigure })).toEqual(
      expected
    );
  });
});

export {};
