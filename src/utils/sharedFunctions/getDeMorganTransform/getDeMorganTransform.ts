import getNegation from "../getNegation/getNegation";
import {
  getOperator,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

const getDeMorganTransform = (prop: string[]): string[] => {
  console.log("in get demorgan transform");
  console.log(prop);
  const removedNegationProp = prop.slice(1);
  const removedBracketsProps = removeOutermostBrackets(removedNegationProp);

  const operator = getOperator(removedBracketsProps);

  if (!operator) return getNegation(removedBracketsProps);
  console.log("returned already");
  const [before, after] = splitArray(removedBracketsProps, operator);

  const negatedBefore = getNegation(before);

  const negatedAfter = getNegation(after);
  console.log(negatedBefore);
  console.log(negatedAfter);

  switch (operator) {
    case "|":
      console.log([...negatedBefore, "&", ...negatedAfter]);
      return [...negatedBefore, "&", ...negatedAfter];

    case "&":
      return [...negatedBefore, "|", ...negatedAfter];
  }
  console.log(2);

  return prop;
};

export default getDeMorganTransform;
