import React, { useState, useEffect } from "react";
import ThumbTackSvg from "../../public/assets/svgs/thumbtack.svg";
import "./VersionPopup.scss";

type Props = {
  onClose: () => void;
};

/**
 * A React component for displaying a welcome popup for the beta version of the app.
 *
 * @component
 * @param  Props.onClose - A function to close the popup.
 * @returns - A React JSX element representing the welcome popup.
 */

const VersionPopup = ({ onClose }: Props) => {
  // State to track the first render
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // Check if the popup has been shown before in local storage
    const hasShownPopup = localStorage.getItem("shownPopup");

    if (!hasShownPopup) {
      // If it hasn't been shown before, mark it as shown in local storage
      localStorage.setItem("shownPopup", "true");
      setFirstRender(true);
    }
  }, []);

  if (!firstRender) {
    // If it's not the first render, return null (don't render the popup)
    return null;
  }

  return (
    <div className="popup-backdrop">
      <div
        aria-label="Beta version alert"
        data-testid="alertdialog"
        role="alertdialog"
        className="alert-popup"
      >
        <div className="popup-content">
          <ThumbTackSvg />
          <h6>Welcome to the Beta Version!</h6>
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
