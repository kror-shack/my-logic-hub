import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import QuantifiableLogicBody from "../../components/QuantifiableLogicBody/QuantifiableLogicBody";
import "../../styles/shared-page-layout.scss";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "First Order Logic Calculator | My Logic Hub",
  description:
    "Master First Order Logic: Explore predicates, quantifiers, and logical operations. Your resource for evaluating first-order logic concepts.",
};

/**
 * A React component for displaying a First order logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the FOL Page.
 */
const QuantifiableLogicPage = () => {
  return (
    <div className="Page-layout">
      <Header heading="First Order Logic" />
      <QuantifiableLogicBody />
      <InfoLink url="/info/quantificational-logic" />
    </div>
  );
};

export default QuantifiableLogicPage;
