import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MainPage.scss";
import { ReactComponent as VennDiagram } from "../../assets/svgs/venn-diagram.svg";
import { ReactComponent as TruthTable } from "../../assets/svgs/truth-table.svg";
import { ReactComponent as PropositionalLogic } from "../../assets/svgs/propositional-logic.svg";
import { ReactComponent as QuantifiableLogic } from "../../assets/svgs/quantifiable-logic.svg";
import { ReactComponent as PLTree } from "../../assets/svgs/PLTree.svg";
import { ReactComponent as PLIndirectProof } from "../../assets/svgs/PLIndirectProof.svg";
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
      <Header heading="MY LOGIC HUB" home={true} />

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
        </Link>
        <Link className="propositional-logic-link" to="/PropositionalLogicPage">
          <div>
            <PropositionalLogic />
          </div>
          <p>Propositional Logic Calculator</p>
        </Link>
        <Link className="venn-diagram-link" to="/VennDiagramPage">
          <div>
            <VennDiagram />
          </div>
          <p>Logic Venn</p>
        </Link>
        <Link className="truth-table-link" to="/TruthTablePage">
          <div>
            <TruthTable />
          </div>
          <p>Truth Table Generator</p>
        </Link>
        <Link className="pl-tree-link" to="/PLTreePage">
          <div>
            <PLTree />
          </div>
          <p>Semantic Tableaux Generator</p>
        </Link>
        <Link className="pl-indirect-proof-link" to="/PLIndirectProofPage">
          <div>
            <PLIndirectProof />
          </div>
          <p>Propositional Logic Indirect Proof</p>
        </Link>
        <Link className="quiz-link" to="/QuizPage">
          <p>
            Take this Quiz to find out which 19th century philopsher are you!
          </p>
        </Link>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
