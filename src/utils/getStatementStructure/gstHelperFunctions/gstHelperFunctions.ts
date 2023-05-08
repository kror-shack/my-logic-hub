import nlp from "compromise";

type NlpToken = {
  chunk: string;
  dirty: boolean;
  id: string;
  index: number[];
  normal: string;
  post: string;
  pre: string;
  tags: string[];
  text: string;
};

function expandContractions(statement: string) {
  let docStatement = nlp(statement);
  let docStatementArr: NlpToken[] = docStatement.contractions().expand()
    .document[0];
  let sentenceArr = [] as string[];
  let newStatement = docStatementArr.map((token: NlpToken) =>
    sentenceArr.push(token.text)
  );
  let expandedStatement = sentenceArr.join(" ");

  return docStatementArr ? expandedStatement : statement;
}

function getVerb(statement: string) {
  let doc = nlp(statement);
  let verb = doc?.match("#Verb")?.text();
  const words = verb.trim().split(" ");

  // Return the first word
  return words[0];
}

function checkForNegation(statement: string) {
  let doc = nlp(statement);
  return doc.match("#negative").found ||
    doc.match("no").found ||
    doc.match("none").found
    ? true
    : false;
}

function convertSentenceToArray(sentence: string): string[] {
  return sentence.split(" ");
}

function getWordIndex(word: string, array: string[]): number {
  return array.indexOf(word);
}

function getSubject(arr: string[], index: number): string {
  return arr.slice(0, index).join(" ");
}

function getPredicate(arr: string[], index: number): string {
  return arr.slice(index + 1).join(" ");
}

function checkForUniversalQuantifier(statement: string) {
  let words = ["all, none"];
  const regex = new RegExp(`\\b(${words.join("|")})\\b`, "i");
  return regex.test(statement);
}

function checkForExistentialQuantifier(statement: string) {
  let words = ["some", "few"];
  const regex = new RegExp(`\\b(${words.join("|")})\\b`, "i");
  return regex.test(statement);
}

function removeQuantifier(str: string) {
  const removedNegStr = removeNegation(str);

  const words = removedNegStr.split(" ");
  const quantifiers = ["all", "a", "an", "some", "none", "no", "few", "that"];

  // Check if the first word is a quantifier
  if (quantifiers.includes(words[0].toLowerCase())) {
    return words.slice(1).join(" ");
  }

  return removedNegStr;
}

function removeNegation(str: string) {
  const words = str.split(" ");
  const negations = ["not"];

  // Check if the first word is a negation
  if (negations.includes(words[0].toLowerCase())) {
    return words.slice(1).join(" ");
  }

  return str;
}

export {
  expandContractions,
  getVerb,
  checkForNegation,
  convertSentenceToArray,
  getWordIndex,
  getPredicate,
  getSubject,
  checkForUniversalQuantifier,
  checkForExistentialQuantifier,
  removeQuantifier,
  removeNegation,
};
