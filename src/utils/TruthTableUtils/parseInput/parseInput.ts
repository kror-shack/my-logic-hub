import { transformSymbolsForProcessing } from "../../HelperFunctions/tranfromSymbols/transformSymbols";
import {
  convertStringToArray,
  replaceValues,
} from "./parseInputHelpers/parseInputHelperFunctions";

/**
 * Parse input for processing
 *
 * This function converts the symbols to be consistent and
 * transforms the string to an array, with each element representing either a primtive wff, an opeartor,
 * or a bracket.
 *
 * @param input - the input string to be parsed
 * @returns - the parsed input as a string array.
 */
const parseInput = (input: string) => {
  const transformedInputArr = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedInputArr);
  const replacedArr = replaceValues(inputArr);

  return replacedArr;
};

export default parseInput;
