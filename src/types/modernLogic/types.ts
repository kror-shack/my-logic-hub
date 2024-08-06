export type ModernLogicDeductionStep = {
  obtained: string[];
  rule: string | null;
  from: number | string | null;
  show: boolean;
  closed: true | null;
};
