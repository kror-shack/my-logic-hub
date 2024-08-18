import {
  Relations,
  SyllogisticFigure,
  Circle,
  Structure,
  VennRelations,
} from "../../../types/vennDiagramTypes/types";
import { checkForWordInString } from "../convertArgumentToSyllogismFigure/syllogismHelperFuntions/getSyllogismTerms/gstHelperFunctions/gstHelperFunctions";
import {
  findPremise,
  getPremiseAssertion,
} from "../vennHelperFunctions/vennHelperFunctions";

type Props = {
  circles: Circle[];
  syllogisticFigure: SyllogisticFigure;
};

/**
 * Get the circles relations between themselves
 *
 * This function gets the relation of the circles, each of which represents an entity,
 * between themselves on how they are to be filled.
 *
 * @param param0 - an object of the circles an the syllogitic figure of the argument
 * @returns
 */
const getCirclesRelation = ({ circles, syllogisticFigure }: Props) => {
  const firstPremiseRelation = getPremiseAssertion(
    syllogisticFigure.premise1,
    circles
  );
  const secondPremiseRelation = getPremiseAssertion(
    syllogisticFigure.premise2,
    circles
  );
  if (!firstPremiseRelation || !secondPremiseRelation) return null;
  return [...[firstPremiseRelation], ...[secondPremiseRelation]];
};

export default getCirclesRelation;
