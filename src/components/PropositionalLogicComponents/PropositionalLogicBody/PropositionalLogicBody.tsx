import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import getDeductionSteps from "../../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import PropositionInputForm from "../PropositionInputForm/PropositionInputForm";
import { ReactComponent as Info } from "../../../assets/svgs/info.svg";

import "./PropositionalLogicBody.scss";
import NotebookLines from "../../NotebookLines/NotebookLines";

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

  function showRuleInfo(index: number, e: React.MouseEvent) {
    e.stopPropagation();
    console.log("clicking");
    if (showRule || showRule === 0) setShowRule(null);
    else setShowRule(index);
  }

  function removeCommas(str: string | number): string | number {
    if (typeof str === "string") return str.replace(/,/g, "");
    return str;
  }

  return (
    <div className="Propositional-logic-body">
      <NotebookLines />
      <PropositionInputForm
        setPropositionArr={setPropositionArr}
        setPremiseLength={setPremiseLength}
      />
      {deductionSteps.length > 0 ? (
        <div className="deduction-steps">
          <h2>Deduction Steps:-</h2>

          <table>
            <thead>
              <tr>
                <th></th>
                <th>Obtained</th>
                <th>From</th>
                <th>Rule</th>
              </tr>
            </thead>
            <tbody>
              {deductionSteps.map((item, index) => (
                <tr key={index}>
                  <p className="premise-index">{premiseLength + index}.</p>
                  <td>{item.obtained}</td>
                  <td>{item.from}</td>
                  <td>{item.rule}</td>
                  <td className="info-container">
                    <button
                      onClick={(e) => showRuleInfo(index, e)}
                      className="info-button"
                    >
                      <Info />
                    </button>
                    {showRule === index && (
                      <DeductionalRuleInfo rule={item.rule} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
        // <div>{/* <h2>This argument is invalid</h2> */}</div>
      )}
    </div>
  );
};

export default PropositionalLogicBody;
