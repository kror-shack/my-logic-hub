import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../getNegation/getNegation";
import {
  addDeductionStep,
  getBracketedNegation,
  getOperator,
  getTopLevelNegation,
  searchInArray,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";

// p - > q with p & ~q
// ( p | r) -> q with p and r and ~q
// ( p -> r) -> q with p and r and ~q

/**
 * Checks for Modus Ponens and Modus Tollens
 *
 * This function checks if the antecedent or the negation of the consequent is
 * present in the knowledge base or whether any of them can be deduced by the current contents of the knowledge base.
 *
 * @param premise- The conditional premise
 * @param knowledgeBase - The knowledge base.
 * @returns - the (updated if applicable) knowledge base and a deduction step array.
 */
const checkImplicationSolvability = (
  premise: string[],
  knowledgeBase: string[][]
) => {
  const deductionStepsArr: DeductionStep[] = [];

  let [beforeImpl, afterImpl] = splitArray(premise, "->");

  const negatedBeforeImpl = getTopLevelNegation(beforeImpl);
  const negatedAfterImpl = getTopLevelNegation(afterImpl);

  if (
    checkKnowledgeBase(beforeImpl, knowledgeBase, deductionStepsArr) &&
    !searchInArray(knowledgeBase, afterImpl)
  ) {
    // p -> q with p
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
