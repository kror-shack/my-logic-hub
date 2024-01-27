import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import PLTreeBody from "../../components/PLTreeBody/PLTreeBody";
import "../../styles/shared-page-layout.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tree Proof Generator - Semantic Tableaux | My Logic Hub",
  description:
    "Logic Tree Proof: Simplify complex arguments using our straightforward logic tree proof method. Master logical reasoning step by step.",
};

/**
 * A React component for displaying a semantic tableaux page.
 *
 * @component
 * @returns - A React JSX element representing the ST Page.
 */
const PLTreePage = () => {
  return (
    <div className="Page-layout">
      <Header heading="Semantic Tableaux" />
      <PLTreeBody />
      <InfoLink url="/info/semantic-tableaux" />
    </div>
  );
};

export default PLTreePage;
