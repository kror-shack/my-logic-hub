import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import {
  createNegation,
  getOperator,
  isOperator,
  removeOutermostBrackets,
  splitArray,
} from "../propositionalLogicHelperFunctions/propositionalLogicHelperFunction";

const getNegation = (propositionArr: string[]): string[] => {
  let proposition = propositionArr;

  let operator = getOperator(proposition);
  if (operator === "~") {
    operator = getOperator(proposition.slice(1));
    proposition = removeOutermostBrackets(proposition.slice(1));
  }
  if (!operator) {
    const negatedStatement = createNegation(proposition);
    return negatedStatement;
  } else {
    //console.log("operator: " + operator);
    const [before, after] = splitArray(proposition, operator);
    // console.log(`before: ${before}`);
    // console.log(`after: ${after}`);
    const negatedBefore = getNegation(before);
    const negatedAfter = getNegation(after);
    // console.log("in the get negation function");
    // console.log(negatedBefore);
    // console.log(negatedAfter);

    if (operator && isOperator(operator)) {
      switch (operator) {
        case "&":
          // console.log("returning 1");
          return [...negatedBefore, "|", ...negatedAfter];

        case "|":
          return [...negatedBefore, "&", ...negatedAfter];

        case "->":
          return [...before, "&", ...negatedAfter];
      }
    }
    const negatedStatement = createNegation(proposition);
    return negatedStatement;
  }
};

export default getNegation;
