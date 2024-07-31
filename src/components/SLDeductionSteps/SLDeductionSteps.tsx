"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { DeductionStep } from "../../types/sharedTypes";
import { transformSymbolsForDisplay } from "../../utils/helperFunctions/tranfromSymbols/transformSymbols";
import DeductionalRuleInfo from "../DeductionalRuleInfo/DeductionalRuleInfo";
import DropdownSvg from "../../../public/assets/svgs/dropdown.svg";
import "./SLDeductionSteps.scss";
import ReportArgumentButton from "../ReportArgumentButton/ReportArgumentButton";

type Props = {
  deductionSteps: DeductionStep[] | false;
  premiseLength: number;
  isQuantifiable?: boolean;
};

/**
 * Render steps as a table
 *
 * This component renders the steps for a propositional logic or FOL argument. It adjusts
 * the starting number of the steps  based on the premise length prop and the format of the
 * output based on whether it is a quantifiable argument or not. For readablity, quantifiable
 * arguments are given spaces between wffs, operators, and brackets.
 * @component
 * @param Props.deductionSteps - An array containing natural deduction steps for a symbolic logic argument.
 * @param Props.premiseLength - The length of the premises provided by the user.
 * @param Props.isQuantifiable - A boolean for whether the current argument is a FOL argument or not.
 * @returns - A JSX Table element displaying the deduction steps.
 */
const SLDeductionSteps = ({
  deductionSteps,
  premiseLength,
  isQuantifiable,
}: Props) => {
  const [showRule, setShowRule] = useState<string | null>(null);
  const [showRuleIndex, setShowRuleIndex] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [visibleData, setVisibleData] = useState<DeductionStep[]>([]);
  const stepRef = useRef<HTMLTableRowElement>(null);
  const [isWideScreen, setIsWideScreen] = useState<boolean>(false);
  const [showStepFeatureButtons, setShowStepFeatureButtons] = useState(false);
  const [ruleContainerPosition, setRuleContainerPosition] = useState({
    x: 0,
    y: 0,
  });
  const tableRef = useRef<HTMLTableElement>(null);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  function showRuleInfo(rule: string, index: number, e: React.MouseEvent) {
    if (showRuleIndex === index) {
      setShowRule(null);
      setShowRuleIndex(null);
    } else {
      setShowRule(rule);
      setShowRuleIndex(index);
      const x = e.clientX;
      const y = e.clientY;

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
    //to hide the rule if user scrolls
    const handleScroll = () => {
      setShowRule(null);
      setShowRuleIndex(null);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const renderWithoutDelay = async () => {
      if (!deductionSteps) return;
      for (const { obtained, from, rule } of deductionSteps.slice(
        visibleData.length,
        displayCount
      )) {
        setVisibleData((prevVisibleData) => [
          ...prevVisibleData,
          { obtained, from, rule },
        ]);
      }
    };
    renderWithoutDelay();
  }, [displayCount]);

  useEffect(() => {
    if (!deductionSteps) {
      setVisibleData([]);
      return;
    } else if (deductionSteps.length > 0) {
      setVisibleData([]);
      if (deductionSteps.length > 1) setShowStepFeatureButtons(true);
      setDisplayCount((prev) => prev + 1);
      return;
    }
  }, [JSON.stringify(deductionSteps)]);

  useEffect(() => {
    const rerednerComponenet = () => {
      forceUpdate();
    };

    window.addEventListener("storage", rerednerComponenet);

    return () => {
      window.removeEventListener("storage", rerednerComponenet);
    };
  }, []);

  function handleShowNextStep() {
    setDisplayCount((prev) => prev + 1);
  }

  function handleShowEntireSolution() {
    if (deductionSteps) setDisplayCount(deductionSteps.length);
    setShowStepFeatureButtons(false);
  }

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsWideScreen(window.innerWidth > 900);
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
    const handleBlur = (e: MouseEvent) => {
      const clickedElement = e.target as HTMLElement;
      if (!clickedElement.closest(".info-button")) {
        setShowRule(null);
        setShowRuleIndex(null);
      }
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
      {deductionSteps && visibleData && visibleData.length > 0 ? (
        <div className="deduction-steps">
          <ReportArgumentButton />
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
                <tr
                  data-testid="deduction-step"
                  className="premise"
                  key={index}
                  ref={stepRef}
                >
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
                        aria-label="show rule info"
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
      ) : (
        <div>
          {deductionSteps ? (
            ""
          ) : (
            <>
              <ReportArgumentButton />
              <h2 className="invalid-desc">
                This Argument is invalid. The premises do not entail the
                conclusion.
              </h2>
            </>
          )}
        </div>
      )}
      {deductionSteps &&
        visibleData.length > 0 &&
        visibleData.length !== deductionSteps.length &&
        showStepFeatureButtons && (
          <div className="feature-buttons">
            <button aria-label="Show next step" onClick={handleShowNextStep}>
              <p> Next step</p>
              <DropdownSvg aria-label="dropdown-svg" />
            </button>
            <button
              aria-label="Show entire solution"
              onClick={handleShowEntireSolution}
            >
              Full solution
            </button>
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
