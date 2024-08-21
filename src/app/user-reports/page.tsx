import "./ErrorReportsPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import Link from "next/link";
import getErrorReports from "../../utils/services/getErrorReports/getErrorReports";
import ErrorReportStatus from "../../components/ErrorReportStatus/ErrorReportStatus";

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
      <Header heading="User Reports" />
      <div className="error-reports-container">
        <p className="report-issue">
          Thank you for your reports and feature requests. They help make the
          app better for everyone. :)
        </p>
        {errorReportsData ? (
          <div>
            {errorReportsData.map((item, index) => (
              <div key={index} className="error-reports-item">
                <h3>{item.createdAt}</h3>
                <ErrorReportStatus status={item.status} />
                <p>{item.body}</p>
                {item.link && (
                  <p className="reply">
                    <span>Link: </span>
                    <Link href={item.link} className="error-report-link">
                      {item.link}
                    </Link>
                  </p>
                )}
                {item.reply && (
                  <p className="reply">
                    <span>Developer's Reply: </span>
                    {item.reply}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <h2>Error trying to fetch the data.</h2>
        )}
        <p className="report-issue">
          It may take up to a day for your error report to show up here. You may
          report your issues at the{" "}
          <Link href="/report-issue">Report issue</Link> page and your feature
          requests at the <Link href="/feature-request">Feature request</Link>{" "}
          page.
        </p>
      </div>
    </div>
  );
};

export default ErrorReportsPage;
