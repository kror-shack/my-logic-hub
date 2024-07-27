import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import PropositionalLogicBody from "../../components/PropositionalLogicBody/PropositionalLogicBody";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Propositional Logic Calculator | My Logic Hub",
  description:
    "Propositional Logic Calculator: Evaluate Propositional logic using Natural Deduction. Simplify proofs with our logic calculator tool.",
};

/**
 * A React component for displaying a propositional logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the Propositional Logic Page.
 */

const PropositionalLogicPage = () => {
  return (
    <div className="Page-layout">
      <Header heading="Propositional Logic" />
      <PropositionalLogicBody />
      <InfoLink url="/info/propositional-logic" />
    </div>
  );
};

export default PropositionalLogicPage;

export {};
