import {
  Relations,
  SyllogisticDetails,
} from "../../../types/VennDiagramTypes/types";

type Props = {
  relations: Relations;
  syllogisticFigure: SyllogisticDetails;
};

type DrawOrderProperties = Partial<{
  [key: string]:
    | "shade wrt third"
    | "cross"
    | "shade wrt first"
    | "shade wrt second"
    | "shade"
    | null;
  firstCircle: "shade wrt third" | "cross" | null;
  secondCircle: "shade wrt third" | "cross" | null;
  thirdCircle: "shade wrt first" | "shade wrt second" | "cross" | null;
  firstCircleBorder: "cross" | null;
  secondCircleBorder: "cross" | null;
  thirdCircleBorder: "cross" | null;
  middleCross: "cross" | null;
  topCross: "cross" | null;
  leftCross: "cross" | null;
  rightCross: "cross" | null;
}>;

function checkUniversalPremiseEffect(
  firstFill: Partial<Relations> | null,
  secondFill: Partial<Relations> | null
): DrawOrderProperties | null {
  if (!firstFill || !secondFill) return null;
  if (firstFill.thirdCircle) {
    switch (firstFill.thirdCircle) {
      case "shade wrt first":
        if (secondFill.rightIntersection === "cross")
          return { middleCross: "cross" };
        break;
      case "shade wrt second":
        if (secondFill.leftIntersection === "cross")
          return { middleCross: "cross" };
    }
  }
  if (firstFill.leftIntersection) {
    switch (firstFill.leftIntersection) {
      case "shade":
        if (secondFill.rightIntersection === "cross")
          return { rightCross: "cross" };
    }
  }

  //   if (firstFill.leftIntersection) {
  //     switch (firstFill.leftIntersection) {
  //       case "cross":
  //         if (secondFill.leftIntersection === "cross")
  //           return { leftCross: "cross" };
  //     }
  //   }
  if (firstFill.rightIntersection) {
    if (firstFill.rightIntersection === "shade") {
      if (secondFill.secondCircleBorder === "cross")
        return { leftCross: "cross" };
    }
  }
  return null;
}

type DrawOrder = {
  firstFill: DrawOrderProperties | null;
  secondFill: DrawOrderProperties | null;
};

function filterRelations(
  relations: Partial<Relations>,
  value: string | null
): Partial<Relations> | undefined {
  const filteredRelations: Partial<Relations> = {};

  for (const key in relations) {
    if (relations[key] !== value) {
      filteredRelations[key] = relations[key];
    }
  }

  return filteredRelations;
}

const getCircleDrawOrder = ({ relations, syllogisticFigure }: Props) => {
  const drawOrder: DrawOrder = {
    firstFill: {},
    secondFill: {},
  };
  let filteredRelations = filterRelations(relations, null);
  if (filteredRelations) {
    for (const relation1 in filteredRelations) {
      if (relations[relation1]?.toLowerCase().includes("shade")) {
        drawOrder.firstFill = drawOrder.firstFill || {};
        drawOrder.firstFill[relation1] = relations[relation1];
        filteredRelations = filterRelations(
          filteredRelations,
          relations[relation1]
        );
        if (!filteredRelations) return;
        for (const relation2 in filteredRelations) {
          if (relations[relation2]?.toLowerCase().includes("shade")) {
            drawOrder.secondFill = drawOrder.secondFill || {};

            drawOrder.secondFill[relation2] = relations[relation2];
            break;
          } else {
            const premiseEffect = checkUniversalPremiseEffect(
              drawOrder.firstFill,
              filteredRelations
            );
            drawOrder.secondFill = drawOrder.secondFill || {};

            premiseEffect
              ? (drawOrder.secondFill = premiseEffect)
              : (drawOrder.secondFill[relation2] = relations[relation2]);
          }
        }
        break;
      }
    }
  }
  return drawOrder;
};

export default getCircleDrawOrder;
