import { Structure } from "../../../../types/types";
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
} from "/home/krorshack/repos/projects/logic-app/src/utils/convertArgumentToSyllogismFigure/syllogismHelperFuntions/getStatementStructure/gssHelperFunctions/gstHelperFunctions/gssHelperFunctions";

const getStatementStructure = (statement: string) => {
  let expandedStatement = expandContractions(statement);

  let verb = getVerb(expandedStatement);

  if (!verb) return null;

  // // // //// console.log("in the get statement structure function");

  let containsNegation = checkForNegation(expandedStatement);
  let statementArr = convertSentenceToArray(expandedStatement);
  let verbIndex = getWordIndex(verb, statementArr);
  // // // //// console.log(`this is the verb index: ${verbIndex}`);
  let subject = getSubject(statementArr, verbIndex[0]);
  // // // //// console.log(`this is the subject: ${subject}`);
  let predicate = getPredicate(statementArr, verbIndex[0]);
  // // // //// console.log(`this is the predicate: ${predicate}`);
  let sentenceStructure = {} as Structure;
  sentenceStructure.subject = removeQuantifier(subject).toLowerCase();
  sentenceStructure.predicate = removeQuantifier(predicate).toLowerCase();

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
