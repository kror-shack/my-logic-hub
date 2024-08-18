export type Relations = {
  [key: string]:
    | "shade wrt third"
    | "cross"
    | "shade wrt first"
    | "shade wrt second"
    | "shade"
    | null;
  firstCircle: "shade wrt third" | "cross" | "shade wrt second" | null;
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

export type CirclePositions = "first" | "second" | "third";
export type VennRelations = {
  firstCircle?: //the top left circle
  "shade wrt third" | "cross" | "shade wrt second" | "shade wrt first";
  secondCircle?: // the top right circle
  "shade wrt third" | "shade wrt first" | "shade wrt second" | "cross";
  thirdCircle?: // the bottom circle
  "shade wrt first" | "shade wrt third" | "shade wrt second" | "cross";
  topIntersection?: "shade" | "cross"; //the intersection bw first and second circle
  leftIntersection?: "shade" | "cross"; //the intersection bw first and third circle
  rightIntersection?: "shade" | "cross"; //the intersection bw second and third circle
  firstCircleBorder?: "cross"; //the first circle middle border point
  secondCircleBorder?: "cross"; // the second circle middle border point
  thirdCircleBorder?: "cross"; // the third circle middle border point
  firstWrtThirdBorder?: "cross";
  firstWrtSecondBorder?: "cross";
  secondWrtFirstBorder?: "cross";
  secondWrtThirdBorder?: "cross";
  thirdWrtFirstBorder?: "cross";
  thirdWrtSecondBorder?: "cross";
};

export interface DrawOrderProperties extends VennRelations {
  middleCross?: "cross";
  topCross?: "cross";
  leftCross?: "cross";
  rightCross?: "cross";
}

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

export type DrawOrder = {
  firstFill: DrawOrderProperties | null;
  secondFill: DrawOrderProperties | null;
};

export type SecondRelation = {
  firstCircle: "shade wrt third" | "cross" | "shade wrt second" | null;
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
