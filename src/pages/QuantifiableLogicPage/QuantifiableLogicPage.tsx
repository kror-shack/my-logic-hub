import { useState } from "react";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import QuantifiableLogicBody from "../../components/QuantifiableLogicBody/QuantifiableLogicBody";

const QuantifiableLogicPage = () => {
  return (
    <div>
      <Header heading="Quantifiable Logic" />
      <NotebookLines />
      <QuantifiableLogicBody />
    </div>
  );
};

export default QuantifiableLogicPage;
