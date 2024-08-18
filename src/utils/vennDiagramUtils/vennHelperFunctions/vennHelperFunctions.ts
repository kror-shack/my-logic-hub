import {
  Circle,
  CirclePositions,
  DrawOrderProperties,
  Relations,
  SecondRelation,
  Structure,
  ThirdRelation,
  VennRelations,
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
  firstFill: Partial<VennRelations>,
  secondFill: Partial<VennRelations>
): Partial<DrawOrderProperties> | null {
  if (!firstFill || !secondFill) return null;

  // if the third circle is shaded
  if (firstFill.thirdCircle) {
    switch (firstFill.thirdCircle) {
      case "shade wrt first":
        if (secondFill.firstWrtThirdBorder === "cross")
          return { leftCross: "cross" };
        if (secondFill.firstCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.thirdWrtSecondBorder === "cross")
          return { secondCircle: "cross" };
        break;

      case "shade wrt second":
        if (secondFill.secondWrtThirdBorder === "cross")
          return { rightCross: "cross" };
        if (secondFill.secondCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.thirdWrtFirstBorder === "cross")
          return { firstCircle: "cross" };
    }
  }

  // if the second circle is shaded
  else if (firstFill.secondCircle) {
    switch (firstFill.secondCircle) {
      case "shade wrt third":
        if (secondFill.secondWrtFirstBorder === "cross")
          return { firstCircle: "cross" };
        if (secondFill.thirdCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.thirdWrtSecondBorder === "cross")
          return { rightCross: "cross" };
        break;

      case "shade wrt first":
        if (secondFill.secondWrtThirdBorder === "cross")
          return { thirdCircle: "cross" };
        if (secondFill.firstCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.firstWrtSecondBorder === "cross")
          return { topIntersection: "cross" };
    }
  }
  // if the first circle is shaded
  else if (firstFill.firstCircle) {
    switch (firstFill.firstCircle) {
      case "shade wrt third":
        if (secondFill.firstWrtSecondBorder === "cross")
          return { secondCircle: "cross" };
        if (secondFill.thirdCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.thirdWrtFirstBorder === "cross")
          return { leftCross: "cross" };
        break;

      case "shade wrt second":
        if (secondFill.secondWrtFirstBorder === "cross")
          return { topIntersection: "cross" };
        if (secondFill.secondCircleBorder === "cross")
          return { middleCross: "cross" };
        if (secondFill.firstWrtThirdBorder === "cross")
          return { thirdCircle: "cross" };
    }
  }

  /**
   * Now for the Intersections
   */

  // if the left intersection is shaded
  else if (firstFill.leftIntersection === "shade") {
    if (secondFill.firstCircleBorder === "cross")
      return { rightCross: "cross" };
    if (secondFill.firstWrtThirdBorder === "cross")
      return { thirdCircle: "cross" };
    if (secondFill.thirdWrtFirstBorder === "cross")
      return { firstCircle: "cross" };
    if (secondFill.thirdCircleBorder === "cross") return { topCross: "cross" };
  }
  // if the right intersection is shaded
  else if (firstFill.rightIntersection === "shade") {
    if (secondFill.thirdCircleBorder === "cross") return { topCross: "cross" };
    if (secondFill.secondCircleBorder === "cross")
      return { leftCross: "cross" };
    if (secondFill.thirdWrtSecondBorder === "cross")
      return { secondCircle: "cross" };
    if (secondFill.secondWrtThirdBorder === "cross")
      return { thirdCircle: "cross" };
  }

  // if the middle intersection is shaded
  else if (firstFill.topIntersection === "shade") {
    if (secondFill.secondWrtFirstBorder === "cross")
      return { firstCircle: "cross" };
    if (secondFill.secondCircleBorder === "cross")
      return { leftCross: "cross" };
    if (secondFill.firstCircleBorder === "cross")
      return { rightCross: "cross" };
    if (secondFill.firstWrtSecondBorder === "cross")
      return { secondCircle: "cross" };
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
  relations: Partial<VennRelations>,
  value: string | null
): Partial<VennRelations> | undefined {
  const filteredRelations: Partial<VennRelations> = {};

  for (const key of Object.keys(relations)) {
    const typedKey = key as keyof VennRelations;
    if (relations[typedKey] !== value) {
      // filteredRelations[typedKey] = relations[typedKey];
    }
  }

  return Object.keys(filteredRelations).length > 0
    ? filteredRelations
    : undefined;
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

const findCircleByLabel = (
  labelStr: string,
  circles: Circle[]
): CirclePositions | null => {
  const label = labelStr.toLowerCase();
  const index = circles.findIndex((circle) =>
    checkForWordInString(label, circle.label)
  );

  const positions: CirclePositions[] = ["first", "second", "third"];

  return index >= 0 ? positions[index] : null;
};

const getIntersectionByCircle = (first: string, second: string) => {
  const pair = [first, second].sort().join("-");
  switch (pair) {
    case "first-second":
      return "top";
    case "second-third":
      return "right";
    case "first-third":
      return "left";
    default:
      return "not found";
  }
};

const getRelation = (
  firstCircle: CirclePositions,
  secondCircle: CirclePositions,
  thirdCircle: CirclePositions,
  premise: Structure
): Partial<VennRelations> | null => {
  const intersection = getIntersectionByCircle(firstCircle, secondCircle);

  switch (premise.type) {
    case "A":
      return {
        [`${firstCircle}Circle`]: `shade wrt ${secondCircle}`,
      };
    case "E":
      return {
        [`${intersection}Intersection`]: "shade",
      };
    case "I":
      return {
        [`${thirdCircle}CircleBorder`]: "cross",
      };
    case "O":
      return {
        [`${thirdCircle}Wrt${capitalizeFirstLetter(firstCircle)}Border`]:
          "cross",
      };
    default:
      return null;
  }
};

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const getPremiseAssertion = (premise: Structure, circles: Circle[]) => {
  const firstCircle = findCircleByLabel(premise.subject, circles);
  const secondCircle = findCircleByLabel(premise.predicate, circles);
  if (!firstCircle || !secondCircle) return false;
  const thirdCircle = getMissingPosition(firstCircle, secondCircle);
  if (!thirdCircle) return false;
  const premiseRelation = getRelation(
    firstCircle,
    secondCircle,
    thirdCircle,
    premise
  );
  return premiseRelation;
};

function getMissingPosition(
  first: CirclePositions | undefined,
  second: CirclePositions | undefined
): CirclePositions | undefined {
  const positions: CirclePositions[] = ["first", "second", "third"];

  const usedPositions = [first, second].filter(
    (pos): pos is CirclePositions => pos !== undefined
  );

  return positions.find((pos) => !usedPositions.includes(pos));
}

export function prioritizeShade(
  items: Partial<VennRelations>[]
): Partial<VennRelations>[] {
  return items.sort((a, b) => {
    const containsShadeA = Object.values(a).some((value) =>
      value?.includes("shade")
    );
    const containsShadeB = Object.values(b).some((value) =>
      value?.includes("shade")
    );

    if (containsShadeA && !containsShadeB) return -1;
    if (containsShadeB && !containsShadeA) return 1;
    return 0;
  });
}
