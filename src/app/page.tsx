"use client";
import React, { useEffect, useState } from "react";
import "./MainPage.scss";
import VennDiagram from "../../public/assets/svgs/venn-diagram.svg";
import TruthTable from "../../public/assets/svgs/truth-table.svg";
import PropositionalLogic from "../../public/assets/svgs/propositional-logic.svg";
import QuantifiableLogic from "../../public/assets/svgs/quantifiable-logic.svg";
import PLTree from "../../public/assets/svgs/PLTree.svg";
import PLIndirectProof from "../../public/assets/svgs/PLIndirectProof.svg";
import WarningSvg from "../../public/assets/svgs/warning.svg";
import VersionPopup from "../components/VersionPopup/VersionPopup";
import NotebookLines from "../components/NotebookLines/NotebookLines";
import Link from "next/link";
import Header from "../components/Header/Header";
import BuyMeACoffeeButton from "../components/BuyMeACoffeeButton/BuyMeACoffeeButton";

/**
 * A React component displaying the Main page of myLogicHub.
 *
 * This component contains links to all other pages and shows a beta version popup
 * on the first rendering of the app.
 *
 * @returns - A JSX Element with links to all pages and a popup alert.
 */
const MainPage = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    const pop_status = sessionStorage.getItem("pop_status");
    if (!pop_status) {
      setPopupVisible(true);
      sessionStorage.setItem("pop_status", "one");
    }
  });

  return (
    <div className="Main-page">
      <Header heading="MY LOGIC HUB" home={true} />
      {popupVisible && <VersionPopup onClose={closePopup} />}
      <div className="aside-links-container">
        <div className="link-secondary">
          <Link href="/about-us">About</Link>
        </div>

        <div className="link-secondary">
          <Link href="/feature-request">Feature Request</Link>
        </div>
        <div className="link-secondary">
          <Link href="/report-issue">
            Report issue <WarningSvg />
          </Link>
        </div>
      </div>
      <BuyMeACoffeeButton />

      <main className="main">
        <Link
          className="quantifiable-logic-link"
          href="/quantificational-logic-calculator"
        >
          <div>
            <QuantifiableLogic viewBox="0 0 283 154" />
          </div>
          <p>Quantificational Logic Calculator</p>
        </Link>
        <Link
          className="propositional-logic-link"
          href={`/propositional-logic-calculator`}
        >
          <div>
            <PropositionalLogic viewBox="0 0 198 125" />
          </div>
          <p>Propositional Logic Calculator</p>
        </Link>
        <Link className="venn-diagram-link" href="/venn-diagram-generator">
          <div>
            <VennDiagram viewBox="0 0 504 326" />
          </div>
          <p>Logic Venn</p>
        </Link>
        <Link className="truth-table-link" href="/truth-table-generator">
          <div>
            <TruthTable viewBox="0 0 432 268" />
          </div>
          <p>Truth Table Generator</p>
        </Link>
        <Link className="pl-tree-link" href="/semantic-tableaux-generator">
          <div>
            <PLTree viewBox="0 0 222 161" />
          </div>
          <p>Semantic Tableaux Generator</p>
        </Link>
        <Link
          className="pl-indirect-proof-link"
          href="propositional-logic-indirect-proof-generator"
        >
          <div>
            <PLIndirectProof viewBox="0 0 198 154" />
          </div>
          <p>Propositional Logic Indirect Proof</p>
        </Link>
        <Link
          className="quiz-link"
          href="/which-19th-century-philosopher-are-you-quiz"
          data-cy="quiz-link"
        >
          <p>
            Take this quiz to find out which 19th century philosopher are you!
          </p>
        </Link>
      </main>
    </div>
  );
};

export default MainPage;
