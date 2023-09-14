import { useState } from "react";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import QuantifiableLogicBody from "../../components/QuantifiableLogicBody/QuantifiableLogicBody";

/**
 * A React component for displaying a First order logic calculator page.
 *
 * @component
 * @returns - A React JSX element representing the FOL Page.
 */
const QuantifiableLogicPage = () => {
  return (
    <div>
      <Header heading="Quantificational Logic" />
      <NotebookLines />
      <QuantifiableLogicBody />
    </div>
  );
};

export default QuantifiableLogicPage;
