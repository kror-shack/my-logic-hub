import { useState } from "react";
import Header from "../../components/Header/Header";
import "../../components/PropositionalLogicComponents/PropositionInputForm/PropositionInputForm.scss";
import QuantifiableLogicBody from "../../components/QuantifiableLogicBody/QuantifiableLogicBody";

const QuantifiableLogicPage = () => {
  return (
    <div>
      <Header heading="Quantifiable Logic Page" />
      <QuantifiableLogicBody />
    </div>
  );
};

export default QuantifiableLogicPage;
