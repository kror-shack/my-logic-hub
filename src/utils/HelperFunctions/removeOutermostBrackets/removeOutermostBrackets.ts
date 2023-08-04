function removeOutermostBrackets(arr: string[]): string[] {
  if (arr.length >= 2 && arr[0] === "~") {
    if (arr[1] === "(" && arr[arr.length - 1] === ")" && arr.length === 3) {
      return ["~", arr[2]];
    } else {
      return arr;
    }
  } else {
    return removeOuterBrackets(arr);
  }
}
function removeOuterBrackets(arr: string[]): string[] {
  let nestingLevel = 0;
  let hasOuterBrackets = false;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === "(") {
      if (nestingLevel === 0) {
        hasOuterBrackets = true;
      }
      nestingLevel++;
    } else if (arr[i] === ")") {
      nestingLevel--;
      if (nestingLevel === 0) {
        console.log("the nesting level reached zero");
        hasOuterBrackets = false;
        return arr; // Set to false if nesting level returns to zero more than once
      }
    }
  }
  if (
    hasOuterBrackets &&
    nestingLevel === 1 &&
    arr[arr.length - 1] === ")" &&
    arr[0] === "("
  ) {
    return arr.slice(1, arr.length - 1);
  } else {
    return arr;
  }
}

export default removeOutermostBrackets;
