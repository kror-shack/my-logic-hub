import checkKnowledgeBase from "../checkKnowledgeBase/checkKnowledgeBase";
import getNegation from "../getNegation/getNegation";
import {
  addDeductionStep,
  getBracketedNegation,
  getOperator,
  getSearchIndexInDS,
  getTopLevelNegation,
  searchInArray,
  searchInDS,
  searchIndex,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import { DeductionStep } from "../../../types/sharedTypes";
import { removeAllOuterMostBractets } from "../../truthFEUtils/helperFunctions/helperFunctions";

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
 * @param previousDeductionStepsArr - An array of all the deduction steps.
 * @returns - An updated deduction steps array if wff could be simplified/solved otherwise false.
 */
const checkImplicationSolvability = (
  premise: string[],
  previousDeductionStepsArr: DeductionStep[]
) => {
  const deductionStepsArr = [...previousDeductionStepsArr];

  /**
   * TODO: Run a bracket remove function in the main execution, or
   * in addition to deduction steps arr
   */
  let [beforeImplArr, afterImplArr] = splitArray(premise, "->");
  const beforeImpl = removeAllOuterMostBractets(beforeImplArr);
  const afterImpl = removeAllOuterMostBractets(afterImplArr);

  const negatedBeforeImpl = removeAllOuterMostBractets(
    getTopLevelNegation(beforeImpl)
  );
  const negatedAfterImpl = removeAllOuterMostBractets(
    getTopLevelNegation(afterImpl)
  );

  // p -> q with p
  const beforeImpDS = checkKnowledgeBase(beforeImpl, deductionStepsArr);
  if (beforeImpDS && !searchInDS(beforeImpDS, afterImpl)) {
    addDeductionStep(
      beforeImpDS,
      afterImpl,
      "Modus Ponens",
      `${getSearchIndexInDS(beforeImpDS, premise)},${getSearchIndexInDS(
        beforeImpDS,
        beforeImpl
      )}`
    );
    return beforeImpDS;
  }

  // p -> q with ~q
  const negatedAfterImplDS = checkKnowledgeBase(
    negatedAfterImpl,
    deductionStepsArr
  );
  if (
    negatedAfterImplDS &&
    !searchInDS(negatedAfterImplDS, negatedBeforeImpl)
  ) {
    addDeductionStep(
      negatedAfterImplDS,
      negatedBeforeImpl,
      "Modus Tollens",
      `${getSearchIndexInDS(negatedAfterImplDS, premise)},${getSearchIndexInDS(
        negatedAfterImplDS,
        negatedAfterImpl
      )}`
    );
    return negatedAfterImplDS;
  }

  // (p | r) -> q with p
  else if (beforeImpl.includes("|")) {
    const beforeImplDS = checkKnowledgeBase(beforeImpl, deductionStepsArr);
    if (beforeImplDS && !searchInDS(beforeImplDS, afterImpl)) {
      addDeductionStep(
        beforeImplDS,
        afterImpl,
        "Modus Ponens",
        `${getSearchIndexInDS(beforeImplDS, beforeImpl)},${getSearchIndexInDS(
          beforeImplDS,
          premise
        )}`
      );
      return beforeImplDS;
    }
  }

  //double nesting

  // ( p -> r) -> q
  else if (beforeImpl.includes("->")) {
    // one nesting ( p -> r) -> q
    const beforeImplDS = checkKnowledgeBase(beforeImpl, deductionStepsArr);
    if (beforeImplDS && !searchInDS(beforeImplDS, afterImpl)) {
      // knowledgeBase.push(beforeImpl);
      addDeductionStep(
        beforeImplDS,
        afterImpl,
        "Modus Ponens",
        `${getSearchIndexInDS(beforeImplDS, beforeImpl)},${getSearchIndexInDS(
          beforeImplDS,
          premise
        )}`
      );
    }
    return beforeImplDS;
  }

  return false;
};

export default checkImplicationSolvability;
