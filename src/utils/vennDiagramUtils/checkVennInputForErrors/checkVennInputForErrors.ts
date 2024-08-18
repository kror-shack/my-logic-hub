import getStatementStructure from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/getStatementStructure";
import { getVerb } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/gssHelperFunctions/gstHelperFunctions/gssHelperFunctions";
import { countUniqueTerms } from "../vennHelperFunctions/vennHelperFunctions";

/**
 * Check Natural Language premise for errors.
 *
 * This function checks the premises against standard syllogistic argument rules
 * to see whether it is a valid standard-form categorical syllogism or not.
 *
 * @param argument - the premises in english to be checked for error
 * @returns - false if there are no errors, otherwise a helpful error message for the user.
 */
const checkVennInputForErrors = (argument: [string, string, string]) => {
  const firstPremise = argument[0];

  const secondPremise = argument[1];

  const conclusion = argument[2];

  const p1 = getStatementStructure(firstPremise);
  const p2 = getStatementStructure(secondPremise);
  const conc = getStatementStructure(conclusion);

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

  if (numberOfTerms !== 3) {
    return "Fallacy of Four Terms: A valid standard-form categorical syllogism must contain exactly three terms, each of which is used in the same sense throughout the argument.";
  }

  const concTermsAreSame = conc.subject === conc.predicate;

  const conclusionIsTautology =
    concTermsAreSame && (conc.type === "A" || conc.type === "I");
  const conclusionIsContradiction =
    concTermsAreSame && (conc.type === "E" || conc.type === "O");

  if (conclusionIsTautology) {
    return "The conclusion is a tautology, meaning it is trivially true and does not provide any new information.";
  }

  if (conclusionIsContradiction) {
    return "Contradictory Conclusion: The conclusion asserts that something is both true and false at the same time, which is logically impossible.";
  }

  return false;
};

export default checkVennInputForErrors;
