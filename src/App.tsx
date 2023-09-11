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
          <Route path="/VennDiagramPage" element={<VennDiagramPage />} />
          <Route path="/TruthTablePage" element={<TruthTablePage />} />
          <Route
            path="/PropositionalLogicPage"
            element={<PropositionalLogicPage />}
          />
          <Route
            path="/QuantifiableLogicPage"
            element={<QuantifiableLogicPage />}
          />
          <Route path="/PLTreePage" element={<PLTreePage />} />
          <Route
            path="/PLIndirectProofPage"
            element={<PLIndirectProofPage />}
          />
          <Route path="/ReportIssuePage" element={<ReportIssuePage />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/AboutPage" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
