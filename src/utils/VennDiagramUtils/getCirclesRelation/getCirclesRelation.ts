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
  console.log("1");

  let firstCircleLabel = circles[0].label.toLowerCase();
  let secondCircleLabel = circles[1].label.toLowerCase();
  let thirdCircleLabel = circles[2].label.toLowerCase();
  console.log("2");
  console.log(syllogisticFigure);

  const secondRelationPremsie = findPremise(
    firstCircleLabel,
    thirdCircleLabel,
    [...[syllogisticFigure.premise1], ...[syllogisticFigure.premise2]]
  );
  console.log("3");

  if (!secondRelationPremsie || secondRelationPremsie === null)
    return relations;
  console.log("4");

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
