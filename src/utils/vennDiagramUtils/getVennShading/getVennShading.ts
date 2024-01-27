import {
  Circle,
  SyllogisticFigure,
} from "../../../types/vennDiagramTypes/types";
import getCircleDrawOrder from "../getCircleDrawOrder/getCircleDrawOrder";
import getCirclesRelation from "../getCirclesRelation/getCirclesRelation";

/**
 * Get the shading order and type of the circles
 *
 * @param circles - the circles each of which represents an entity of the syllogistic argument
 * @param syllogisticFigure - the syllogistic figure of the argument
 * @returns - the draw order of the circles
 */
const getVennShading = (
  circles: Circle[],
  syllogisticFigure: SyllogisticFigure
) => {
  /**
   * MERGED THE FUNCTIONS FOR TESTING PURPOSES
   */
  const relations = getCirclesRelation({ circles, syllogisticFigure });
  const drawOrder = getCircleDrawOrder({
    relations,
    syllogisticFigure,
  });
  return drawOrder;
};

export default getVennShading;
