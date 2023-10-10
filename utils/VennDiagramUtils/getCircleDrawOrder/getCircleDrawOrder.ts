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

/**
 * Get the filling order of the venn circles
 *
 * This function gets the draw order of the circles, each of which represents an entity, based
 * on whether there exists a fill of the type shade or not since shading affects cross i.e.,
 * a universal premise effects a existential ones in terms of where the cross for existence is to be marked.
 *
 * @param param0 - an object containing the relations of the circles, and the syllogistic figure of the argument
 * @returns - an object containing the drawing order, and filling type of the circles
 */
const getCircleDrawOrder = ({ relations, syllogisticFigure }: Props) => {
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
