import nlp from "compromise";

function checkForWordInString(word: string, statement: string): boolean {
  let docWord = nlp(word.toLowerCase());

  let pluralOfWord = docWord.nouns().toPlural().text();

  let pluralWord = pluralOfWord ? pluralOfWord : word.toLowerCase();
  let docStatement = nlp(statement.toLowerCase());

  let pluralOfStatement = docStatement.nouns().toPlural().text();

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
    const words = pluralWord.toLowerCase().split(" ");
    const statementArr = statement.toLowerCase().split(" ");

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const pluralWord = nlp(word).nouns().toPlural().text() || word;

      if (!statementArr.includes(pluralWord)) {
        // According to Oxford English Corpus, around 75% of English nouns can be
        // made plural by adding -s.
        if (
          !statementArr.includes(`${pluralWord}s`) &&
          !statementArr.includes(`${pluralWord}es`)
        ) {
          return false;
        }
      }
    }

    return true;
  }
}

export { checkForWordInString };
