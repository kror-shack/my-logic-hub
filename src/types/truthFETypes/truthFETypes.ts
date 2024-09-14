export type AllDomains = Record<string, number[] | "T" | "F" | number>;

export type DomainProp = {
  value: number[];
  isConstant: boolean;
};
