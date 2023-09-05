/**
 * Prettifies Output
 *
 * This function prettifies the output to standard logical symbols.
 *
 * @param input - the string containing the logical expression
 * @returns - a prettified version of the input.
 */
const formatOutut = (input: string) => {
  const replacements: Record<string, string> = {
    "&": "∧",
    "|": "∨",
  };
  let result = "";

  for (let i = 0; i < input.length; i++) {
    const currentChar = input[i];
    const nextChar = input[i + 1];
    const nextNextChar = input[i + 2];

    result += replacements[currentChar] || currentChar;

    if (
      (currentChar === "-" && nextChar === ">") ||
      (currentChar === "<" && nextChar === "-" && nextNextChar === ">")
    ) {
      // Preserve "->" and "<->" without adding a space
      continue;
    }

    // Add a space after every other element
    if (currentChar !== " " && nextChar !== " " && nextChar !== undefined) {
      result += " ";
    }
  }

  return result;
};

export default formatOutut;
