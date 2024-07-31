import getBiconditionalTruthTable from "../../truthTableUtils/getBiconditionalTruthTable/getBiconditionalTruthTable";
import {
  getAndSymbol,
  getBiConditionalSymbol,
  getImplicationSymbol,
  getNegationSymbol,
  getOrSymbol,
} from "../getSymbolsFromLS/getSymbolsFromLS";

/**
 * Transforms input as to be displayed to the user.
 *
 *
 * @param input the input as string
 * @returns - the prettified input
 */
const transformSymbolsForDisplay = (input: string) => {
  // Retrieve symbols from local storage or use default values
  const symbolMappings: Record<string, string> = {
    "&": getAndSymbol(), // AND (∧)
    "|": getOrSymbol(), // OR (∨)
    "~": getNegationSymbol(), // Negation (¬)
    "->": getImplicationSymbol(), // IMPLICATION (→)
    "<->": getBiConditionalSymbol(), // BICONDITIONAL (↔)
  };

  // Replace symbols in the input based on symbolMappings
  const transformedInput: string = input.replace(
    /&|\||~|!|->|<->/g,
    (match) => symbolMappings[match]
  );

  return transformedInput;
};

/*
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
    "~": "~",
    "!": "\u00AC", // Unicode for Negation (¬)
  };

  const reversedInput: string = input.replace(
    /[\u2227\u2228\u00AC~!]/g,
    (match) => reverseSymbolMappings[match]
  );
  return reversedInput;
}

function transformSymbolsToDefault(input: string): string {
  const reverseSymbolMappings: Record<string, string> = {
    ".": "&",
    "∧": "&",
    "+": "|",
    "∨": "|",
    "¬": "~",
    "!": "~",
    "→": "->",
    "↔": "<->",
  };

  const reversedInput: string = input.replace(
    new RegExp(
      Object.keys(reverseSymbolMappings)
        .map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "g"
    ),
    (match) => reverseSymbolMappings[match] || match
  );

  return reversedInput;
}

function transformSymbolsForUrl(input: string): string {
  const reverseSymbolMappings: Record<string, string> = {
    ".": "&",
    "&": "∧",
    "+": "∨",
    "|": "|",
    "¬": "¬",
    "~": "~",
    "→": "->",
    "↔": "<->",
  };

  const reversedInput: string = input.replace(
    new RegExp(
      Object.keys(reverseSymbolMappings)
        .map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|"),
      "g"
    ),
    (match) => reverseSymbolMappings[match] || match
  );

  return reversedInput;
}

export {
  transformSymbolsForDisplay,
  transformSymbolsForProcessing,
  transformSymbolsToDefault,
  transformSymbolsForUrl,
};
