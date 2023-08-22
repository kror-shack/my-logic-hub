import {
  Circle,
  DrawOrderProperties,
  Relations,
  SecondRelation,
  Structure,
  ThirdRelation,
} from "../../../types/VennDiagramTypes/types";
import { checkForWordInString } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

export function checkUniversalPremiseEffect(
  firstFill: Partial<Relations> | null,
  secondFill: Partial<Relations> | null
): DrawOrderProperties | null {
  if (!firstFill || !secondFill) return null;
  if (firstFill.thirdCircle) {
    switch (firstFill.thirdCircle) {
      case "shade wrt first":
        if (secondFill.rightIntersection === "cross")
          return { middleCross: "cross" };

        break;
      case "shade wrt second":
        if (secondFill.leftIntersection === "cross")
          return { middleCross: "cross" };
        else if (secondFill.secondCircleBorder === "cross")
          return { middleCross: "cross" };
    }
  }
  if (firstFill.secondCircle) {
    switch (firstFill.secondCircle) {
      case "shade wrt third":
        if (secondFill.secondCircleBorder === "cross")
          return { firstCircle: "cross" };

        break;
    }
  }
  if (firstFill.leftIntersection) {
    switch (firstFill.leftIntersection) {
      case "shade":
        if (secondFill.firstCircleBorder === "cross")
          return { rightCross: "cross" };
    }
  }

  if (firstFill.rightIntersection) {
    if (firstFill.rightIntersection === "shade") {
      if (secondFill.secondCircleBorder === "cross")
        return { leftCross: "cross" };
    }
  }
  return null;
}

export type DrawOrder = {
  firstFill: DrawOrderProperties | null;
  secondFill: DrawOrderProperties | null;
};

export function filterRelations(
  relations: Partial<Relations>,
  value: string | null
): Partial<Relations> | undefined {
  const filteredRelations: Partial<Relations> = {};

  for (const key in relations) {
    if (relations[key] !== value) {
      filteredRelations[key] = relations[key];
    }
  }

  return filteredRelations;
}

export function removeFirstProperyFromObj(obj: { [key: string]: any }): {
  [key: string]: any;
} {
  const [firstKey, ...rest] = Object.keys(obj);
  const newObj: { [key: string]: any } = {};

  for (const key of rest) {
    newObj[key] = obj[key];
  }

  return newObj;
}

export function findPremise(
  term1: string,
  term2: string,
  premises: Structure[]
): Structure | null {
  for (let i = 0; i < premises.length; i++) {
    let statement = premises[i].subject.concat(" ", premises[i].predicate);
    if (
      checkForWordInString(term1, statement) &&
      checkForWordInString(term2, statement)
    ) {
      return premises[i];
    }
  }
  return null;
}

export function getSecondRelation(
  circleOne: Circle,
  circleThree: Circle,
  premise: Structure
): SecondRelation {
  const secondRelation = {} as SecondRelation;
  if (
    checkForWordInString(circleOne.label, premise.subject) &&
    checkForWordInString(circleThree.label, premise.predicate)
  ) {
    switch (premise.type) {
      case "A":
        secondRelation.firstCircle = "shade wrt third";
        break;
      case "E":
        secondRelation.leftIntersection = "shade";
        break;
      case "I":
        secondRelation.secondCircleBorder = "cross";
        break;
      case "O":
        secondRelation.firstCircle = "cross";
        break;
    }
  } else if (
    checkForWordInString(circleOne.label, premise.predicate) &&
    checkForWordInString(circleThree.label, premise.subject)
  ) {
    switch (premise.type) {
      case "A":
        secondRelation.thirdCircle = "shade wrt first";
        break;
      case "E":
        secondRelation.leftIntersection = "shade";
        break;
      case "I":
        secondRelation.secondCircleBorder = "cross";
        break;
      case "O":
        secondRelation.thirdCircle = "cross";
        break;
    }
  }
  return secondRelation;
}

export function getThirdRelation(
  circleTwo: Circle,
  circleThree: Circle,
  premise: Structure
): ThirdRelation {
  const thirdRelation = {} as ThirdRelation;
  if (
    checkForWordInString(circleTwo.label, premise.subject) &&
    checkForWordInString(circleThree.label, premise.predicate)
  ) {
    switch (premise.type) {
      case "A":
        thirdRelation.secondCircle = "shade wrt third";
        break;
      case "E":
        thirdRelation.rightIntersection = "shade";
        break;
      case "I":
        thirdRelation.firstCircleBorder = "cross";
        break;
      case "O":
        thirdRelation.secondCircle = "cross";
        break;
    }
  } else if (
    checkForWordInString(circleTwo.label, premise.predicate) &&
    checkForWordInString(circleThree.label, premise.subject)
  ) {
    switch (premise.type) {
      case "A":
        thirdRelation.thirdCircle = "shade wrt second";
        break;
      case "E":
        thirdRelation.rightIntersection = "shade";
        break;
      case "I":
        thirdRelation.firstCircleBorder = "cross";
        break;
      case "O":
        thirdRelation.thirdCircle = "cross";
        break;
    }
  }
  return thirdRelation;
}
