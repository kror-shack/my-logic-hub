import {
  Relations,
  SyllogisticFigure,
  Circle,
} from "../../../types/VennDiagramTypes/types";
import {
  findPremise,
  getSecondRelation,
  getThirdRelation,
} from "../vennHelperFunctions/vennHelperFunctions";

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

  if (!secondRelationPremsie) return relations;

  const secondRelation = getSecondRelation(
    circles[0],
    circles[2],
    secondRelationPremsie
  );

  relations = {
    ...relations,
    ...secondRelation,
  };

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

  if (relations.thirdCircle && thirdRelation.thirdCircle) {
    const thirdRelation = {} as { thirdCircleComplete: "shade" };
    thirdRelation.thirdCircleComplete = "shade";
    let relations = {} as Relations;
    return { ...relations, ...thirdRelation };
  }

  relations = {
    ...relations,
    ...thirdRelation,
  };

  return relations;
};

export default getCirclesRelation;
