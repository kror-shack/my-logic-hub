import {
  createNegation,
  getBracketedNegation,
  getOperator,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

export function checkIfWffIsPrimtive(premise: string[]) {
  for (let i = 0; i < premise.length; i++) {
    if (isSimplifiableOperator(premise[i])) {
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
  if (!operator) return createNegation(premise);
  else if (operator === "~") return removeOutermostBrackets(premise.slice(1));
  else return getBracketedNegation(premise);
}

export function checkIfWffIsBranchingNode(premise: string[]) {
  const operator = getOperator(premise);
  console.log(operator);
  if (!operator) return false;
  switch (operator) {
    case "~":
      const secondaryOperator = getOperator(premise.slice(1));
      if (!secondaryOperator) return false;
      else {
        console.log(secondaryOperator);
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
