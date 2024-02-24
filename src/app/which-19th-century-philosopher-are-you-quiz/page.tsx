import NotebookLines from "../../components/NotebookLines/NotebookLines";
import "./QuizPage.scss";
import Header from "../../components/Header/Header";
import QuizForm from "../../components/Quiz-form/QuizForm";
import "../../styles/popup-styles.scss";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Which 19th Century Philosopher are you? | My Logic Hub",
  description:
    "Discover Your Inner 19th Century Philosopher: Take the quiz and find out which 19th-century philosopher resonates with your beliefs and ideas.",
};
/**
 * A React component for rendering a satirical quiz page.
 *
 * The contents of this page are entirely satirical.
 *
 * @returns - A JSX Element with the content of the quiz and a on trigger popup.
 */
const QuizPage = () => {
  return (
    <div>
      <Header heading="Quiz Page" />

      <div className="Quiz-container">
        <h2>Which 19th Century Philosopher are you?</h2>
        <p>
          This intriguing quiz has been meticulously crafted to help you
          discover which philosopher's essence resonates most with your own.
          Drawing inspiration from the distinct traits and life experiences of
          renowned philosophers, this quiz offers an intriguing journey. Through
          a series of a thought-provoking question, you might explore how your
          individual tendencies align with the philosophical frameworks and
          viewpoints that these philosophers developed. As you answer the
          question, you might gain insights into how your personality relates to
          traits such as traits that some philosphers might even claim to be
          prior to essence. Uncover which philosopher's spirit you embody and
          gain a chance for a new perspective on how your own inclinations
          connect with the philosophies that have shaped the course of history.
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
        <QuizForm />
      </div>
    </div>
  );
};

export default QuizPage;
