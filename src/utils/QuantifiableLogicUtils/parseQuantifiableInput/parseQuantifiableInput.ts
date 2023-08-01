import { replaceValues } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import { convertQuantifableStringToPropositonArr } from "./parseQuantifiableInputHelpers/parseQuantifiableInputHelpers";

const parseQuantifiableInput = (input: string) => {
  const inputArr = convertQuantifableStringToPropositonArr(input);
  //   const replacedArr = replaceValues(inputArr);
  //   // if (
  //   //   replacedArr.length >= 2 &&
  //   //   replacedArr[0] === "(" &&
  //   //   replacedArr[replacedArr.length - 1] === ")"
  //   // ) {
  //   //   return replacedArr.slice(1, replacedArr.length - 1);
  //   // }
  return inputArr;
};

export default parseQuantifiableInput;
