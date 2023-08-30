import {
  convertPremiseToArray,
  joinVariablesToPredicates,
  removeWhitespaces,
  replaceValues,
} from "../parsingHelperFunctions/parsingHelperFunctions";
import removeOutermostBrackets from "../removeOutermostBrackets/removeOutermostBrackets";
import { transformSymbolsForProcessing } from "../tranfromSymbols/transformSymbols";

const parseSymbolicLogicInput = (premise: string, skol?: boolean) => {
  const transformedSymbolsPremise = transformSymbolsForProcessing(premise);
  const removedWhitespacesPremise = removeWhitespaces(
    transformedSymbolsPremise
  );

  const premsieArr = convertPremiseToArray(removedWhitespacesPremise, skol);
  const consistentPremiseArr = replaceValues(premsieArr);
  const removedBracketsPremiseArr =
    removeOutermostBrackets(consistentPremiseArr);
  const joinedVariablesArr = joinVariablesToPredicates(
    removedBracketsPremiseArr
  );
  return joinedVariablesArr;
};

export default parseSymbolicLogicInput;
