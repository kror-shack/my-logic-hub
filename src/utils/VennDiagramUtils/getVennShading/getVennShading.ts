import {
  Circle,
  SyllogisticFigure,
} from "../../../types/VennDiagramTypes/types";
import getCircleDrawOrder from "../getCircleDrawOrder/getCircleDrawOrder";
import getCirclesRelation from "../getCirclesRelation/getCirclesRelation";

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
