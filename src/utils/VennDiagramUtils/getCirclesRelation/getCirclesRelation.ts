import {
  Relations,
  SyllogisticFigure,
  Circle,
} from "../../../types/VennDiagramTypes/types";
import {
  findPremise,
  getSecondRelation,
  getThirdRelation,
} from "./getCirclesRelationHelpers/getCircleRelationHelperFunctions";
type Props = {
  circles: Circle[];
  syllogisticFigure: SyllogisticFigure;
};

const getCirclesRelation = ({
  circles,
  syllogisticFigure,
}: Props): Relations => {
  let relations = {} as Relations;
  let firstCircleLabel = circles[0].label.toLowerCase();
  let secondCircleLabel = circles[1].label.toLowerCase();
  let thirdCircleLabel = circles[2].label.toLowerCase();

  const secondRelationPremsie = findPremise(
    firstCircleLabel,
    thirdCircleLabel,
    [...[syllogisticFigure.premise1], ...[syllogisticFigure.premise2]]
  );

  if (!secondRelationPremsie || secondRelationPremsie === null)
    return relations;

  const secondRelation = getSecondRelation(
    circles[0],
    circles[2],
    secondRelationPremsie
  );

  relations = {
    ...relations,
    ...secondRelation,
  };

  // // console.log(relations)

  const thirdRelationPremise = findPremise(
    secondCircleLabel,
    thirdCircleLabel,
    [...[syllogisticFigure.premise1], ...[syllogisticFigure.premise2]]
  );

  if (!thirdRelationPremise) return relations;
  const thirdRelation = getThirdRelation(
    circles[1],
    circles[2],
    thirdRelationPremise
  );

  relations = {
    ...relations,
    ...thirdRelation,
  };

  return relations;
};

export default getCirclesRelation;
