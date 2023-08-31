import parseInput from "../../TruthTableUtils/parseInput/parseInput";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import parseSymbolicLogicInput from "../parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../tranfromSymbols/transformSymbols";

function checkQLInputForErrors(input: string): true | string {
  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  console.log(inputArr);
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
        return `Operator '${transformSymbolsForDisplay(
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
        return `Invalid placement of operator '${transformSymbolsForDisplay(
          current
        )}'`;
      }
    } else if (unAllowedElementArr.includes(current)) {
      return `Invalid element '${current}' found in the input string`;
    } else if (current === "\u2200" || current === "\u2203") {
      const supposedVaraible = inputArr[i + 1];

      if (supposedVaraible === "(" || supposedVaraible === ")") {
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
        if (
          /^[A-Za-z]$/.test(supposedNotBracket) &&
          supposedNotBracket === supposedNotBracket.toLowerCase()
        ) {
          return "Please consider using different quantifiers for different variables. Eg:- \u2200x \u2200y instead of \u2200xy";
        } else if (
          /^[A-Za-z]$/.test(supposedNotBracket) &&
          supposedNotBracket === supposedNotBracket.toUpperCase() &&
          /^[A-Za-z]$/.test(inputArr[i + 3]) &&
          inputArr[i + 3] === inputArr[i + 3].toLowerCase()
        ) {
          return `Please consider enclosing the scope of the quantifier within parantheses i.e. ${current}${supposedVaraible}(${supposedNotBracket}${
            inputArr[i + 3]
          })`;
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
      current === current.toUpperCase() &&
      inputArr[i + 1] === inputArr[i + 1]?.toUpperCase() &&
      /^[A-Za-z]+$/.test(current) &&
      /^[A-Za-z]+$/.test(inputArr[i + 1])
    ) {
      return `Predicates ${current} and ${
        inputArr[i + 1]
      } cannot exist side by side without an operator between them.`;
    }
  }

  if (stack.length > 0) {
    return "Opening bracket '(' without matching closing bracket ')'";
  }

  return true;
}

export default checkQLInputForErrors;
