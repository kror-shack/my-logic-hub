import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import getStatementStructure from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/getStatementStructure";
import { countUniqueTerms } from "../vennHelperFunctions/vennHelperFunctions";

export const checkInputForFallacies = (
  syllogisticFigure: SyllogisticFigure
) => {
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

  const sameTerms = majorTerm === middleTerm || minorTerm === middleTerm;
  const undistributedTerms =
    premise1.predicate === premise2.predicate &&
    premise1.type === "A" &&
    premise2.type === "A";
  if (sameTerms || undistributedTerms) {
    return "Fallacy of Undistributed Middle or Illicit Process: The middle term must be distributed in at least one premise, and all terms distributed in the conclusion must also be distributed in the corresponding premise.";
  }

  const premisesType = [
    syllogisticFigure.premise1.type,
    syllogisticFigure.premise2.type,
  ];

  const isExclusive = premisesType.every(
    (type) => type === "E" || type === "O"
  );
  if (isExclusive) {
    return "Fallacy of Exclusive Premises: No standard-form categorical syllogism having two negative premises is valid.";
  }

  const isUniversal = premisesType.every(
    (type) => type === "A" || type === "E"
  );

  if (isUniversal && (conc.type === "O" || conc.type === "I")) {
    return "Existential Fallacy: No valid standard-form categorical syllogism with a particular conclusion can have two universal premises";
  }
  return null;
};
