import React, { useEffect, useState } from "react";
import "./FontChangeSwitch.scss";

const FontChangeSwitch = () => {
  const [fontStyle, setFontStyle] = useState<"cursive" | "formal">("cursive");

  const toggleFontStyle = () => {
    setFontStyle((prevStyle) =>
      prevStyle === "cursive" ? "formal" : "cursive"
    );
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
