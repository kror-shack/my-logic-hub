import React, { useEffect, useRef, useState } from "react";
import { DeductionStep } from "../../types/sharedTypes";
import { transformSymbolsForDisplay } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import "./SLDeductionSteps.scss";

type Props = {
  deductionSteps: DeductionStep[] | false;
  premiseLength: number;
  isQuantifiable?: boolean;
};

const SLDeductionSteps = ({
  deductionSteps,
  premiseLength,
  isQuantifiable,
}: Props) => {
  const [showRule, setShowRule] = useState<string | null>(null);
  const [showRuleIndex, setShowRuleIndex] = useState<number | null>(null);

  const [visibleData, setVisibleData] = useState<DeductionStep[]>([]);
  const stepRef = useRef<HTMLTableRowElement>(null);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  const [ruleContainerPosition, setRuleContainerPosition] = useState({
    x: 0,
    y: 0,
  });
  const tableRef = useRef<HTMLTableElement>(null);

  function showRuleInfo(rule: string, index: number, e: React.MouseEvent) {
    if (showRuleIndex === index) {
      setShowRule(null);
      setShowRuleIndex(null);
    } else {
      setShowRule(rule);
      setShowRuleIndex(index);
      if (!tableRef.current) return;
      const tableRect = tableRef.current.getBoundingClientRect();
      const x = e.clientX - tableRect.left;
      const y = e.clientY - tableRect.top;

      // Update ruleContainer position and show it
      setRuleContainerPosition({ x, y });
    }
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (showRule)
        setRuleContainerPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("click", handleMouseMove);

    return () => {
      window.removeEventListener("click", handleMouseMove);
    };
  }, [setShowRule]);

  useEffect(() => {
    if (!deductionSteps) return;
    setVisibleData([]);
    const renderWithDelay = async () => {
      for (const { obtained, from, rule } of deductionSteps) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setVisibleData((prevVisibleData) => [
          ...prevVisibleData,
          { obtained, from, rule },
        ]);
      }
    };

    renderWithDelay();
  }, [deductionSteps]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.outerWidth > 900);
    };

    checkScreenWidth(); // Initial check

    const handleResize = () => {
      checkScreenWidth();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    stepRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [visibleData]);

  const handleClick = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;
    console.log("Click position:", x, y);
  };

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

  useEffect(() => {
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <main className="SL-deduction-steps">
      {visibleData && visibleData.length > 0 && (
        <div className="deduction-steps">
          <h2>Deduction Steps:-</h2>

          <table ref={tableRef}>
            {isWideScreen && (
              <thead>
                <tr>
                  <th>Obtained</th>
                  <th>From</th>
                  <th>Rule</th>
                </tr>
              </thead>
            )}
            <tbody>
              {visibleData.map((item, index) => (
                <tr className="premise" key={index} ref={stepRef}>
                  <td>
                    <div className="premise-index">
                      {premiseLength + index}.
                    </div>
                    <div>
                      {isQuantifiable
                        ? transformSymbolsForDisplay(item.obtained.join(" "))
                        : transformSymbolsForDisplay(item.obtained.join(""))}
                    </div>
                  </td>
                  <td className="from">
                    <span>{"from:"}</span>
                    {item.from}
                  </td>
                  <td>
                    <div className="info-container">
                      <div>
                        <span>{"rule:"}</span> {item.rule}
                      </div>
                      <button
                        onClick={(e) => showRuleInfo(item.rule, index, e)}
                        className="info-button"
                      >
                        ?
                      </button>
                    </div>
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

      {showRule && (
        <div
          className="rule-info"
          style={{
            left: ruleContainerPosition.x,
            top: ruleContainerPosition.y,
          }}
        >
          <DeductionalRuleInfo rule={showRule} />
        </div>
      )}
    </main>
  );
};

export default SLDeductionSteps;
