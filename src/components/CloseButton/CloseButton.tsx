import React from "react";
import "./CloseButton.scss";

type Props = {
  closeFunction: () => void;
};

const CloseButton = ({ closeFunction }: Props) => {
  return (
    <button className="close-button" onClick={closeFunction}>
      Close
    </button>
  );
};

export default CloseButton;
