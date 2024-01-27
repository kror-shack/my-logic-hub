export type Relations = {
  [key: string]:
    | "shade wrt third"
    | "cross"
    | "shade wrt first"
    | "shade wrt second"
    | "shade"
    | null;
  firstCircle: "shade wrt third" | "cross" | null;
  secondCircle: "shade wrt third" | "cross" | null;
  thirdCircle:
    | "shade wrt first"
    | "shade wrt second"
    | "cross"
    | "shade"
    | null;
  topIntersection: "shade" | "cross" | null;
  leftIntersection: "shade" | "cross" | null;
  rightIntersection: "shade" | "cross" | null;
  firstCircleBorder: "cross" | null;
  secondCircleBorder: "cross" | null;
  thirdCircleBorder: "cross" | null;
  thirdCircleComplete: "shade" | null;
};

export type SyllogisticFigure = {
  figure: string;
  majorPremise: string;
  minorPremise: string;
  majorTerm: string;
  minorTerm: string;
  middleTerm: string;
  premise1: Structure;
  premise2: Structure;
  conc: Structure;
};

export type Structure = {
  subject: string;
  predicate: string;
  type: string;
};

export type Circle = {
  center: {
    x: number;
    y: number;
  };

  color: string;
  label: string;
  radius: number;
  offset: {
    x: number;
    y: number;
  };
};

export type Terms = {
  majorTerm: string;
  minorTerm: string;
  middleTerm: string;
};

export type Point = {
  x: number;
  y: number;
};

export type DrawOrderProperties = Partial<{
  [key: string]:
    | "shade wrt third"
    | "cross"
    | "shade wrt first"
    | "shade wrt second"
    | "shade"
    | null;
  firstCircle: "shade wrt third" | "cross" | null;
  secondCircle: "shade wrt third" | "cross" | null;
  thirdCircle:
    | "shade wrt first"
    | "shade wrt second"
    | "cross"
    | "shade"
    | null;
  firstCircleBorder: "cross" | null;
  secondCircleBorder: "cross" | null;
  thirdCircleBorder: "cross" | null;
  middleCross: "cross" | null;
  topCross: "cross" | null;
  leftCross: "cross" | null;
  rightCross: "cross" | null;
  thirdCircleComplete: "shade" | null;
}>;

export type DrawOrder = {
  firstFill: DrawOrderProperties | null;
  secondFill: DrawOrderProperties | null;
};

export type SecondRelation = {
  firstCircle: "shade wrt third" | "cross" | null;
  leftIntersection: "shade" | "cross" | null;
  secondCircleBorder: "cross" | null;
  thirdCircle: "shade wrt first" | "shade wrt second" | "cross" | null;
};

export type ThirdRelation = {
  secondCircle: "shade wrt third" | "cross" | null;
  rightIntersection: "shade" | "cross" | null;
  leftIntersection: "shade" | "cross" | null;
  firstCircleBorder: "cross" | null;
  thirdCircle: "shade wrt first" | "shade wrt second" | "cross" | null;
};
