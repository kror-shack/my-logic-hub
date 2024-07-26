import React, { useEffect, useState } from "react";
import "./FontChangeSwitch.scss";

const FontChangeSwitch = () => {
  const [fontStyle, setFontStyle] = useState<"cursive" | "formal">(() => {
    if (typeof window !== "undefined") {
      const savedStyle = localStorage.getItem("fontStyle");
      return savedStyle ? (savedStyle as "cursive" | "formal") : "cursive";
    }
    return "cursive";
  });

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
      <label htmlFor="change-font" id="change-font-label">
        Change Font
      </label>
      <input
        type="checkbox"
        role="switch"
        id="change-font"
        onChange={handleCheckboxChange}
        checked={fontStyle === "formal"}
      />
    </div>
  );
};

export default FontChangeSwitch;
