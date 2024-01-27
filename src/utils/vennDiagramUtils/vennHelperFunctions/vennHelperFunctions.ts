import {
  Circle,
  DrawOrderProperties,
  Relations,
  SecondRelation,
  Structure,
  ThirdRelation,
} from "../../../types/vennDiagramTypes/types";
import { checkForWordInString } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

/**
 * Checks for the universal premise effect
 *
 * This function takes in both types of fill
 * for the venn diagrams and checks if the universal premise has
 * any effect on the other fill, and if it does, it returns
 * a new type for the second fill according to a predefined set of rules.
 *
 * @param firstFill - The univeral premise that is to be filled first in the circles.
 * @param secondFill - The second fill which may or may not be effected by the first fill.
 * @returns - An updated second fill, if any, otherwise null.
 */
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

/**
 * Filters the circles relations according to the given value.
 *
 * The primary purpose of this function is to remove all relations
 * that are null.
 *
 * @param relations - The relations of all the circles and intersections among each other and themselves.
 * @param value - The value of the relations by which to filter them like null.
 * @returns - An object with the updated filtered relations.
 */
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

/**
 * Removes first property from an object.
 *
 * @param obj - The object whose first propery is to be removed.
 * @returns - The updated object with the removed property.
 */
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

/**
 * Finds a premise by given terms.
 *
 * This function finds which premise corresponds to the
 * terms passed as params. The order of the terms is irrelevant.
 *
 * @param term1 - The label of one circle.
 * @param term2 - The label of another circle.
 * @param premises - The array of premises of the syllogistic argument.
 * @returns - The premise if any otherwise null.
 */
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

/**
 * Gets the relation between the top right circle and the bottom circle.
 *
 * @param circleOne - The top right circle in the venn diagram.
 * @param circleThree - The bottom circle in the venn diagram.
 * @param premise - The premise that relates both of the circle labels.
 * @returns - The relation between the circles
 */
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

/**
 * Gets the relation between the top left circle and the bottom circle.
 *
 * @param circleOne - The top left circle in the venn diagram.
 * @param circleThree - The bottom circle in the venn diagram.
 * @param premise - The premise that relates both of the circle labels.
 * @returns - The relation between the circles
 */
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

/**
 * Counts unique terms in a string
 *
 * @param terms - The string of terms.
 * @returns - The number of the unique terms in the string.
 */
export function countUniqueTerms(terms: string): number {
  const uniqueSet: string[] = [];
  const termsArr = terms.trim().split(" ");
  for (let i = 0; i < termsArr.length; i++) {
    const term = termsArr[i];
    if (uniqueSet.includes(term)) continue;
    if (
      !uniqueSet.includes(term) &&
      !checkForWordInString(term, uniqueSet.join(" "))
    ) {
      uniqueSet.push(term);
    }
  }
  return uniqueSet.length;
}
