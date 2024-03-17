import React from "react";
import "./BuyMeACoffeeButton.scss";

const BuyMeACoffeeButton = () => {
  return (
    <div className="buy-me-a-coffee-container">
      <a
        className="buy-button"
        target="_blank"
        href="https://www.buymeacoffee.com/krorshack"
      >
        <img
          className="coffee-image"
          src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
          alt="Buy me a coffee"
        />
        <span className="coffee-button-text">Buy me a Coffee!</span>
      </a>
    </div>
  );
};

export default BuyMeACoffeeButton;
