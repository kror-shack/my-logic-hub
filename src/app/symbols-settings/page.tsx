import "./SymbolsPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import getWhatsNew from "../../utils/services/getWhatsNew/getWhatsNew";
import SetSymbols from "../../components/SetSymbols/SetSymbols";

export const metadata: Metadata = {
  title: "Symbols Settings | My Logic Hub",
  description: "Learn and update your preffered logical symbols.",
};

/**
 * A React component for rendering symbols page.
 *
 *
 * @returns - A JSX Element with the Symbols page.
 */
const SymbolsPage = async () => {
  return (
    <div className="symbols-page Page-layout">
      <Header heading="Set Symbols" />
      <div className="symbols-page-container">
        <p className="intro">
          Given the variability in symbols used across different textbooks and
          academic resources for logical operators—such as AND, OR, NOT
          (Negation), IMPLICATION, and BICONDITIONAL—this application provides
          the flexibility to customize these symbols for ease of use.
        </p>
        <SetSymbols />
      </div>
    </div>
  );
};

export default SymbolsPage;
