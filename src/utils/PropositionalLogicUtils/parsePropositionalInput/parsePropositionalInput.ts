import {
  convertStringToPropositionArr,
  replaceValues,
} from "./parsePropositionalInputHelpers/parsePropositionalInputHelpers";

const parsePropositionalInput = (input: string) => {
  const inputArr = convertStringToPropositionArr(input);
  const replacedArr = replaceValues(inputArr);
  return replacedArr;
};

export default parsePropositionalInput;
