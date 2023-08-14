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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
