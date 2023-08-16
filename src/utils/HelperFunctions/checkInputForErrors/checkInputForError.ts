import parseInput from "../../TruthTableUtils/parseInput/parseInput";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import parseSymbolicLogicInput from "../parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  transformSymbolsForInput,
  transformSymbolsForProcessing,
} from "../tranfromSymbols/transformSymbols";

function checkInputForErrors(input: string): true | string {
  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  const hasLowercase = inputArr.some((element) => /[a-z]/.test(element));

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
      }
      stack.pop();
    } else if (symbolArray.includes(current)) {
      if (i === 0 || i === inputArr.length - 1) {
        return `Operator '${transformSymbolsForInput(
          current
        )}' cannot be at the start or end of the string`;
      }
      const prev = inputArr[i - 1];
      const next = inputArr[i + 1];

      if (
        symbolArray.includes(prev) ||
        symbolArray.includes(next) ||
        prev === "(" ||
        next === ")"
      ) {
        return `Invalid placement of operator '${transformSymbolsForInput(
          current
        )}'`;
      }
    } else if (unAllowedElementArr.includes(current)) {
      return `Invalid element '${current}' found in the input string`;
    } else if (current === "\u2200" || current === "\u2203") {
      return "Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages";
    } else if (
      /^[A-Za-z]+$/.test(current) &&
      inputArr[i + 1] &&
      /^[A-Za-z]+$/.test(inputArr[i + 1])
    ) {
      return `The predicates ${current} and ${
        inputArr[i + 1]
      } must contain an operator between them`;
    } else if (hasLowercase) {
      return "Use of lowercase letters as predicates is not recommended.";
    }
  }

  if (stack.length > 0) {
    return "Opening bracket '(' without matching closing bracket ')'";
  }
  console.log("Returning true");
  return true;
}

export default checkInputForErrors;
