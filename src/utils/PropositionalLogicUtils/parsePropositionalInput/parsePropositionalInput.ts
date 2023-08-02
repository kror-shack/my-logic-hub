import { joinVariablesToPredicates } from "../../QuantifiableLogicUtils/parseQuantifiableInput/parseQuantifiableInputHelpers/parseQuantifiableInputHelpers";
import { removeOutermostBrackets } from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";
import {
  convertStringToPropositionArr,
  replaceValues,
} from "./parsePropositionalInputHelpers/parsePropositionalInputHelpers";

const parsePropositionalInput = (input: string) => {
  console.log("parsing propostional Input");
  const inputArr = convertStringToPropositionArr(input);
  const replacedArr = replaceValues(inputArr);
  const removedBrackets = removeOutermostBrackets(replacedArr);
  return joinVariablesToPredicates(removedBrackets);

  // if (
  //   replacedArr.length >= 2 &&
  //   replacedArr[0] === "(" &&
  //   replacedArr[replacedArr.length - 1] === ")"
  // ) {
  //   return replacedArr.slice(1, replacedArr.length - 1);
  // }
  return removedBrackets;
};

export default parsePropositionalInput;
