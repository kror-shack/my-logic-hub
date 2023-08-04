import getNegation from "../getNegation/getNegation";
import {
  getOperator,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";

const getDeMorganTransform = (prop: string[]): string[] => {
  console.log(11);
  console.log(prop);
  const removedNegationProp = prop.slice(1);
  console.log(22);
  const removedBracketsProps = removeOutermostBrackets(removedNegationProp);
  console.log(33);
  console.log(getOperator(removedBracketsProps));

  const operator = getOperator(removedBracketsProps);

  console.log(getOperator(removedBracketsProps));
  console.log(operator);
  if (!operator) return getNegation(removedBracketsProps);
  console.log("returned already");
  const [before, after] = splitArray(removedBracketsProps, operator);

  const negatedBefore = getNegation(before);

  const negatedAfter = getNegation(after);
  console.log(negatedBefore);
  console.log(negatedAfter);

  switch (operator) {
    case "->":
      console.log(1);
      return [...before, "&", ...negatedAfter];

    case "|":
      return [...negatedBefore, "&", ...negatedAfter];

    case "&":
      return [...negatedBefore, "|", ...negatedAfter];
  }
  console.log(2);

  return prop;
};

export default getDeMorganTransform;
