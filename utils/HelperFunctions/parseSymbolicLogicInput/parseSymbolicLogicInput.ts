import {
  convertPremiseToArray,
  joinVariablesToPredicates,
  removeWhitespaces,
  replaceValues,
} from "../parsingHelperFunctions/parsingHelperFunctions";
import removeOutermostBrackets from "../removeOutermostBrackets/removeOutermostBrackets";
import { transformSymbolsForProcessing } from "../tranfromSymbols/transformSymbols";

/**
 * Parse a premise string.
 *
 * This function takes a premise string of symbolic logic and parses it
 * for processing. It transforms the symbols for consistency and returns an array where
 * each element represents either a primitive wff, an operator, or a bracket.
 *
 * @param  premise - The premise string to be parsed in propositional or first order logic.
 * @returns  - This function returns the parsed string as an array.
 */
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
