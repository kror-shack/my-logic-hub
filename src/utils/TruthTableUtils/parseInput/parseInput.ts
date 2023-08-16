import { transformSymbolsForProcessing } from "../../HelperFunctions/tranfromSymbols/transformSymbols";
import {
  convertStringToArray,
  replaceValues,
} from "./parseInputHelpers/parseInputHelperFunctions";

const parseInput = (input: string) => {
  const transformedInputArr = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedInputArr);
  const replacedArr = replaceValues(inputArr);

  return replacedArr;
};

export default parseInput;
