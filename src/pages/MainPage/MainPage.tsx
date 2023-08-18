import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as VennDiagram } from "../../assets/svgs/venn-diagram.svg";
import { ReactComponent as TruthTable } from "../../assets/svgs/truth-table.svg";
import { ReactComponent as PropositionalLogic } from "../../assets/svgs/propositional-logic.svg";
import { ReactComponent as QuantifiableLogic } from "../../assets/svgs/quantifiable-logic.svg";
import { ReactComponent as WarningSvg } from "../../assets/svgs/warning.svg";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import VersionPopup from "../../components/VersionPopup/VersionPopup";

type Props = {
  firstRender: boolean;
  setFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
};
const MainPage = ({ firstRender, setFirstRender }: Props) => {
  const [popupVisible, setPopupVisible] = useState(firstRender);

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    setFirstRender(false);
  }, []);

  return (
    <div className="Main-page">
      <Header heading="LOGIC HUB" home={true} />

      {popupVisible && <VersionPopup onClose={closePopup} />}
      <NotebookLines />
      <div className="report-issue">
        <Link to="/ReportIssuePage">Report an issue</Link>
        <WarningSvg />
      </div>
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
          <p>Semantic Tableaux Generator</p>
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
