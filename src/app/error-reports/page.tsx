import "./ErrorReportsPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import Link from "next/link";
import getErrorReports from "../../utils/services/getErrorReports/getErrorReports";

export const metadata: Metadata = {
  title: "Error Reports | My Logic Hub",
  description: "See a log of reported errors.",
};

/**
 * A React component for rendering a Whats new Page.
 *
 *
 * @returns - A JSX Element with the Whats new Page
 */
const ErrorReportsPage = async () => {
  const errorReportsData = await getErrorReports();

  return (
    <div className="error-reports-page Page-layout">
      <Header heading="Error Reports" />
      <div className="error-reports-container">
        {errorReportsData ? (
          <div>
            {errorReportsData.map((item, index) => (
              <div key={index} className="error-reports-item">
                <p>{item.body}</p>
                <h3 className="user-name">{item.by || "By anonymous user"}</h3>
              </div>
            ))}
          </div>
        ) : (
          <h2>Error trying to fetch the data.</h2>
        )}
        <p className="report-issue">
          You may report your issues at the{" "}
          <Link href="/report-issue">Report issue</Link> page.
        </p>
      </div>
    </div>
  );
};

export default ErrorReportsPage;
