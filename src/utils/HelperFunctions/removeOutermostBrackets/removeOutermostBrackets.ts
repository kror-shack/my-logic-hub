import { removeOuterBrackets } from "../deductionHelperFunctions/deductionHelperFunctions";

/**
 * Removes outermost brackets
 *
 * This function checks if the outermost brackets are of the same
 * pair, if so it removes them. The check restricts (P) -> (Q) to be treated the same as (P -> Q).
 *
 * @param arr - The premise to remove brackets from
 * @returns the premise with or without the outermost brackets, depending on nature of the brackets.
 */
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

export default removeOutermostBrackets;
