import NotebookLines from "../../components/NotebookLines/NotebookLines";
import "./QuizPage.scss";
import Header from "../../components/Header/Header";
import React, { useState } from "react";
import { ReactComponent as LoadingSvg } from "../../assets/svgs/loading.svg";

/**
 * A React component for rendering a satirical quiz page.
 *
 * The contents of this page are entirely satirical.
 *
 * @returns - A JSX Element with the content of the quiz and a on trigger popup.
 */
const QuizPage = () => {
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
    <div>
      <Header heading="Quiz Page" />
      <NotebookLines />
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-icon">
            <LoadingSvg />
          </div>
        </div>
      )}
      {showPopup && (
        <div className="loading-overlay">
          <div className="result-popup">
            {isExpanded ? (
              <p>
                Since all the 19th century philopshers are dead you are probably
                none of them. This is a work of satire not to be taken
                seriously.
              </p>
            ) : (
              <p>
                {" "}
                Since all the 19th century philopshers are dead you are probably
                none of them.
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
      <div className="Quiz-container">
        <h2>Which Philospher are you?</h2>
        <p>
          This intriguing quiz has been meticulously crafted to help you
          discover which philosopher's essence resonates most with your own
          personality. Drawing inspiration from the distinct traits and life
          experiences of renowned philosophers, this quiz offers an intriguing
          journey. Through a series of a thought-provoking question, you might
          explore how your individual tendencies align with the philosophical
          frameworks and viewpoints that these philosophers developed. As you
          answer the question, you might gain insights into how your personality
          relates to traits such as traits that some philosphers might even
          claim to be prior to essence. Uncover which philosopher's spirit you
          embody and gain a chance for a new perspective on how your own
          inclinations connect with the philosophies that have shaped the course
          of history.
        </p>
        <p>
          The personalities of 19th-century philosophers profoundly influenced
          their philosophies. Kant's meticulous nature shaped his systematic
          reasoning; Nietzsche's rebellious spirit fueled societal critiques.
          Marx's passion for justice drove class struggle theory; Kierkegaard's
          introspection led to authenticity exploration. Mill's empathy informed
          utilitarianism; Hegel's dialectic mind underpinned synthesis concept.
          Schopenhauer's struggles inspired suffering philosophy; Emerson's
          transcendentalism echoed deep natural connection. Engels'
          collaboration aided his partnership with Marx. In essence, their
          personalities inseparably intertwined with their philosophical
          contributions.
        </p>
        <h2 className="quiz-header">Start The Quiz!</h2>
        <p className="number">Question: 1 / 53</p>
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
          <button type="submit">Next page</button>
        </form>
      </div>
    </div>
  );
};

export default QuizPage;
