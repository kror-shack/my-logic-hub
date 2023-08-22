import {
  Relations,
  SyllogisticFigure,
} from "../../../types/VennDiagramTypes/types";
import {
  checkUniversalPremiseEffect,
  DrawOrder,
  filterRelations,
  removeFirstProperyFromObj,
} from "../vennHelperFunctions/vennHelperFunctions";

type Props = {
  relations: Relations;
  syllogisticFigure: SyllogisticFigure;
};

const getCircleDrawOrder = ({ relations, syllogisticFigure }: Props) => {
  /**
   * it gets the draw order of the circle based
   * on if there is shade first or not
   * since shading affects cross
   * hence the use of the function checkForUniversalPremiseEffect
   * at the end
   */
  const drawOrder = {} as DrawOrder;

  let filteredRelations = filterRelations(relations, null);
  //To filter out all null properties
  if (filteredRelations) {
    for (const relation in filteredRelations) {
      if (relations[relation]?.toLowerCase().includes("shade")) {
        drawOrder.firstFill = drawOrder.firstFill || {};
        drawOrder.firstFill[relation] = relations[relation];
        filteredRelations = removeFirstProperyFromObj(filteredRelations);
        break;
      } else {
        drawOrder.secondFill = drawOrder.secondFill || {};
        drawOrder.secondFill[relation] = relations[relation];
        filteredRelations = filteredRelations =
          removeFirstProperyFromObj(filteredRelations);
        break;
      }
    }

    for (const relation in filteredRelations) {
      if (relations[relation]?.toLowerCase().includes("shade")) {
        if (!drawOrder.firstFill) {
          drawOrder.firstFill = drawOrder.firstFill || {};
          drawOrder.firstFill[relation] = relations[relation];
        } else {
          drawOrder.secondFill = drawOrder.secondFill || {};
          drawOrder.secondFill[relation] = relations[relation];
        }
      } else {
        if (!drawOrder.firstFill) {
          drawOrder.firstFill = drawOrder.firstFill || {};
          drawOrder.firstFill[relation] = relations[relation];
        } else if (!drawOrder.secondFill) {
          drawOrder.secondFill = drawOrder.secondFill || {};
          drawOrder.secondFill[relation] = relations[relation];
        }
      }

      const premiseEffect = checkUniversalPremiseEffect(
        drawOrder.firstFill,
        drawOrder.secondFill
      );

      if (premiseEffect) {
        drawOrder.secondFill = premiseEffect;
      }
    }
  }
  return drawOrder;
};

export default getCircleDrawOrder;
