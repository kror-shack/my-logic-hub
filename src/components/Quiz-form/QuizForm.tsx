"use client";
import React, { useState } from "react";
import LoadingSvg from "../../../public/assets/svgs/loading.svg";
import Logo from "../../../public/assets/svgs/main-icon.svg";

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
    <>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-icon">
            <Logo />
            <LoadingSvg />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="loading-overlay">
          <div className="popup">
            {isExpanded ? (
              <p>
                Since all the 19th century philosophers are dead, you are
                probably none of them. This is a work of satire not to be taken
                seriously.
              </p>
            ) : (
              <p>
                {" "}
                Since all the 19th century philosophers are dead, you are
                probably none of them.
              </p>
            )}
            <button className="show-more" onClick={toggleExpansion}>
              {isExpanded ? "Show Less" : "Show More"}
            </button>
            <div>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
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
    </>
  );
};
export default QuizForm;
