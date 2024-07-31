import React, { ReactNode } from "react";
import "./PopupContainer.scss";
import Cross from "../../../public/assets/svgs/cross.svg";

interface PopupContainerProps {
  children: ReactNode;
  show: boolean;
  closePopupFunction: () => void;
}

const PopupContainer: React.FC<PopupContainerProps> = ({
  children,
  show,
  closePopupFunction,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-container">
      <div className="loading-overlay" onClick={closePopupFunction} />
      <div className="popup">
        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
};

export default PopupContainer;
