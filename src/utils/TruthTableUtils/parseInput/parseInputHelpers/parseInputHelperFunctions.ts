function convertStringToArray(input: string): string[] {
  const result: string[] = [];
  let temp = "";

  for (let i = 0; i < input.length; i++) {
    const current = input[i];

    if (current === " ") {
      continue; // Skip whitespace
    }

    if (
      current === "-" &&
      input[i + 1] === ">" &&
      (temp === "" || temp === "-")
    ) {
      console.log("the implication exists");
      temp += "->";
      i += 1;
      console.log(temp);
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
    } else {
      result.push(element);
    }
  }

  return result;
}

export { convertStringToArray, replaceValues };
