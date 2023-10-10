/**
 * Transforms input as to be displayed to the user.
 *
 *
 * @param input the input as string
 * @returns - the prettified input
 */
const transformSymbolsForDisplay = (input: string) => {
  const symbolMappings: Record<string, string> = {
    "&": "\u2227", // Unicode for AND (∧)
    "|": "\u2228", // Unicode for OR (∨)
    "~": "\u00AC", // Unicode for Negation (¬)
    "!": "\u00AC", // Unicode for Negation (¬)
  };

  const transformedInput: string = input.replace(
    /&|(\|)|(~|!)/g,
    (match) => symbolMappings[match]
  );

  return transformedInput;
};

/**
 * Transforms input for processing
 *
 * This function transforms standard logical symbols to
 * symbols that are more easier to code with. Although they do not affect
 * the processing of the argument, typing & is much effecient than \u2227.
 *
 * @param input - the input as string
 * @returns -the input with transformed symbols.
 */
function transformSymbolsForProcessing(input: string): string {
  const reverseSymbolMappings: Record<string, string> = {
    "\u2227": "&", // Unicode for AND (∧)
    "\u2228": "|", // Unicode for OR (∨)

    "\u00AC": "~", // Unicode for Negation (¬)
    "~": "~", // Keep `~` as itself
    "!": "\u00AC", // Unicode for Negation (¬)
  };

  const reversedInput: string = input.replace(
    /[\u2227\u2228\u00AC~!]/g,
    (match) => reverseSymbolMappings[match]
  );
  return reversedInput;
}

export { transformSymbolsForDisplay, transformSymbolsForProcessing };
