import parseInput from "../../TruthTableUtils/parseInput/parseInput";
import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import parseSymbolicLogicInput from "../parseSymbolicLogicInput/parseSymbolicLogicInput";

function checkQLInputForErrors(input: string): true | string {
  const inputArr = convertStringToArray(input);
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
        return `Operator '${current}' cannot be at the start or end of the string`;
      }
      const prev = inputArr[i - 1];
      const next = inputArr[i + 1];

      if (
        symbolArray.includes(prev) ||
        symbolArray.includes(next) ||
        prev === "(" ||
        next === ")"
      ) {
        return `Invalid placement of operator '${current}'`;
      }
    } else if (unAllowedElementArr.includes(current)) {
      return `Invalid element '${current}' found in the input string`;
    } else if (current === "\u2200" || current === "\u2203") {
      if (inputArr[i + 1] !== "(") {
        return `The variables of quantifiers must be contained within paranthese eg: \u2203(x)`;
      } else {
        const endIndex = inputArr.slice(i).indexOf(")");

        if (endIndex === -1) {
          // Brackets not found or in the wrong order
          return "Variables must be contained between parantheses (x)"; // Or handle as needed
        }

        const elementsBetweenBrackets = inputArr.slice(i + 2, endIndex);

        for (const element of elementsBetweenBrackets) {
          if (/^[A-Za-z]$/.test(element) && element === element.toUpperCase()) {
            return "Predicates cannot exist as variables within quantifiers";
          } else if (element === "\u2200" || element === "\u2203") {
            return "Quantifiers cannot exist as variables within quantifiers";
          }
        }
      }
    } else if (
      current === current.toUpperCase() &&
      inputArr[i + 1] === inputArr[i + 1]?.toUpperCase()
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
