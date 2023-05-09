import { checkForWordInString } from "../getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

type Terms = {
  majorTerm: string;
  minorTerm: string;
  middleTerm: string;
};

const getSyllogismMood = (
  terms: Terms,
  p1: Structure,
  p2: Structure,
  conc: Structure
) => {
  if (
    checkForWordInString(terms.majorTerm, p1.subject) ||
    checkForWordInString(terms.majorTerm, p1.predicate)
  ) {
    return `${p1.type}${p2.type}${conc.type}`;
  }
  return `${p2.type}${p1.type}${conc.type}`;
};

export default getSyllogismMood;
