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

  // // ////// // console.logog("this is inside the get verb function");
  // // ////// // console.logog(words);
  return words;
}

// function getVerb(statement: string): string[] {
//   let doc = nlp(statement);
//   let verbArr = doc?.match("#Verb").docs;
//   // // ////// // console.logog(verbArr[0][0].tags);

//   // let verb = doc?.match("#Verb")?.text();

//   const verb: string[] = [];

//   for (let i = 0; i < verbArr.length; i++) {

//   }

//   // const words = verb.trim().split(" ");

//   // Return the first word
//   // // // ////// // console.logog("this is inside the get verb function");
//   // // // ////// // console.logog(words);
//   return verb;
// }

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

// function getWordIndex(word: string, array: string[]): number {
//   return array.indexOf(word);
// }
function getWordIndex(words: string[], array: string[]): number[] {
  let word: string;
  words.length > 1 ? (word = words.join(" ")) : (word = words[0]);
  if (word.includes(" ")) {
    const phraseWords = word.split(" ");
    const startIndex = array.indexOf(phraseWords[0]);
    let endIndex = startIndex + phraseWords.length - 1;

    for (let i = 1; i < phraseWords.length; i++) {
      if (array[startIndex + i] !== phraseWords[i]) {
        endIndex = -1;
        break;
      }
    }

    return [startIndex, endIndex];
  } else {
    const index = array.indexOf(word);
    return [index, index];
  }
}

function getSubject(arr: string[], index: number): string {
  return arr.slice(0, index).join(" ");

  // let doc = nlp(subjectArr);

  // return doc.nouns().toPlural().text();
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
  const quantifiers = [
    "all",
    "a",
    "an",
    "some",
    "none",
    "no",
    "few",
    "that",
    "therefore",
    "so",
  ];

  // Check if the first word is a quantifier
  function checkFirstWordForQuanitfier(words: string[]) {
    if (quantifiers.includes(words[0].toLowerCase()) && words.length > 1) {
      words.shift();
      checkFirstWordForQuanitfier(words);
    }
    return words.join(" ");
  }

  return checkFirstWordForQuanitfier(words);

  // return removedNegStr;
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
  // checkForUniversalQuantifier,
  checkForExistentialQuantifier,
  removeQuantifier,
  removeNegation,
};
