export type DeductionStep = {
  obtained: string[];
  rule: string;
  from: string | number;
};

export type RuleDetails = {
  name: string;
  otherName: string[] | undefined;
  description: string;
};

export type SymbolDetails = {
  name: string;
  usage: string;
  example: string;
};

export type PageDetails = {
  header: string;
  description: string;
  inputSyntax: {
    description: string;
    symbols: SymbolDetails[] | undefined;
  };
  supportedRules: RuleDetails[] | undefined;
  webpage: string;
  wikipediaLink: string;
};

export type SnackBarStatus = "loading" | "success" | "error" | null;

export type WhatsNewDoc = {
  title: string;
  createdAt: string;
  body: string;
};
