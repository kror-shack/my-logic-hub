import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VennDiagramPage from "./pages/VennDiagramPage/VennDiagramPage";
import MainPage from "./pages/MainPage/MainPage";
import TruthTablePage from "./pages/TruthTablePage/TruthTablePage";
import PropositionalLogicPage from "./pages/PropositionalLogicPage/PropositionalLogicPage";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
