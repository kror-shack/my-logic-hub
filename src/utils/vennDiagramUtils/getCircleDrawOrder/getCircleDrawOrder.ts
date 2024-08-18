import {
  DrawOrderProperties,
  Relations,
  SyllogisticFigure,
  VennRelations,
} from "../../../types/vennDiagramTypes/types";
import {
  checkUniversalPremiseEffect,
  DrawOrder,
  filterRelations,
  prioritizeShade,
  removeFirstProperyFromObj,
} from "../vennHelperFunctions/vennHelperFunctions";

type Props = {
  relations: Partial<VennRelations>[];
};

/**
 * Get the filling order of the venn circles
 *
 * This function gets the draw order of the circles, each of which represents an entity, based
 * on whether there exists a fill of the type shade or not since shading affects cross i.e.,
 * a universal premise effects a existential ones in terms of where the cross for existence is to be marked.
 *
 * @param relations - an object containing the relations of the circles
 * @returns - an object containing the drawing order, and filling type of the circles
 */
const getCircleDrawOrder = ({ relations }: Props) => {
  const drawOrderArr: Partial<VennRelations>[] = relations;

  const orderedDrawOrderArr = prioritizeShade(drawOrderArr);

  const premiseEffect = checkUniversalPremiseEffect(
    orderedDrawOrderArr[0],
    orderedDrawOrderArr[1]
  );

  if (!premiseEffect) return orderedDrawOrderArr;

  orderedDrawOrderArr[1] = premiseEffect;

  return orderedDrawOrderArr;
};

export default getCircleDrawOrder;
