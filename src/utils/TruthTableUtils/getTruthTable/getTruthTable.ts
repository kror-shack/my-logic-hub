import { stringify } from "querystring";
import convertToReversePolishNotation from "../convertToReversePolishNotation/convertToReversePolishNotation";
import evalulateReversePolishNotaion from "../evaluateReversePolishNotation/evaluateReversePolishNotation";
import parseInput from "../parseInput/parseInput";
import countVariables from "./getTruthTableHelpers/getTruthTableHelperFunctions";

// does not give the correct combinations
// if brackets are present

const getTruthTable = (input: string) => {
  const parsedInput = parseInput(input);
  const rpn = convertToReversePolishNotation(parsedInput);
  const totalVariables = countVariables(parsedInput);
  const combinations = Math.pow(2, totalVariables);

  const truthTable = evalulateReversePolishNotaion(rpn, combinations);
  return truthTable;
};

export default getTruthTable;
