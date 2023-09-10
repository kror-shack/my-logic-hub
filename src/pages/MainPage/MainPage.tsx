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
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import VersionPopup from "../../components/VersionPopup/VersionPopup";

type Props = {
  firstRender: boolean;
  setFirstRender: React.Dispatch<React.SetStateAction<boolean>>;
};

/**
 * A React component displaying the Main page of myLogicHub.
 *
 * This component contains links to all other pages and shows a beta version popup
 * on the first rendering of the app.
 *
 * @param Props.firstRender - A boolean depicting whether this is the first render of the main page.
 * @param Props.setFirstRender - A function to set the state of the first parameter.
 * @returns - A JSX Element with links to all pages and a popup alert.
 */
const MainPage = ({ firstRender, setFirstRender }: Props) => {
  const [popupVisible, setPopupVisible] = useState(firstRender);

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    setFirstRender(false);
    console.log(
      "My logic hub is an open source software under the Apache License 2.0."
    );
  }, []);

  return (
    <div className="Main-page">
      <Header heading="MY LOGIC HUB" home={true} />

      {popupVisible && <VersionPopup onClose={closePopup} />}

      <NotebookLines />
      <div className="aside-links-container">
        <div className="report-issue">
          <Link to="/AboutPage">About </Link>
        </div>
        <div className="report-issue">
          <Link to="/ReportIssuePage">
            Report an issue <WarningSvg />
          </Link>
        </div>
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
            Take this Quiz to find out which 19th century philosopher are you!
          </p>
        </Link>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainPage;
