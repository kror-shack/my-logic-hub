import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import { checkForWordInString } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

/**
 * Returns true if the argument is a standard form
 * categorical syllogism i.e., the first premise is the major
 * premise and the second premise is the minor premise. Otherwise
 * returns false
 */
export const checkIfInputIsSFCS = (syllogisticFigure: SyllogisticFigure) => {
  const {
    majorTerm,
    minorTerm,
    middleTerm,
    figure,
    majorPremise,
    minorPremise,
    premise1,
    premise2,
    conc,
  } = syllogisticFigure;

  const majorTermIsInSecondPremise =
    checkForWordInString(majorTerm, premise2.subject) ||
    checkForWordInString(majorTerm, premise2.predicate);
  const minorTermIsInFirstPremise =
    checkForWordInString(minorTerm, premise1.subject) ||
    checkForWordInString(minorTerm, premise1.predicate);
  if (majorTermIsInSecondPremise && minorTermIsInFirstPremise) {
    return false;
  }

  return true;
};
