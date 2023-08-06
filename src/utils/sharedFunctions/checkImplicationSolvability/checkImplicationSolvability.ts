import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../getNegation/getNegation";
import {
  addDeductionStep,
  areStringArraysEqual,
  convertImplicationToDisjunction,
  createNegation,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";

// p - > q with p & ~q
// ( p | r) -> q with p and r and ~q
// ( p -> r) -> q with p and r and ~q

const checkImplicationSolvability = (
  premise: string[],
  knowledgeBase: string[][]
) => {
  const deductionStepsArr: DeductionStep[] = [];

  let [beforeImpl, afterImpl] = splitArray(premise, "->");
  const negatedBeforeImpl = getNegation(beforeImpl);
  const negatedAfterImpl = getNegation(afterImpl);
  const check = checkKnowledgeBase(
    beforeImpl,
    knowledgeBase,
    deductionStepsArr
  );

  if (areStringArraysEqual(beforeImpl, afterImpl)) {
    addDeductionStep(
      deductionStepsArr,
      beforeImpl,
      "Law of Identiy",
      `${searchIndex(knowledgeBase, premise)}`
    );
    knowledgeBase.push(beforeImpl);
  } else if (
    checkKnowledgeBase(beforeImpl, knowledgeBase, deductionStepsArr) &&
    !searchInArray(knowledgeBase, afterImpl)
  ) {
    // p -> q with p
    console.log("yuppppppp it exists");
    addDeductionStep(
      deductionStepsArr,
      afterImpl,
      "Modus Ponens",
      `${searchIndex(knowledgeBase, premise)},${searchIndex(
        knowledgeBase,
        beforeImpl
      )}`
    );
    knowledgeBase.push(afterImpl);
  }

  // p -> q with ~q
  else if (
    !searchInArray(knowledgeBase, negatedBeforeImpl) &&
    checkKnowledgeBase(negatedAfterImpl, knowledgeBase, deductionStepsArr)
  ) {
    addDeductionStep(
      deductionStepsArr,
      negatedBeforeImpl,
      "Modus Tollens",
      `${searchIndex(knowledgeBase, premise)},${searchIndex(
        knowledgeBase,
        negatedAfterImpl
      )}`
    );
    knowledgeBase.push(negatedBeforeImpl);
  }

  // (p | r) -> q with p
  else if (beforeImpl.includes("|")) {
    if (
      checkKnowledgeBase(beforeImpl, knowledgeBase, deductionStepsArr) &&
      !searchInArray(knowledgeBase, afterImpl)
    ) {
      addDeductionStep(
        deductionStepsArr,
        afterImpl,
        "Modus Ponens",
        `${searchIndex(knowledgeBase, beforeImpl)},${searchIndex(
          knowledgeBase,
          premise
        )}`
      );
      knowledgeBase.push(afterImpl);
    }
  }

  //double nesting

  // ( p -> r) -> q
  else if (beforeImpl.includes("->")) {
    // one nesting ( p -> r) -> q
    if (
      checkKnowledgeBase(beforeImpl, knowledgeBase, deductionStepsArr) &&
      !searchInArray(knowledgeBase, afterImpl)
    ) {
      // knowledgeBase.push(beforeImpl);
      addDeductionStep(
        deductionStepsArr,
        afterImpl,
        "Modus Ponens",
        `${searchIndex(knowledgeBase, beforeImpl)},${searchIndex(
          knowledgeBase,
          premise
        )}`
      );
      knowledgeBase.push(afterImpl);
    }
  }

  return {
    deductionStepsArr,
    knowledgeBase,
  };
};

export default checkImplicationSolvability;
