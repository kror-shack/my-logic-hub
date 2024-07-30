import parseInput from "../../truthTableUtils/parseInput/parseInput";
import { convertStringToArray } from "../../truthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkInputForErrors from "../checkInputForErrors/checkInputForError";
import parseSymbolicLogicInput from "../parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../tranfromSymbols/transformSymbols";
import {
  getAndSymbol,
  getBiConditionalSymbol,
  getImplicationSymbol,
  getOrSymbol,
} from "../getSymbolsFromLS/getSymbolsFromLS";

/**
 *
 * Checks if input is a wff in First Order logic.
 *
 * This function checks against standard logical practices to see whether the user provided input
 * is a well formed formula or not.
 *
 * @param input - The string to be checked.
 * @returns - false if there is no error, otherwise a string with a helpful message to the user about the error.
 */
function checkQLInputForErrors(input: string): false | string {
  const incorrectWffSharedError = checkInputForErrors(input);
  if (incorrectWffSharedError) return incorrectWffSharedError;
  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  if (inputArr.length < 1)
    return "Empty premises serve no purpose. Consider removing them.";
  const symbolArray = [
    getAndSymbol(),
    getOrSymbol(),
    getImplicationSymbol(),
    getBiConditionalSymbol(),
  ];

  const stack: string[] = [];

  for (let i = 0; i < inputArr.length; i++) {
    const current = inputArr[i];
    if (current === "\u2200" || current === "\u2203") {
      const supposedVaraible = inputArr[i + 1];

      if (!supposedVaraible) {
        return `The quantifier ${current} must bind a variable`;
      } else if (inputArr[i - 1] === ")") {
        return `Invalid placement of ${current}`;
      } else if (supposedVaraible === "(" || supposedVaraible === ")") {
        return "The quantifier and its variable must exist side by side";
      } else if (
        supposedVaraible === "\u2200" ||
        supposedVaraible === "\u2203"
      ) {
        return "Quantifiers cannot exist as variables within quantifiers";
      } else if (
        /^[A-Za-z]$/.test(supposedVaraible) &&
        supposedVaraible === supposedVaraible.toUpperCase()
      ) {
        return "Predicates cannot exist as variables within quantifiers";
      } else if (
        symbolArray.includes(supposedVaraible) ||
        supposedVaraible === "~"
      ) {
        return `Invalid placement of operator '${transformSymbolsForDisplay(
          inputArr[i + 1]
        )}'`;
      } else if (inputArr[i + 2] !== "(") {
        const supposedNotBracket = inputArr[i + 2];
        if (/^[a-z]$/.test(supposedNotBracket)) {
          return "Please consider using different quantifiers for different variables. Eg:- \u2200x \u2200y instead of \u2200xy";
        } else if (/^[A-Z]$/.test(supposedNotBracket)) {
          if (inputArr[i + 3]) {
            return `Please consider enclosing the scope of the quantifier within parantheses i.e. ${current}${supposedVaraible}(${supposedNotBracket}${
              inputArr[i + 3]
            })`;
          } else
            return `Please consider enclosing the scope of the quantifier within parantheses e.g. \u2203x(Px)`;
        }
      }

      // for (const element of elementsBetweenBrackets) {
      //   if (/^[A-Za-z]$/.test(element) && element === element.toUpperCase()) {
      //     return "Predicates cannot exist as variables within quantifiers";
      //   } else if (element === "\u2200" || element === "\u2203") {
      //     return "Quantifiers cannot exist as variables within quantifiers";
      //   }
      // }
      // }
    } else if (
      inputArr[i + 1] &&
      /^[A-Z]+$/.test(current) &&
      /^[A-Z]+$/.test(inputArr[i + 1])
    ) {
      return `Predicates ${current} and ${
        inputArr[i + 1]
      } cannot exist side by side without an operator between them.`;
    } else if (/^[a-z]$/.test(current) && current === current.toLowerCase()) {
      if (/^[a-z]$/.test(inputArr[i + 1]) && /^[a-z]$/.test(inputArr[i + 2])) {
        return "The current model supports only upto binary predicates. Work is currently being done to expand the scope.";
      }
    }
  }

  if (stack.length > 0) {
    return "Opening bracket '(' without matching closing bracket ')'";
  }

  return false;
}

export default checkQLInputForErrors;
