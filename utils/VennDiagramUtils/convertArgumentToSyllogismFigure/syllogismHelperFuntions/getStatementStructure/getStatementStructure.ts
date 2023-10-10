import { Structure } from "../../../../../types/VennDiagramTypes/types";
import {
  checkForExistentialQuantifier,
  checkForNegation,
  convertSentenceToArray,
  expandContractions,
  getVerb,
  getWordIndex,
  getPredicate,
  removeQuantifier,
  getSubject,
} from "./gssHelperFunctions/gstHelperFunctions/gssHelperFunctions";

const getStatementStructure = (statement: string) => {
  let expandedStatement = expandContractions(statement);

  let verb = getVerb(expandedStatement);

  if (!verb) return null;

  let containsNegation = checkForNegation(expandedStatement);
  let statementArr = convertSentenceToArray(expandedStatement);
  let verbIndex = getWordIndex(verb, statementArr);
  let subject = getSubject(statementArr, verbIndex[0]);
  let predicate = getPredicate(statementArr, verbIndex[0]);
  let sentenceStructure = {} as Structure;
  sentenceStructure.subject = removeQuantifier(subject).toLowerCase();
  sentenceStructure.predicate = removeQuantifier(predicate).toLowerCase();

  if (subject.toLowerCase().includes("only")) {
    /**
     * ONLY IMPLIES UNIVERSAL AFFIRMATION
     * BUT WHERE THE PREDICATE IS CONTAINED WITHIN
     * THE SUBJECT INSTEAD OF THE NORMAL SUBJECT CONTAINMENT WITHIN
     * PREDICATE eg: All men are moral vs Only men are mortal
     */
    const subj = sentenceStructure.subject;
    const predicate = sentenceStructure.predicate;
    sentenceStructure.predicate = subj;
    sentenceStructure.subject = predicate;
  }

  if (containsNegation) {
    //split into E  & O types
    checkForExistentialQuantifier(subject)
      ? (sentenceStructure.type = "O")
      : (sentenceStructure.type = "E");
  } else {
    //split into A and I types
    checkForExistentialQuantifier(subject)
      ? (sentenceStructure.type = "I")
      : (sentenceStructure.type = "A");
  }

  return sentenceStructure;
};

export default getStatementStructure;
