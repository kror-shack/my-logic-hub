import React, { useEffect, useState } from "react";
import "./FontChangeSwitch.scss";

type Props = {
  fontStyle: "cursive" | "formal";
  setFontStyle: React.Dispatch<React.SetStateAction<"cursive" | "formal">>;
};

const FontChangeSwitch = ({ fontStyle, setFontStyle }: Props) => {
  const toggleFontStyle = () => {
    setFontStyle((prevStyle) => {
      const newStyle = prevStyle === "cursive" ? "formal" : "cursive";
      localStorage.setItem("fontStyle", newStyle);
      return newStyle;
    });
  };

  const handleCheckboxChange = () => {
    toggleFontStyle();
  };

  useEffect(() => {
    if (fontStyle === "cursive") {
      document.body.classList.add("cursive");
      document.body.classList.remove("formal");
    } else {
      document.body.classList.add("formal");
      document.body.classList.remove("cursive");
    }
  }, [fontStyle]);

  return (
    <div className="font-change-switch">
      <input
        type="checkbox"
        role="switch"
        id="change-font"
        onChange={handleCheckboxChange}
        checked={fontStyle === "formal"}
      />
      <label htmlFor="change-font" id="change-font-label">
        Change Font for Logic Fields
      </label>
    </div>
  );
};

export default FontChangeSwitch;
