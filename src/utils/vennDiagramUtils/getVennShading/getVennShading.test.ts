import {
  Relations,
  SyllogisticFigure,
} from "../../../types/vennDiagramTypes/types";
import getVennShading from "./getVennShading";

describe("getVennShading", () => {
  function makeCircles(syllogisticFigure: SyllogisticFigure) {
    return [
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
  }

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

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { thirdCircle: "shade wrt second" },
      { firstCircle: "shade wrt third" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("AAA-2", () => {
    const syllogisticFigure = {
      figure: "AAA-2",
      majorPremise: "All dogs are mammals",
      minorPremise: "All cats are mammals",
      majorTerm: "dogs",
      minorTerm: "cats",
      middleTerm: "mammals",
      premise1: {
        subject: "dogs",
        predicate: "mammals",
        type: "A",
      },
      premise2: {
        subject: "cats",
        predicate: "mammals",
        type: "A",
      },
      conc: {
        subject: "dogs",
        predicate: "cats",
        type: "A",
      },
    };

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { secondCircle: "shade wrt third" },
      { firstCircle: "shade wrt third" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("AII-3", () => {
    const syllogisticFigure = {
      figure: "AAA-2",
      majorPremise: "All artists are egoists",
      minorPremise: "Some artists are paupers",
      majorTerm: "egoists",
      minorTerm: "paupers",
      middleTerm: "artists",
      premise1: {
        subject: "artists",
        predicate: "egoists",
        type: "A",
      },
      premise2: {
        subject: "artists",
        predicate: "paupers",
        type: "I",
      },
      conc: {
        subject: "paupers",
        predicate: "egoists",
        type: "I",
      },
    };

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { thirdCircle: "shade wrt second" },
      { middleCross: "cross" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("IIO-2", () => {
    const syllogisticFigure = {
      figure: "IIO-2",
      majorPremise: "Some household pets are domestic animals.",
      minorPremise: "Some unicorns are domestic animals.",
      majorTerm: "household pets",
      minorTerm: "unicorns",
      middleTerm: "domestic animals",
      premise1: {
        subject: "household pets",
        predicate: "domestic animals",
        type: "I",
      },
      premise2: {
        subject: "unicorns",
        predicate: "domestic animals",
        type: "I",
      },
      conc: {
        subject: "unicorns",
        predicate: "household pets",
        type: "O",
      },
    };

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { firstCircleBorder: "cross" },
      { secondCircleBorder: "cross" },
    ];
    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("AIA-3", () => {
    const syllogisticFigure = {
      figure: "AIA-3",
      majorPremise: "All salamanders are amphibians.",
      minorPremise: "Some salamanders are newts.",
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
        type: "I",
      },
      conc: {
        subject: "newts",
        predicate: "amphibians",
        type: "A",
      },
    };

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { thirdCircle: "shade wrt second" },
      { middleCross: "cross" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  /**
   * FIXED
   * ADDED SUPPORT FOR THE FALLACIOUS RELATION
   * WHERE THE MIDDLE TERM IN UNDISTRIBUTED IN THE PREMISES
   */
  test("AIA-3", () => {
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

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { thirdCircle: "shade wrt second" },
      { thirdCircle: "shade wrt first" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("OEO-2", () => {
    const syllogisticFigure = {
      conc: { predicate: "p", subject: "q", type: "O" },
      figure: "OEO-2",
      majorPremise: "Some P are not S",
      majorTerm: "p",
      middleTerm: "s",
      minorPremise: "No Q are S",
      minorTerm: "q",
      premise1: { predicate: "s", subject: "p", type: "O" },
      premise2: { predicate: "s", subject: "q", type: "E" },
    };

    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { leftIntersection: "shade" },
      { firstWrtSecondBorder: "cross" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });

  test("OOI-4", () => {
    const syllogisticFigure = {
      conc: { predicate: "q", subject: "s", type: "I" },
      figure: "OOI-4",
      majorPremise: "Some Q are not M.",
      majorTerm: "q",
      middleTerm: "m",
      minorPremise: "Some M are not S.",
      minorTerm: "s",
      premise1: { predicate: "m", subject: "q", type: "O" },
      premise2: { predicate: "s", subject: "m", type: "O" },
    };
    const circles = makeCircles(syllogisticFigure);

    const expectedRelation = [
      { firstWrtSecondBorder: "cross" },
      { secondWrtThirdBorder: "cross" },
    ];

    expect(getVennShading(circles, syllogisticFigure)).toEqual(
      expectedRelation
    );
  });
});

export {};
