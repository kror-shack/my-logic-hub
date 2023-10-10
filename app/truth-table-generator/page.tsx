import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import TruthTableBody from "../../components/TruthTableBody/TruthTableBody";
import "../../styles/shared-page-layout.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Truth table generator| My Logic Hub",
  description:
    "Truth Table Generator: Easily generate truth tables for logical expressions. Simplify complex logic with our user-friendly truth table.",
};

/**
 * A React component displaying the truth table page.
 *
 * @returns - A JSX element with the respective page.
 */
const TruthTablePage = () => {
  return (
    <div className="Page-layout">
      <Header heading="Truth Table" />
      <TruthTableBody />
      <InfoLink url="/info/truth-table" />
    </div>
  );
};

export default TruthTablePage;

export {};
