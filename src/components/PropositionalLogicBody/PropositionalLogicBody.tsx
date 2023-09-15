import React, { useEffect, useState } from "react";
import { DeductionStep } from "../../types/PropositionalLogicTypes/PropositionalLogicTypes";
import getDeductionSteps from "../../utils/PropositionalLogicUtils/getDeductionSteps/getDeductionsteps";
import "./PropositionalLogicBody.scss";
import NotebookLines from "../NotebookLines/NotebookLines";
import SLInputForm from "../SLInputForm/SLInputForm";
import SLDeductionSteps from "../SLDeductionSteps/SLDeductionSteps";
import { Link } from "react-router-dom";
import InfoLink from "../InfoLink/InfoLink";

type Props = {
  setNotebookLinesRender: React.Dispatch<React.SetStateAction<number>>;
};
/**
 * Renders propositional logic page body
 *
 * @component
 * @returns A JSX element containing the SL input form and SL deduction steps.
 */

const PropositionalLogicBody = ({ setNotebookLinesRender }: Props) => {
  const [deductionSteps, setDeductionSteps] = useState<DeductionStep[] | false>(
    []
  );
  const [propositionArr, setPropositionArr] = useState<string[]>([
    "( ¬ Q -> P ) ∧ (R -> T )",
    " ¬ ( ¬P -> S )",
    " (¬ U ∨ R ) ∧ U ",
    " ¬B -> ¬T ",
    "T -> Y",
    "¬K -> ¬Y",
    "( ¬ ( B -> ¬Q ) ∧ ( ¬ S ∧ T ) )∧ ( X ∨ K )",
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
    }
  }, [propositionArr]);

  useEffect(() => {
    setNotebookLinesRender((prev) => prev + 1);
  }, [JSON.stringify(deductionSteps)]);

  return (
    <div className="Propositional-logic-body">
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
