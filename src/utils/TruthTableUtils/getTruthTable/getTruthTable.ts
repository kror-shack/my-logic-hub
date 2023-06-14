import { stringify } from "querystring";
import convertToReversePolishNotation from "../convertToReversePolishNotation/convertToReversePolishNotation";
import evalulateReversePolishNotaion from "../evaluateReversePolishNotation/evaluateReversePolishNotation";
import parseInput from "../parseInput/parseInput";

function countDistinctElementsInFirstArrayOnly(
  arr1: string[],
  arr2: string[]
): number {
  const uniqueElementsSet = new Set(arr1);
  const commonElementsSet = new Set(arr2);
  let varArray: string[] = [];

  uniqueElementsSet.forEach((element) => {
    if (!commonElementsSet.has(element)) {
      varArray.push(element);
    }
  });

  const filteredArray = varArray.filter((element) => element !== " ");
  return filteredArray.length;
}

const symbolArr = ["&", "|", "->", "<->", "(", ")", "~"];

const getTruthTable = (input: string) => {
  const parsedInput = parseInput(input);
  const rpn = convertToReversePolishNotation(parsedInput);
  const totalVariables = countDistinctElementsInFirstArrayOnly(
    parsedInput,
    symbolArr
  );
  const combinations = Math.pow(2, totalVariables);

  const truthTable = evalulateReversePolishNotaion(rpn, combinations);
  return truthTable;
};

export default getTruthTable;
