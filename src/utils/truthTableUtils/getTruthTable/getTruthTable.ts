import { stringify } from "querystring";
import convertToReversePolishNotation from "../../helperFunctions/convertToReversePolishNotation/convertToReversePolishNotation";
import evalulateReversePolishNotaion from "../evaluateReversePolishNotation/evaluateReversePolishNotation";
import parseInput from "../parseInput/parseInput";
import countVariables from "./getTruthTableHelpers/getTruthTableHelperFunctions";

/**
 * Get truth table of a wff
 *
 * This function gets the truth table of a wff by converting it into RPN,
 * and then evalulating the RPN.
 *
 * @param input the wff to be evalulated
 * @returns the truth table as an object indexed by a string
 */
const getTruthTable = (input: string) => {
  const parsedInput = parseInput(input);
  const rpn = convertToReversePolishNotation(parsedInput);
  const totalVariables = countVariables(parsedInput);
  const combinations = Math.pow(2, totalVariables);

  const truthTable = evalulateReversePolishNotaion(rpn, combinations);
  return truthTable;
};

export default getTruthTable;
