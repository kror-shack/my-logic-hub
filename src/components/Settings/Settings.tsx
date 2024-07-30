import React, { useState } from "react";

import "./Settings.scss";
import FontChangeSwitch from "../FontChangeSwitch/FontChangeSwitch";
import SetSymbols from "../SetSymbols/SetSymbols";
import PopupContainer from "../PopupContainer/PopupContainer";

const Settings = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [symbols, setSymbols] =
    useState<Record<string, string>>(defaultSymbols);
  const [fontStyle, setFontStyle] = useState<"cursive" | "formal">(() => {
    if (typeof window !== "undefined") {
      const savedStyle = localStorage.getItem("fontStyle");
      return savedStyle ? (savedStyle as "cursive" | "formal") : "cursive";
    }
    return "cursive";
  });

  const resetSymbols = () => {
    const defaultSymbols: Record<string, string> = {
      and: "∧",
      or: "∨",
      not: "¬",
      implication: "->",
      biconditional: "<->",
    };
    setSymbols(defaultSymbols);
    Object.keys(defaultSymbols).forEach((key) =>
      localStorage.setItem(`${key}Symbol`, defaultSymbols[key])
    );
    window.dispatchEvent(new Event("storage"));
  };

  const resetFont = () => {
    if (fontStyle === "cursive") return;
    setFontStyle(() => {
      const newStyle = "cursive";
      localStorage.setItem("fontStyle", newStyle);
      return newStyle;
    });
  };

  const handleReset = () => {
    resetSymbols();
    resetFont();
  };
  return (
    <div className="settings">
      <button className="settings-button" onClick={() => setShowPopup(true)}>
        Settings
      </button>
      <PopupContainer
        show={showPopup}
        closePopupFunction={() => setShowPopup(false)}
      >
        <div className="container">
          <FontChangeSwitch fontStyle={fontStyle} setFontStyle={setFontStyle} />
          <div className="line" />
          <SetSymbols symbols={symbols} setSymbols={setSymbols} />
          <div className="button-container">
            <button className="set-button" onClick={() => setShowPopup(false)}>
              Close
            </button>
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </PopupContainer>
    </div>
  );
};

export default Settings;

const defaultSymbols = {
  and: "∧",
  or: "∨",
  not: "¬",
  implication: "->",
  biconditional: "<->",
};
