import { SyllogisticFigure } from "../../../types/vennDiagramTypes/types";
import getStatementStructure from "./syllogismHelperFuntions/getStatementStructure/getStatementStructure";
import getSyllogismFigure from "./syllogismHelperFuntions/getSyllogismFigure/getSyllogismFigure";
import getSyllogismMood from "./syllogismHelperFuntions/getSyllogismMood/getSyllogsimMood";
import getSyllogismTerms from "./syllogismHelperFuntions/getSyllogismTerms/getSyllogismTerms";

/**
 * Convert NL argument to syllogistic figure
 *
 * @param premise1 - the first premise of the argument
 * @param premise2 - the second premise of the argument
 * @param conclusion - the conclusion to be reached
 * @returns
 */
const convertArgumentToSyllogismFigure = (
  premise1: string,
  premise2: string,
  conclusion: string
): SyllogisticFigure | null => {
  const p1 = getStatementStructure(premise1);
  const p2 = getStatementStructure(premise2);
  const conc = getStatementStructure(conclusion);

  if (!p1 || !p2 || !conc) {
    return null;
  }
  const terms = getSyllogismTerms(p1!, p2!, conc!);
  if (!terms) {
    return null;
  }
  const mood = getSyllogismMood(terms, p1, p2, conc);

  if (mood[0] === p1?.type) {
    const figure = getSyllogismFigure(mood, p1!, p2!, conc!);
    return {
      figure: figure,
      majorPremise: premise1,
      minorPremise: premise2,
      majorTerm: terms.majorTerm,
      minorTerm: terms.minorTerm,
      middleTerm: terms.middleTerm,
      premise1: p1,
      premise2: p2,
      conc: conc,
    };
  } else {
    const figure = getSyllogismFigure(mood, p2!, p1!, conc!);
    return {
      figure: figure,
      majorPremise: premise2,
      minorPremise: premise1,
      majorTerm: terms.majorTerm,
      minorTerm: terms.minorTerm,
      middleTerm: terms.middleTerm,
      premise1: p1,
      premise2: p2,
      conc: conc,
    };
  }
};

export default convertArgumentToSyllogismFigure;
