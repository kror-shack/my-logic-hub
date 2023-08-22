import getStatementStructure from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/getStatementStructure";
import { getVerb } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/gssHelperFunctions/gstHelperFunctions/gssHelperFunctions";
import { countUniqueTerms } from "../vennHelperFunctions/vennHelperFunctions";

const checkVennInputForErrors = (argument: [string, string, string]) => {
  const firstPremise = argument[0];
  const secondPremise = argument[1];
  const conclusion = argument[2];
  const p1 = getStatementStructure(firstPremise);
  const p2 = getStatementStructure(secondPremise);
  const conc = getStatementStructure(conclusion);

  console.log(getVerb(firstPremise));
  // check for verb
  if (getVerb(firstPremise)[0] === "") {
    return "The first premise is missing a verb.";
  } else if (getVerb(secondPremise)[0] === "") {
    return "The second premise is missing a verb.";
  } else if (getVerb(conclusion)[0] === "") {
    return "The conclusion is missing a verb.";
  }

  //check for subject and predicate
  if (!p1?.subject) {
    return "The first premise is missing a subject.";
  } else if (!p1.predicate) {
    return "The first premise is missing a predicate.";
  } else if (!p2?.subject) {
    return "The second premise is missing a subject.";
  } else if (!p2.predicate) {
    return "The second premise is missing a predicate.";
  } else if (!conc?.subject) {
    return "The conclusion is missing a subject.";
  } else if (!conc.predicate) {
    return "The conclusion is missing a predicate.";
  }

  const terms =
    p1?.predicate +
    " " +
    p1?.subject +
    " " +
    p2?.predicate +
    " " +
    p2?.subject +
    " " +
    conc?.predicate +
    " " +
    conc?.subject;

  const numberOfTerms = countUniqueTerms(terms);

  //check for number of terms
  if (numberOfTerms !== 3) {
    return "A valid standard-form categorical syllogism must contain exactly three terms, each of which is used in the same sense throughout the argument.";
  }

  return false;
};

export default checkVennInputForErrors;
