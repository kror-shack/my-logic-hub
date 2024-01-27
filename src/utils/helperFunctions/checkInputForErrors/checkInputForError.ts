import { convertStringToArray } from "../../truthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../tranfromSymbols/transformSymbols";

/**
 * Checks if input is a wff in symbolic logic.
 *
 * This function checks against standard logical practices to see whether the user provided input
 * is a well formed formula or not. It is a helper function to both propositional logic and FOL input
 * checks, hence it checks for shared errors amongst them.
 *
 * @param input - The string to be checked.
 * @returns - false if there is no error, otherwise a string with a helpful message to the user about the error.
 */
function checkInputForErrors(input: string): false | string {
  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  if (inputArr.length < 1)
    return "Empty premises serve no purpose. Consider removing them.";
  const symbolArray = ["&", "|", "->", "<->"];
  const unAllowedElementArr = [
    "@",
    "#",
    "!",
    "$",
    "%",
    "^",
    "*",
    "+",
    ";",
    ":",
    "'",
    '"',
    ",",
    ".",
    "{",
    "}",
    "[",
    "]",
    "<",
    ">",
    "-",
    "/",
    "?",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  const stack: string[] = [];

  for (let i = 0; i < inputArr.length; i++) {
    const current = inputArr[i];

    if (current === "~") {
      if (!inputArr[i + 1] || symbolArray.includes(inputArr[i + 1])) {
        return `Negation must be followed by a variable or a bracket`;
      }
    }

    if (current === "(") {
      stack.push(current);
    } else if (current === ")") {
      if (stack.length === 0 || stack[stack.length - 1] !== "(") {
        return "Closing bracket ')' without matching opening bracket '('";
      } else if (inputArr[i - 1] === "(") {
        return "Parantheses must contains wffs between them.";
      }
      stack.pop();
    } else if (symbolArray.includes(current)) {
      if (i === 0 || i === inputArr.length - 1) {
        return `Operator '${transformSymbolsForDisplay(
          current
        )}' cannot be at the start or end of the string`;
      } else if (
        symbolArray.includes(inputArr[i - 1]) ||
        symbolArray.includes(inputArr[i + 1]) ||
        inputArr[i - 1] === "(" ||
        inputArr[i + 1] === ")"
      ) {
        return `Invalid placement of operator '${transformSymbolsForDisplay(
          current
        )}'`;
      } else if (
        symbolArray.includes(current) &&
        symbolArray.includes(inputArr[i + 2])
      ) {
        return "The expression is ambiguous and requires parentheses to clarify the logical grouping.";
      }
    } else if (
      unAllowedElementArr.includes(current) ||
      current === "\\" ||
      current === "`"
    ) {
      return `Invalid element '${current}' found in the input string.`;
    } else if (/[a-z]/.test(current) && symbolArray.includes(inputArr[i - 1])) {
      return "Use of lowercase letters as predicates is not recommended.";
    } else if (
      /^[A-Z]+$/.test(current) &&
      inputArr[i + 1] &&
      /^[A-Z]+$/.test(inputArr[i + 1])
    ) {
      return `The predicates ${current} and ${
        inputArr[i + 1]
      } must contain an operator between them. Uppercase alphabets are treated as predicates whereas lowercase letters are treated as consants, and variables.`;
    } else if (
      /^[A-Z]+$/.test(current) &&
      (inputArr[i + 1] === "(" || inputArr[i - 1] === ")")
    ) {
      return `Invalid placement of predicate '${current}'`;
    } else if (/^[a-z]+$/.test(current) && inputArr[i - 1] === ")") {
      return `Invalid placement of predicate '${current}'`;
    }
  }

  if (stack.length > 0) {
    return "Opening bracket '(' without matching closing bracket ')'";
  }
  return false;
}

export default checkInputForErrors;
