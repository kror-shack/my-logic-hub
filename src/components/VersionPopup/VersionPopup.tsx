import React, { useState, useEffect } from "react";
import { ReactComponent as ThumbTackSvg } from "../../assets/svgs/thumbtack.svg";
import "./VersionPopup.scss";

type Props = {
  onClose: () => void;
};

const VersionPopup = ({ onClose }: Props) => {
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    const hasShownPopup = localStorage.getItem("shownPopup");

    if (!hasShownPopup) {
      localStorage.setItem("shownPopup", "true");
      setFirstRender(true);
    }
  }, []);

  if (!firstRender) {
    return null;
  }

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <div className="popup-content">
          <ThumbTackSvg />
          <p>Welcome to the Beta Version!</p>
          <br></br>
          <p>
            {" "}
            Please note that this version is in its early stages of development
            and may have some rough edges. Your valuable feedback will help us
            improve the experience for everyone.{" "}
          </p>
          <br></br>
          <p>
            Thank you for being part of this exciting phase!<br></br> Best
            regards,
          </p>
          <div className="popup-buttons">
            <button className="popup-button" onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionPopup;
