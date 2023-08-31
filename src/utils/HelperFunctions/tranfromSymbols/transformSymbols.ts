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
