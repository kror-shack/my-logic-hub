import "./HistoryPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import UserHistory from "../../components/UserArgHistory/UserArgHistory";

export const metadata: Metadata = {
  title: "User History | My Logic Hub",
  description: "See your previous arguments .",
};

/**
 *
 * @returns - A JSX Element with the History Page
 */
const HistoryPage = () => {
  return (
    <div className="history-page Page-layout">
      <Header heading="Your History" />
      <main className="history-container">
        <h2>Your recently entered arguments</h2>
        <p>
          Your recently entered arguments will show up here. Prewritten example
          arguments on the pages are not included.
        </p>
        <p>Click on an argument to visit the respected page!</p>
        <UserHistory />
      </main>
    </div>
  );
};

export default HistoryPage;
