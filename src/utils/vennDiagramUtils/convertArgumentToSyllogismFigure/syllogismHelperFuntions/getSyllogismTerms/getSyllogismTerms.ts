import { Structure, Terms } from "../../../../../types/vennDiagramTypes/types";
import { checkForWordInString } from "./gstHelperFunctions/gstHelperFunctions";

const getSyllogismTerms = (p1: Structure, p2: Structure, conc: Structure) => {
  const syllogisticTerms = {} as Terms;

  syllogisticTerms.majorTerm = conc.predicate.toLowerCase();
  syllogisticTerms.minorTerm = conc.subject.toLowerCase();

  if (checkForWordInString(syllogisticTerms.majorTerm, p1.subject)) {
    syllogisticTerms.middleTerm = p1.predicate.toLowerCase();
  } else if (checkForWordInString(syllogisticTerms.majorTerm, p1.predicate)) {
    syllogisticTerms.middleTerm = p1.subject.toLowerCase();
  } else if (checkForWordInString(syllogisticTerms.minorTerm, p1.predicate)) {
    syllogisticTerms.middleTerm = p1.subject.toLowerCase();
  } else if (checkForWordInString(syllogisticTerms.minorTerm, p1.subject)) {
    syllogisticTerms.middleTerm = p1.predicate.toLowerCase();
  } else {
    // alert("this is not a valid function --from term fucntion");
    return null;
  }
  return syllogisticTerms;
};

export default getSyllogismTerms;
