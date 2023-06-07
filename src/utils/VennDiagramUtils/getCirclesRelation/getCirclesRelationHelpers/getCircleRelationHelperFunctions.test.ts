import {
  findPremise,
  getSecondRelation,
  getThirdRelation,
} from "./getCircleRelationHelperFunctions";

describe("find premise", () => {
  test("first premise", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("mortal", "men", [premise1, premise2])).toEqual(
      premise1
    );
  });

  test("first premise -reverse", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("men", "mortal", [premise1, premise2])).toEqual(
      premise1
    );
  });

  test("second premise", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("man", "socrates", [premise1, premise2])).toEqual(
      premise2
    );
  });

  test("second premise -plural", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("men", "socrates", [premise1, premise2])).toEqual(
      premise2
    );
  });

  test("null test", () => {
    const premise1 = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const premise2 = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    expect(findPremise("man", "plato", [premise1, premise2])).toBeFalsy();
  });
});

describe("get second relation", () => {
  test("Case A -subject predicate", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "socrates",
      predicate: "man",
      type: "A",
    };

    const expectedRelation = {
      firstCircle: "shade wrt third",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case E -subject predicate", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "socrates",
      predicate: "man",
      type: "E",
    };

    const expectedRelation = {
      leftIntersection: "shade",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case I -subject predicate", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "socrates",
      predicate: "man",
      type: "I",
    };

    const expectedRelation = {
      secondCircleBorder: "cross",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case O -subject predicate", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "socrates",
      predicate: "man",
      type: "O",
    };

    const expectedRelation = {
      firstCircle: "cross",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case A - predicate subject", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "man",
      predicate: "socrates",
      type: "A",
    };

    const expectedRelation = {
      thirdCircle: "shade wrt first",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case E - predicate subject", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "man",
      predicate: "socrates",
      type: "E",
    };

    const expectedRelation = {
      leftIntersection: "shade",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case I - predicate subject", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "man",
      predicate: "socrates",
      type: "I",
    };

    const expectedRelation = {
      secondCircleBorder: "cross",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case O - predicate subject", () => {
    const circleOne = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "socrates",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "man",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "man",
      predicate: "socrates",
      type: "O",
    };

    const expectedRelation = {
      thirdCircle: "cross",
    };

    expect(getSecondRelation(circleOne, circleThree, premise)).toEqual(
      expectedRelation
    );
  });
});

describe("get third relation", () => {
  test("Case A -subject predicate", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "men",
      predicate: "mortal",
      type: "A",
    };

    const expectedRelation = {
      secondCircle: "shade wrt third",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case E -subject predicate", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "men",
      predicate: "mortal",
      type: "E",
    };

    const expectedRelation = {
      rightIntersection: "shade",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case I -subject predicate", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "men",
      predicate: "mortal",
      type: "I",
    };

    const expectedRelation = {
      firstCircleBorder: "cross",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case O -subject predicate", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "men",
      predicate: "mortal",
      type: "O",
    };

    const expectedRelation = {
      secondCircle: "cross",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case A - predicate subject", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "mortal",
      predicate: "men",
      type: "A",
    };

    const expectedRelation = {
      thirdCircle: "shade wrt second",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case E - predicate subject", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "mortal",
      predicate: "men",
      type: "E",
    };

    const expectedRelation = {
      rightIntersection: "shade",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case I - predicate subject", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "mortal",
      predicate: "men",
      type: "I",
    };

    const expectedRelation = {
      firstCircleBorder: "cross",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });

  test("Case O - predicate subject", () => {
    const circleTwo = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "men",
      offset: { x: -220, y: -50 },
    };

    const circleThree = {
      center: {
        x: 150,
        y: 100,
      },
      radius: 80,
      color: "red",
      label: "mortal",
      offset: { x: -220, y: -50 },
    };

    const premise = {
      subject: "mortal",
      predicate: "men",
      type: "O",
    };

    const expectedRelation = {
      thirdCircle: "cross",
    };

    expect(getThirdRelation(circleTwo, circleThree, premise)).toEqual(
      expectedRelation
    );
  });
});

export {};
