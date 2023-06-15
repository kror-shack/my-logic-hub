import {
  convertStringToArray,
  replaceValues,
} from "./parseInputHelpers/parseInputHelperFunctions";

const parseInput = (input: string) => {
  const inputArr = convertStringToArray(input);
  const replacedArr = replaceValues(inputArr);

  return replacedArr;
};

export default parseInput;
