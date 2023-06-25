function convertStringToPropositionArr(inputSpaced: string): string[] {
  const result: string[] = [];
  const input = removeWhitespaces(inputSpaced);
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (
      current === "-" &&
      input[i + 1] === ">" &&
      (temp === "" || temp === "-")
    ) {
      console.log("it is implication");
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
      console.log(slicedArr);
      const numberOfNegations = countConsecutiveNegations(slicedArr);
      const negation =
        numberOfNegations % 2 === 0 || numberOfNegations === 0 ? true : false;
      console.log(numberOfNegations);
      console.log(negation);
      if (negation) {
        temp += `~${input[i + 1 + numberOfNegations]}`;
      } else {
        temp += `${input[i + 1 + numberOfNegations]}`;
        console.log("temp" + temp);
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

export { convertStringToPropositionArr, replaceValues };
