function convertQuantifableStringToPropositonArr(
  inputSpaced: string
): string[] {
  const result: string[] = [];
  const input = removeWhitespaces(inputSpaced);
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (isForAllQuantifier(current)) {
      const quantifiers = extractContentBetweenBrackets(input.slice(i + 1));
      console.log(quantifiers);
      temp = `${current}(${quantifiers})`;
      console.log(temp);
      i += quantifiers.length + 2;
      result.push(temp);
      temp = "";
      continue;
    }
    if (isThereExistsQuantifier(current)) {
      const quantifiers = extractContentBetweenBrackets(input.slice(i + 1));
      temp = `${current}(${quantifiers})`;
      i += quantifiers.length + 2;
      result.push(temp);
      temp = "";
      continue;
    }

    if (current === "^") {
      temp = `${result.pop()}${current}${input[i + 1]}`;
      result.push(temp);

      i += 1;
      temp = "";
      continue;
    }

    if (
      current === "-" &&
      input[i + 1] === ">" &&
      (temp === "" || temp === "-")
    ) {
      temp += "->";
      i += 1;
      result.push(temp);
      temp = "";
      continue;
    }

    if (
      current === "<" &&
      input[i + 1] === "-" &&
      input[i + 2] === ">" &&
      (temp === "" || temp === "-")
    ) {
      temp += "<->";
      i += 2;
      result.push(temp);
      temp = "";
      continue;
    }

    if (current === "~" && input[i + 1] !== "(") {
      const slicedArr = input.slice(i + 1);
      const numberOfNegations = countConsecutiveNegations(slicedArr);
      const negation =
        numberOfNegations % 2 === 0 || numberOfNegations === 0 ? true : false;

      if (negation) {
        temp += `~${input[i + 1 + numberOfNegations]}`;
      } else {
        temp += `${input[i + 1 + numberOfNegations]}`;
      }
      i += numberOfNegations + 1;
      result.push(temp);
      temp = "";
      continue;
    }

    if (temp !== "") {
      result.push(temp);
      temp = "";
    }

    result.push(current);
  }

  if (temp !== "") {
    result.push(temp);
  }

  return result;
}

function removeWhitespaces(input: string): string {
  return input.replace(/\s/g, "");
}

function countConsecutiveNegations(input: string): number {
  let count = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === "~") {
      count++;
    } else {
      break;
    }
  }
  return count;
}

const isForAllQuantifier = (char: string) => {
  return char === "\u2200";
};

const isThereExistsQuantifier = (char: string) => {
  return char === "\u2203";
};

const extractContentBetweenBrackets = (input: string): string => {
  let content = "";
  let nestingLevel = 0;
  let foundStartingBracket = false;

  for (const char of input) {
    if (char === "(") {
      nestingLevel++;
      foundStartingBracket = true;
    } else if (char === ")" && foundStartingBracket) {
      nestingLevel--;
      if (nestingLevel === 0) {
        break;
      }
    } else if (foundStartingBracket) {
      content += char;
    }
  }

  return content;
};

export { convertQuantifableStringToPropositonArr };
