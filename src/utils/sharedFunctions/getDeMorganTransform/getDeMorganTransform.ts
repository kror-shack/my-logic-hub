import getNegation from "../getNegation/getNegation";
import {
  getOperator,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";

/**
 * Get DeMorganized Wff
 *
 * This function gets the DeMorganized version of the current wff.
 *
 * This function returns the intial proposition if the proposition is one that cannot have a DeMorgan Counterpart
 * such as a primitive wff as P. Since the wff P already exists in the knowledge base, the restrictions on the addition
 * to the knowledge base would prevent the propostion P to be added again, thus preventing any unnecessary and potentially
 * incorrect addition to the deduction steps.
 *
 * @param prop - proposition
 * @returns - DeMorganized wff of the proposition or the initial proposition if a DeMorgan Transform is not possible.
 *
 *
 */

const getDeMorganTransform = (prop: string[]): string[] => {
  const removedNegationProp = prop.slice(1);
  const removedBracketsProps = removeOutermostBrackets(removedNegationProp);

  const operator = getOperator(removedBracketsProps);

  if (!operator) return getNegation(removedBracketsProps);
  const [before, after] = splitArray(removedBracketsProps, operator);

  const negatedBefore = getNegation(before);

  const negatedAfter = getNegation(after);

  switch (operator) {
    case "|":
      return [...negatedBefore, "&", ...negatedAfter];

    case "&":
      return [...negatedBefore, "|", ...negatedAfter];
  }

  return prop;
};

export default getDeMorganTransform;
