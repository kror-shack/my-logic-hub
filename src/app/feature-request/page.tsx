import Header from "../../components/Header/Header";
import "../../styles/form-page-shared-styles.scss";
import type { Metadata } from "next";
import EmailJsPoweredForm from "../../components/EmailJsPoweredForm/EmailJsPoweredForm";

export const metadata: Metadata = {
  title: "Request a Feature | My Logic Hub",
  description:
    "Report a Feature: Help us improve by requesting any feature. Your feedback is valuable. Let's make things better together.",
};

/**
 * A React component for displaying a EmailJS powered form.
 *
 * This componenet renders a form for a feature request that uses EmailJS api
 * to forward the mail to the respected address.
 *
 * @component
 * @returns - A React JSX element representing the Feature Request page.
 */

const FeatureRequest = () => {
  return (
    <div>
      <Header heading="Feature-request" />
      <main className="Form-page">
        <div>
          <EmailJsPoweredForm pageType="Request Feature" />
          <p className="feedback">
            Please leave your email if you would like to be added as a
            contributor to this project.{" "}
          </p>
          <p className="feedback">Your feedback is always appreciated. </p>
          <p>
            You can also request features at{" "}
            <a href="mailto:krorshack.helpdesk@gmail.com">
              krorshack.helpdesk@gmail.com
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default FeatureRequest;
