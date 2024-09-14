import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import TruthFEBody from "../../components/TruthFEBody/TruthFEBody";
import "../../styles/shared-page-layout.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Counter Model Generator | My Logic Hub",
  description:
    "Counter Model Generator: Generate counter models for propositional and first order logic with their truth functional expansion.",
};

/**
 * A React component displaying the truth table page.
 *
 * @returns - A JSX element with the respective page.
 */
const TruthTablePage = () => {
  return (
    <div className="Page-layout">
      <Header heading="Counter Model Generator" />
      <TruthFEBody />
      <InfoLink url="/info/counter-model" />
    </div>
  );
};

export default TruthTablePage;

export {};
