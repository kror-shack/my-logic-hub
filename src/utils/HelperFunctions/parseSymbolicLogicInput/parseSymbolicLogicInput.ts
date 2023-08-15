import {
  convertPremiseToArray,
  joinVariablesToPredicates,
  removeWhitespaces,
  replaceValues,
} from "../parsingHelperFunctions/parsingHelperFunctions";
import removeOutermostBrackets from "../removeOutermostBrackets/removeOutermostBrackets";
import { transformSymbolsForProcessing } from "../tranfromSymbols/transformSymbols";

const parseSymbolicLogicInput = (premise: string) => {
  const transformedSymbolsPremise = transformSymbolsForProcessing(premise);
  const removedWhitespacesPremise = removeWhitespaces(
    transformedSymbolsPremise
  );

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
