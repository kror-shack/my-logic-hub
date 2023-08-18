import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import getDeductionSteps from "../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import "./PropositionalLogicBody.scss";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";

const PropositionalLogicBody = () => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "(S ∨ R) -> (¬P -> Q)",
    "¬S -> ¬(T -> Q)",
    "R -> ¬T",
    "¬P",
    "¬R -> Q",
    "S -> ¬Q",
    "¬S -> T",
    "(T -> R) ∧ ¬S",
  ]);
  const [premiseLength, setPremiseLength] = useState<number>(
    propositionArr.length
  );
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      const copiedPropositionArr = [...propositionArr];
      const conc = copiedPropositionArr.pop();
      if (!conc) return;
      const newDeductionSteps = getDeductionSteps(copiedPropositionArr, conc);

      setDeductionSteps(newDeductionSteps);
      console.log(newDeductionSteps);
    }
  }, [propositionArr]);

  return (
    <div className="Propositional-logic-body">
      <NotebookLines />
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={false}
      />
      <SLDeductionSteps
        deductionSteps={deductionSteps}
        premiseLength={premiseLength}
      />
    </div>
  );
};

export default PropositionalLogicBody;
