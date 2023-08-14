import React from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as VennDiagram } from "../../assets/svgs/venn-diagram.svg";
import { ReactComponent as TruthTable } from "../../assets/svgs/truth-table.svg";
import { ReactComponent as PropositionalLogic } from "../../assets/svgs/propositional-logic.svg";
import { ReactComponent as QuantifiableLogic } from "../../assets/svgs/quantifiable-logic.svg";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";

const MainPage = () => {
  return (
    <div className="Main-page">
      <Header heading="LOGIC HUB" home={true} />
      <NotebookLines />
      <main className="main">
        <Link className="quantifiable-logic-link" to="/QuantifiableLogicPage">
          <div>
            <QuantifiableLogic />
          </div>
          <p>Quantifiable Logic Calculator</p>
          <div className="line"></div>
        </Link>
        <Link className="propositional-logic-link" to="/PropositionalLogicPage">
          <div>
            <PropositionalLogic />
          </div>
          <p>Propositional Logic Calculator</p>
          <div className="line"></div>
        </Link>
        <Link className="venn-diagram-link" to="/VennDiagramPage">
          <div>
            <VennDiagram />
          </div>
          <p>Logic Venn</p>
          <div className="line"></div>
        </Link>
        <Link className="truth-table-link" to="/TruthTablePage">
          <div>
            <TruthTable />
          </div>
          <p>Truth Table Generator</p>
          <div className="line"></div>
        </Link>
        <Link className="truth-table-link" to="/PLTreePage">
          <p>Propositional Logic Semenatic Tableaux</p>
          <div className="line"></div>
        </Link>
        <Link className="truth-table-link" to="/PLIndirectProofPage">
          <p>Propositional Logic Indirect Proof</p>
          <div className="line"></div>
        </Link>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
