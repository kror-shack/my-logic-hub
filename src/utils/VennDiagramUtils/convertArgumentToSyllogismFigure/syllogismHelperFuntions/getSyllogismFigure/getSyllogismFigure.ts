import { Structure } from "../../../../../types/VennDiagramTypes/types";
import { checkForWordInString } from "../getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

// assuming that the premises are passed in order
// of the mood
const getSyllogismFigure = (
  syllogisticType: string,
  p1: Structure,
  p2: Structure,
  conc: Structure
) => {
  if (checkForWordInString(conc.predicate, p1.subject)) {
    if (checkForWordInString(conc.subject, p2.subject)) {
      return `${syllogisticType}-2`;
    } else return `${syllogisticType}-4`;
  } else {
    if (checkForWordInString(conc.subject, p2.subject)) {
      return `${syllogisticType}-1`;
    } else return `${syllogisticType}-3`;
  }
};

export default getSyllogismFigure;
