import { replaceValues } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import {
  convertQuantifableStringToPropositonArr,
  joinVariablesToPredicates,
} from "./parseQuantifiableInputHelpers/parseQuantifiableInputHelpers";

const parseQuantifiableInput = (input: string) => {
  const inputArr = convertQuantifableStringToPropositonArr(input);
  const joinedVariablesArr = joinVariablesToPredicates(inputArr);
  return joinedVariablesArr;
};

export default parseQuantifiableInput;
