import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import NotebookLines from "../NotebookLines/NotebookLines";
import inferThroughPermutations from "../../utils/QuantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";

const QuantifiableLogicBody = () => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "\u2200(x) \u2200(y)((Axg & Agy) -> Axy)",
    "\u2200(x)(Px -> Agx)",
    "\u2203(x)(Px & Axg)",
    "\u2203(x)(Px & \u2200(y)(Py -> Axy))",
  ]);
  const [premiseLength, setPremiseLength] = useState<number>(0);
  const [showRule, setShowRule] = useState<number | null>(null);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }

    if (propositionArr) {
      const conc = propositionArr.pop();
      if (!conc) return;
      const newDeductionSteps = inferThroughPermutations(propositionArr, conc);
      setDeductionSteps(newDeductionSteps);
    }
  }, [propositionArr]);

  return (
    <div className="Propositional-logic-body">
      <NotebookLines />
      <SLInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
        propositionArr={propositionArr}
        isQuantifiable={true}
      />
      <SLDeductionSteps
        deductionSteps={deductionSteps}
        premiseLength={premiseLength}
      />
    </div>
  );
};

export default QuantifiableLogicBody;
