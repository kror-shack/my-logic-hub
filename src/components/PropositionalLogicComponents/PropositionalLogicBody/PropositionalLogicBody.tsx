import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import getDeductionSteps from "../../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import PropositionInputForm from "../PropositionInputForm/PropositionInputForm";
import { ReactComponent as Info } from "../../../assets/svgs/info.svg";

import "./PropositionalLogicBody.scss";

const PropositionalLogicBody = () => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[]>([]);
  const [propositionArr, setPropositionArr] = useState<string[]>();
  const [premiseLength, setPremiseLength] = useState<number>(0);
  const [showRule, setShowRule] = useState<number | null>(null);

  useEffect(() => {
    if (propositionArr) {
      const conc = propositionArr.pop();
      if (!conc) return;
      const newDeductionSteps = getDeductionSteps(propositionArr, conc);

      if (newDeductionSteps) setDeductionSteps(newDeductionSteps);
    }
  }, [propositionArr]);

  function showRuleInfo(index: number) {
    if (showRule || showRule === 0) setShowRule(null);
    else setShowRule(index);
  }

  function removeCommas(str: string | number): string | number {
    if (typeof str === "string") return str.replace(/,/g, "");
    return str;
  }

  return (
    <div className="Propositional-logic-body">
      <PropositionInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
      />
      {deductionSteps.length > 0 ? (
        <div className="deduction-steps">
          <h2>Deduction Steps</h2>
          {/* <div className="heading">
            <p>Obtained</p>
            <p>From</p>
            <p>Rule</p>
          </div> */}
          {deductionSteps.map((step, index) => (
            <div key={index}>
              <p className="premise-index">{premiseLength + index}.</p>
              <div className="step">
                <p className="obtained">
                  {removeCommas(step.obtained.join(", "))}
                </p>
                <p className="from">{step.from}</p>
                <p className="rule">{step.rule}</p>
              </div>
              <button
                onClick={() => showRuleInfo(index)}
                className="info-button"
              >
                <Info />
              </button>
              {showRule === index && <DeductionalRuleInfo rule={step.rule} />}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>This argument is invalid</h2>
        </div>
      )}
    </div>
  );
};

export default PropositionalLogicBody;
