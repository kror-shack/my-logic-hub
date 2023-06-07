import { Circle, Relations, Structure } from "../../../../../../../types/types";
import { checkForWordInString } from "../../../../../../../utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

type SecondRelation = {
  firstCircle: "shade wrt third" | "cross" | null;
  leftIntersection: "shade" | "cross" | null;
  secondCircleBorder: "cross" | null;
  thirdCircle: "shade wrt first" | "shade wrt second" | "cross" | null;
};

type ThirdRelation = {
  secondCircle: "shade wrt third" | "cross" | null;
  rightIntersection: "shade" | "cross" | null;
  leftIntersection: "shade" | "cross" | null;
  firstCircleBorder: "cross" | null;
  thirdCircle: "shade wrt first" | "shade wrt second" | "cross" | null;
};

function findPremise(
  term1: string,
  term2: string,
  premises: Structure[]
): Structure | null {
  console.log("finding premsie");
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

function getSecondRelation(
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
        // // console.log("it is the case");
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

function getThirdRelation(
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

export { findPremise, getSecondRelation, getThirdRelation };
