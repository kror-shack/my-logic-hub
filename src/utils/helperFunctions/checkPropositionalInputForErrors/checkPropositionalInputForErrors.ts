import { convertStringToArray } from "../../truthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkInputForErrors from "../checkInputForErrors/checkInputForError";
import {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
} from "../tranfromSymbols/transformSymbols";

/**
 * Checks if input is a wff in propositional logic.
 *
 * This function checks against standard logical practices to see whether the user provided input
 * is a well formed formula or not.
 *
 * @param input - The string to be checked.
 * @returns - false if there is no error, otherwise a string with a helpful message to the user about the error.
 */
function checkPropositionalInputForErrors(input: string): false | string {
  const incorrectWffSharedError = checkInputForErrors(input);
  if (incorrectWffSharedError) return incorrectWffSharedError;

  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  const hasLowercase = inputArr.some((element) => /[a-z]/.test(element));

  if (inputArr.length < 1)
    return "Empty premises serve no purpose. Consider removing them.";
  const symbolArray = ["&", "|", "->", "<->"];

  for (let i = 0; i < inputArr.length; i++) {
    const current = inputArr[i];

    if (current === "\u2200" || current === "\u2203") {
      return "Quantifiers are not within the scope of propositional logic. Please see First Order Predicate Logic Pages";
    }
  }
  if (hasLowercase) {
    return "Use of lowercase letters as predicates is not recommended.";
  }

  return false;
}

export default checkPropositionalInputForErrors;
