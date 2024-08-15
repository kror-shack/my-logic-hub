export type DeductionStep = {
  obtained: string[];
  rule: string | null;
  from: string | number | null;
  show?: boolean | null;
  closed?: boolean | null;
  usable?: boolean | null;
};

export type DerivedRules = {
  isDeMorganAllowed: boolean;
  isMaterialImpAllowed: boolean;
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

export type ErrorReportsDoc = {
  body: string;
  createdAt: string;
  status: "pending" | "fixed";
  reply: string | null;
  link: string | null;
};

export type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};
