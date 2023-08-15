import { useEffect, useRef, useState } from "react";
import { DeductionStep } from "../../types/sharedTypes";
import { ReactComponent as Info } from "../../assets/svgs/info.svg";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import "./SLDeductionSteps.scss";
import { transformSymbolsForInput } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";

type Props = {
  deductionSteps: DeductionStep[] | false;
  premiseLength: number;
};

const SLDeductionSteps = ({ deductionSteps, premiseLength }: Props) => {
  const [showRule, setShowRule] = useState<number | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  function showRuleInfo(index: number, e: React.MouseEvent) {
    if (showRule === index) setShowRule(null);
    else setShowRule(index);
  }

  useEffect(() => {
    const handleBlur = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (!clickedElement.closest(".info-button")) setShowRule(null);
    };

    if (showRule) {
      document.addEventListener("click", handleBlur);
    }

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [showRule]);

  return (
    <main className="SL-deduction-steps">
      {deductionSteps && deductionSteps.length > 0 && (
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
                  <td>{transformSymbolsForInput(item.obtained.join(""))}</td>
                  <td>{item.from}</td>
                  <td>{item.rule}</td>
                  <td className="info-container">
                    <button
                      onClick={(e) => showRuleInfo(index, e)}
                      className="info-button"
                      ref={infoButtonRef}
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
      )}
      {deductionSteps ? (
        ""
      ) : (
        <div>
          <h2>This Argument is invalid</h2>
        </div>
      )}
    </main>
  );
};

export default SLDeductionSteps;
