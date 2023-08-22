import nlp from "compromise";

function checkForWordInString(word: string, statement: string): boolean {
  if (statement.includes(word)) return true;

  let docWord = nlp(word.toLowerCase());
  // // console.log(`these are the arguments: ${word} ${statement}`);

  let pluralOfWord = docWord.nouns().toPlural().text();

  let pluralWord = pluralOfWord ? pluralOfWord : word.toLowerCase();

  const statmentWords = statement.split(" ");

  // Apply pluralization to each word
  const updatedWords = statmentWords.map((word) => {
    let docStatement = nlp(word.toLowerCase());

    let pluralOfWord = docStatement.nouns().toPlural().text();

    return pluralOfWord ? pluralOfWord : word.toLowerCase();
  });

  // Join the updated words back into a string
  const pluralOfStatement = updatedWords.join(" ");

  let pluralStatement = pluralOfStatement
    ? pluralOfStatement
    : statement.toLowerCase();

  const statementArr = pluralStatement.split(" ");

  if (pluralWord.split(" ").length === 1) {
    if (statementArr.includes(pluralWord)) return true;

    // according to Oxford English Corpus,
    // around 75% of English nouns can be made plural by adding -s.
    return (
      statementArr.includes(`${pluralWord}s`) ||
      statementArr.includes(`${pluralWord}es`)
    );
  }

  //if the word passed in is a phrase
  else {
    // const words = pluralWord.toLowerCase().split(" ");
    // const statementArr = statement.toLowerCase().split(" ");
    // console.log(words, statementArr);

    // for (let i = 0; i < words.length; i++) {
    // const word = words[i];
    const pluralWords = nlp(pluralWord).nouns().toPlural().text() || word;

    if (
      pluralStatement.includes(pluralWords) ||
      pluralStatement === pluralWords
    ) {
      return true;
    } else {
      // According to Oxford English Corpus, around 75% of English nouns can be
      // made plural by adding -s.
      if (
        statementArr.includes(`${pluralWords}s`) ||
        statementArr.includes(`${pluralWords}es`)
      ) {
        return true;
      }
    }
    // }

    return false;
  }
}

export { checkForWordInString };
