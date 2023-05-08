import {
  getSubject,
  checkForExistentialQuantifier,
  checkForNegation,
  convertSentenceToArray,
  expandContractions,
  getVerb,
  getWordIndex,
  getPredicate,
  removeQuantifier,
} from "./gstHelperFunctions/gstHelperFunctions";

type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

const getStatementStructure = (statement: string) => {
  let expandedStatement = expandContractions(statement);

  let verb = getVerb(expandedStatement);

  if (!verb) return null;

  let containsNegation = checkForNegation(expandedStatement);
  let statementArr = convertSentenceToArray(expandedStatement);
  let verbIndex = getWordIndex(verb, statementArr);
  let subject = getSubject(statementArr, verbIndex);
  let predicate = getPredicate(statementArr, verbIndex);
  let sentenceStructure = {} as Structure;
  sentenceStructure.subject = removeQuantifier(subject);
  sentenceStructure.predicate = removeQuantifier(predicate);

  if (containsNegation) {
    //split into E  & O types
    checkForExistentialQuantifier(subject)
      ? (sentenceStructure.type = "O type")
      : (sentenceStructure.type = "E type");
  } else {
    //split into A and I types
    checkForExistentialQuantifier(subject)
      ? (sentenceStructure.type = "I type")
      : (sentenceStructure.type = "A type");
  }

  return sentenceStructure;
};

export default getStatementStructure;
