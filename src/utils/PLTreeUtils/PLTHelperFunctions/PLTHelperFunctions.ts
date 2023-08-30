import {
  createNegation,
  getBracketedNegation,
  getOperator,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

export function checkIfWffIsPrimtive(premise: string[]) {
  for (let i = 0; i < premise.length; i++) {
    if (
      isSimplifiableOperator(premise[i]) ||
      premise[i].includes("\u2203") ||
      premise[i].includes("\u2200")
    ) {
      return false;
    }
  }
  return true;
}

function isSimplifiableOperator(value: string): boolean {
  const operators = ["&", "->", "|", "<->"]; // Add more operators as needed

  return operators.includes(value);
}

export function negateWff(premise: string[]) {
  const operator = getOperator(premise);
  console.log("negating wff");
  console.log(premise);
  if (!operator) return createNegation(premise);
  else if (operator === "~") return removeOutermostBrackets(premise.slice(1));
  else return getBracketedNegation(premise);
}

export function checkIfWffIsBranchingNode(premise: string[]) {
  const operator = getOperator(premise);
  if (!operator) return false;
  switch (operator) {
    case "~":
      const secondaryOperator = getOperator(premise.slice(1));
      if (!secondaryOperator) return false;
      else {
        switch (secondaryOperator) {
          case "&":
            return true;

          case "<->":
            return true;

          default:
            return false;
        }
      }

    case "->":
      return true;

    case "<->":
      return true;

    case "|":
      return true;

    default:
      return false;
  }
}

export function replaceQuantifiers(array: string[]) {
  return array.map((str) => {
    return str.replace(/\u2200|\u2203/g, function (match) {
      return match === "\u2200" ? "\u2203" : "\u2200";
    });
  });
}

export function isWffQuantified(
  inputArr: string[]
): "Universal" | "Existential" | false {
  console.log("input Arr: " + inputArr);
  const firstChar = inputArr[0];

  if (firstChar.includes("\u2200")) {
    return "Universal";
  } else if (firstChar.includes("\u2203")) {
    return "Existential";
  } else if (firstChar === "~") {
    const secondChar = inputArr[2];
    const thirdChar = inputArr[2];
    if (secondChar.includes("\u2200") || thirdChar.includes("\u2200")) {
      return "Universal";
    } else if (secondChar.includes("\u2203") || thirdChar.includes("\u2203")) {
      return "Existential";
    }
  } else {
    return false;
  }
  return false;
}
