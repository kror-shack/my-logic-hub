import { removeOutermostBrackets } from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";
import {
  convertStringToPropositionArr,
  replaceValues,
} from "./parsePropositionalInputHelpers/parsePropositionalInputHelpers";

const parsePropositionalInput = (input: string) => {
  const inputArr = convertStringToPropositionArr(input);
  const replacedArr = replaceValues(inputArr);
  const removedBrackets = removeOutermostBrackets(replacedArr);
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
