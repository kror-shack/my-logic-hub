function convertPremiseToArray(inputSpaced: string): string[] {
  const result: string[] = [];
  const input = removeWhitespaces(inputSpaced);
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (isForAllQuantifier(current)) {
      const quantifiers = input[i + 1];
      temp = `${current}(${quantifiers})`;
      i += quantifiers.length;
      result.push(temp);
      temp = "";
      continue;
    }
    if (isThereExistsQuantifier(current)) {
      const quantifiers = input[i + 1];
      temp = `${current}(${quantifiers})`;
      i += quantifiers.length;
      result.push(temp);
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
        if (input[i + 1] === "\u2203" || input[i + 1] === "\u2200") {
          temp += "~";
          i--;
        } else temp += `~${input[i + 1 + numberOfNegations]}`;
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

function replaceValues(arr: string[]): string[] {
  const result: string[] = [];

  for (const element of arr) {
    if (element === "{" || element === "[") {
      result.push("(");
    } else if (element === "}" || element === "]") {
      result.push(")");
    } else if (element === "∨") {
      result.push("|");
    } else if (element === "∧") {
      result.push("&");
    } else if (element === "&&") {
      result.push("&");
    } else if (element === "=>") {
      result.push("->");
    } else if (element === "≡") {
      result.push("<->");
    } else if (element === "!") {
      result.push("~");
    } else {
      result.push(element);
    }
  }

  return result;
}

const joinVariablesToPredicates = (inputArr: string[]) => {
  const modifiedArray: string[] = [];
  let i = 0;

  while (i < inputArr.length) {
    if (inputArr[i].match(/[A-Z]/)) {
      let joinedElement = inputArr[i];
      i++;

      while (i < inputArr.length && inputArr[i].match(/[a-zA-Z]/)) {
        joinedElement += inputArr[i];
        i++;
      }

      modifiedArray.push(joinedElement);
    } else {
      modifiedArray.push(inputArr[i]);
      i++;
    }
  }

  return modifiedArray;
};

function removeWhitespaces(input: string): string {
  return input.replace(/\s/g, "");
}

/**  Non exported Helper Functions */

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

/**  Non exported Helper Functions --End */

export {
  removeWhitespaces,
  convertPremiseToArray,
  replaceValues,
  joinVariablesToPredicates,
};
