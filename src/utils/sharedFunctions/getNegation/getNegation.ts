import {
  addBracketsIfNecessary,
  createNegation,
  getOperator,
  isOperator,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

const getNegation = (propositionArr: string[]): string[] => {
  let proposition = propositionArr;
  console.log(proposition);

  let operator = getOperator(proposition);

  if (
    propositionArr[0].includes("\u2200") ||
    propositionArr[0].includes("\u2203")
  ) {
    console.log("before returnign");
    console.log(["~", "(", ...proposition, ")"]);
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
