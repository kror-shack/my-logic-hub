import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VennDiagramPage from "./pages/VennDiagramPage/VennDiagramPage";
import MainPage from "./pages/MainPage/MainPage";
import TruthTablePage from "./pages/TruthTablePage/TruthTablePage";
import PropositionalLogicPage from "./pages/PropositionalLogicPage/PropositionalLogicPage";
import QuantifiableLogicPage from "./pages/QuantifiableLogicPage/QuantifiableLogicPage";
import constructTreeProof from "./utils/PLTreeUtils/constructTreeProof/constructTreeProof";
import PLTreePage from "./pages/PLTreePage/PLTreePage";
import PLIndirectProofBody from "./components/PLIndirectProofBody/PLIndirectProofBody";
import PLIndirectProofPage from "./pages/PLIndirectProofPage/PLIndirectProofPage";
import ReportIssuePage from "./pages/ReportIssuePage/ReportIssuePage";
import QuizPage from "./pages/QuizPage/QuizPage";
import AboutPage from "./pages/AboutPage/AboutPage";
import InfoPage from "./pages/InfoPage/InfoPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import PageInfo from "./pages/PageInfo/PageInfo";

function App() {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    console.log(
      "My logic hub is an open source software under the GNU General Public License v3."
    );
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainPage
                firstRender={firstRender}
                setFirstRender={setFirstRender}
              />
            }
          />
          <Route path="/venn-diagram-generator" element={<VennDiagramPage />} />
          <Route path="/truth-table-generator" element={<TruthTablePage />} />
          <Route
            path="/propositional-logic-calculator"
            element={<PropositionalLogicPage />}
          />
          <Route
            path="/quantificational-logic-calculator"
            element={<QuantifiableLogicPage />}
          />
          <Route path="/semantic-tableaux-generator" element={<PLTreePage />} />
          <Route
            path="/propositional-logic-indirect-proof-generator"
            element={<PLIndirectProofPage />}
          />
          <Route path="/report-issue" element={<ReportIssuePage />} />
          <Route path="/philosopher-quiz" element={<QuizPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="info/:pageName" element={<PageInfo />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
