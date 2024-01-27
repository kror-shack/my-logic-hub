import {
  addBracketsIfNecessary,
  checkIfIsWff,
  createNegation,
  getOperator,
  isOperator,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 * Get negation
 *
 *
 * This function gets the negation of a wff.
 *
 *
 * @param prop - proposition
 * @returns - Negation of the proposition.
 *
 *
 */
const getNegation = (prop: string[]): string[] => {
  let proposition = prop;

  let operator = getOperator(proposition);

  if (prop[0].includes("\u2200") || prop[0].includes("\u2203")) {
    return ["~", ...proposition];
  }
  if (operator === "~") {
    operator = getOperator(proposition.slice(1));
    proposition = removeOutermostBrackets(proposition.slice(1));

    return proposition;
  }
  if (!operator) {
    const negatedStatement = createNegation(proposition);
    return negatedStatement;
  } else {
    const [before, after] = splitArray(proposition, operator);

    const negatedBeforeArr = getNegation(before);
    const negatedAfterArr = getNegation(after);
    const negatedBefore = addBracketsIfNecessary(negatedBeforeArr);
    const negatedAfter = addBracketsIfNecessary(negatedAfterArr);

    if (operator && isOperator(operator)) {
      switch (operator) {
        case "&":
          return [...negatedBefore, "|", ...negatedAfter];

        case "|":
          return [...negatedBefore, "&", ...negatedAfter];

        case "->":
          const bracketedBefore = addBracketsIfNecessary(before);
          return [...bracketedBefore, "&", ...negatedAfter];
      }
    }
    const negatedStatement = createNegation(proposition);

    return negatedStatement;
  }
};

export default getNegation;
