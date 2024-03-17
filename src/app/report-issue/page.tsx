import Header from "../../components/Header/Header";
import EmailJsPoweredForm from "../../components/EmailJsPoweredForm/EmailJsPoweredForm";
import "../../styles/form-page-shared-styles.scss";
import type { Metadata } from "next";
import BuyMeACoffeeButton from "../../components/BuyMeACoffeeButton/BuyMeACoffeeButton";

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
 * @returns - A React JSX element representing the Report Issue page.
 */

const ReportIssuePage = () => {
  return (
    <div>
      <Header heading="Report Issue" />
      <main className="Form-page">
        <div>
          <EmailJsPoweredForm pageType="Report Issue" />
          <p className="feedback">Your feedback is always appreciated. </p>
          <p>
            You can also report issues at{" "}
            <a href="mailto:krorshack.helpdesk@gmail.com">
              krorshack.helpdesk@gmail.com
            </a>
          </p>
        </div>
      </main>
      <BuyMeACoffeeButton />
    </div>
  );
};

export default ReportIssuePage;
