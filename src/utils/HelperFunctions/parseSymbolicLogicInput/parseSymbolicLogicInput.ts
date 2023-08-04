import {
  convertPremiseToArray,
  joinVariablesToPredicates,
  removeWhitespaces,
  replaceValues,
} from "../parsingHelperFunctions/parsingHelperFunctions";
import removeOutermostBrackets from "../removeOutermostBrackets/removeOutermostBrackets";

const parseSymbolicLogicInput = (premise: string) => {
  const removedWhitespacesPremise = removeWhitespaces(premise);
  const premsieArr = convertPremiseToArray(removedWhitespacesPremise);
  const consistentPremiseArr = replaceValues(premsieArr);
  const removedBracketsPremiseArr =
    removeOutermostBrackets(consistentPremiseArr);
  const joinedVariablesArr = joinVariablesToPredicates(
    removedBracketsPremiseArr
  );
  return joinedVariablesArr;
};

export default parseSymbolicLogicInput;
