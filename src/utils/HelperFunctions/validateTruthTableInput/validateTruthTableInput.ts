import { convertStringToArray } from "../../TruthTableUtils/parseInput/parseInputHelpers/parseInputHelperFunctions";
import checkInputForErrors from "../checkInputForErrors/checkInputForError";
import checkPropositionalInputForErrors from "../checkPropositionalInputForErrors/checkPropositionalInputForErrors";
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
* Lowercase letters are permitted since
* strict restrictions are not necessary for a truth table.
* Uppercase and lowercase variations of the same alphabet are
* treated as distinct predicates.

 *
 * @param input - The string to be checked.
 * @returns - false if there is no error, otherwise a string with a helpful message to the user about the error.
 */
function validateTruthTableInput(input: string): false | string {
  const incorrectWffSharedError = checkInputForErrors(input);
  if (
    incorrectWffSharedError &&
    incorrectWffSharedError !==
      "Use of lowercase letters as predicates is not recommended."
  ) {
    if (
      incorrectWffSharedError ===
      "Empty premises serve no purpose. Consider removing them."
    ) {
      return "No argument has been passed to the input.";
    }
    return incorrectWffSharedError;
  }
  const propositionalLogicErrors = checkPropositionalInputForErrors(input);
  if (
    propositionalLogicErrors &&
    propositionalLogicErrors !==
      "Use of lowercase letters as predicates is not recommended."
  ) {
    if (
      incorrectWffSharedError ===
      "Empty premises serve no purpose. Consider removing them."
    ) {
      return "No argument has been passed to the input.";
    }
    return propositionalLogicErrors;
  }

  const transformedSymbolsInput = transformSymbolsForProcessing(input);
  const inputArr = convertStringToArray(transformedSymbolsInput);

  for (let i = 0; i < inputArr.length; i++) {
    const current = inputArr[i];
    if (
      /^[A-Za-z]+$/.test(current) &&
      inputArr[i + 1] &&
      /^[A-Za-z]+$/.test(inputArr[i + 1])
    ) {
      return `The predicates ${current} and ${
        inputArr[i + 1]
      } must contain an operator between them. Note: case variations of the same alphabet will be treated as distinct predicates.`;
    }
  }

  return false;
}

export default validateTruthTableInput;
