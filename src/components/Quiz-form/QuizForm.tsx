"use client";
import React, { useState } from "react";

import PopupContainer from "../PopupContainer/PopupContainer";
import "./QuizForm.scss";
import CloseButton from "../CloseButton/CloseButton";
import Loading from "../Loading/Loading";

const QuizForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedOption, setSelectedOption] = useState<"yes" | "no">();

  const handleOptionChange = () => {
    setSelectedOption(selectedOption === "no" ? "yes" : "no");
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowPopup(true);
    }, 1000);
  }

  function closePopup() {
    setShowPopup((prev) => !prev);
  }

  return (
    <div className="quiz-form-wrapper">
      {isLoading && <Loading />}
      <PopupContainer
        show={showPopup}
        closePopupFunction={() => setShowPopup(false)}
      >
        <div className="quiz-popup">
          {isExpanded ? (
            <p>
              Since all the 19th century philosophers are dead, you are probably
              none of them. This is a work of satire not to be taken seriously.
            </p>
          ) : (
            <p>
              {" "}
              Since all the 19th century philosophers are dead, you are probably
              none of them.
            </p>
          )}
          <div className="button-container">
            <CloseButton closeFunction={closePopup} />
            <button className="show-more" onClick={toggleExpansion}>
              {isExpanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </PopupContainer>
      <form className="quiz-form" onSubmit={handleSubmit}>
        <label> Q) Are you dead? </label>
        <label>
          <input
            type="radio"
            value={selectedOption}
            checked={selectedOption === "no"}
            onChange={handleOptionChange}
          />
          {selectedOption === "no" ? "No" : "Yes"}
        </label>
        <label>
          <input
            type="radio"
            value={selectedOption === "no" ? "yes" : "no"}
            checked={selectedOption === "yes"}
            onChange={handleOptionChange}
          />
          {selectedOption === "no" ? "Yes" : "No"}
        </label>
        <button disabled={selectedOption ? false : true} type="submit">
          Next page
        </button>
      </form>
    </div>
  );
};
export default QuizForm;
