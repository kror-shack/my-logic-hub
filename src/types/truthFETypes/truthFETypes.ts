export type AllDomains = Record<string, number[] | "T" | "F">;

export type DomainProp = {
  value: number[];
  isConstant: boolean;
};
