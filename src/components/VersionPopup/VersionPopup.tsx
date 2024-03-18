"use client";
import React, { useState, useEffect, useRef } from "react";
import "./VersionPopup.scss";
import Toast from "../Toast/Toast";

type Props = {
  onClose: () => void;
};

/**
 * A React component for displaying a welcome notification and popup for the beta version of the app.
 *
 * @component
 * @param  Props.onClose - A function to close the popup.
 * @returns - A React JSX element representing the welcome notification and popup.
 */

const VersionPopup = ({ onClose }: Props) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(true);

  let timeoutId: NodeJS.Timeout | null = null;

  const delayedFunction = () => {
    setShowNotification(false);
  };

  if (showNotification) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(delayedFunction, 5000);
  }

  const handleNotificationOnClick = () => {
    setShowPopup(true);
    setShowNotification(false);
  };

  const handleBackdropOnClick = (e: React.MouseEvent) => {
    const eventTarget = e.target as Node;
    if (!popupRef.current) return;
    if (!popupRef.current.contains(eventTarget)) {
      onClose();
    }
  };

  return (
    <>
      {showNotification && (
        <div className="notification">
          <button onClick={handleNotificationOnClick}>
            Welcome to the Beta Version!
          </button>
        </div>
      )}
      {showPopup && (
        <div
          className="popup-backdrop"
          onClick={(e) => handleBackdropOnClick(e)}
        >
          <div
            ref={popupRef}
            aria-label="Beta version alert"
            data-testid="alertdialog"
            role="alertdialog"
            className={`alert-popup`}
          >
            <div className="popup-content">
              <h6>Welcome to the Beta Version!</h6>
              <br></br>
              <p>
                {" "}
                Please note that this version is in its early stages of
                development and may have some rough edges. Your valuable
                feedback will help us improve the experience for everyone.{" "}
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
      )}
    </>
  );
};

export default VersionPopup;
