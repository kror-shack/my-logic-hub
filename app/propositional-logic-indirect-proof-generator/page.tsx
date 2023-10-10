import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLIndirectProofBody from "../../components/PLIndirectProofBody/PLIndirectProofBody";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Propositional Logic Indirect Proof Calculator | My Logic Hub",
  description:
    "Evaluate Propositional with Natural Deduction. Simplify complex arguments and proofs with our indirect proof logic calculator.",
};

/**
 * A React component displaying the propositional logic indirect proof page.
 *
 * @returns - A JSX element with the respective page.
 */
const PLIndirectProofPage = () => {
  return (
    <div className="Page-layout">
      <Header heading="PL Indirect Proof" />
      <PLIndirectProofBody />
      <InfoLink url="/info/propositional-logic-indirect-proof" />
    </div>
  );
};

export default PLIndirectProofPage;
