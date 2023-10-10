import Header from "../../components/Header/Header";
import ReportIssueForm from "../../components/ReportIssueForm/ReportIssueForm";
import "./ReportIssuePage.scss";
import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report an Issue | My Logic Hub",
  description:
    "Report an Issue: Help us improve by reporting any problems or concerns. Your feedback is valuable. Let's make things better together.",
};

/**
 * A React component for displaying a EmailJS powered form.
 *
 * This componenet renders a form for reporting an issue that uses EmailJS api
 * to forward the mail to the respected address.
 *
 * @component
 * @returns - A React JSX element representing the Report Issue Page page.
 */

const ReportIssuePage = () => {
  return (
    <div>
      <Header heading="Report Issue" />
      <main className="Report-issue-page">
        <div>
          <ReportIssueForm />
          <p className="feedback">Your feedback is always appreciated. </p>
          <p>
            You can also report issues at{" "}
            <a href="mailto:krorshack.helpdesk@gmail.com">
              krorshack.helpdesk@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ReportIssuePage;
