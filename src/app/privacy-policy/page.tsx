import "./PrivacyPolicyPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import "./PrivacyPolicyPage.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | My Logic Hub",
  description: "Review the privacy practices and policies of My Logic Hub.",
};

/**
 * A React component for rendering a Privacy Policy Page.
 *
 *
 * @returns - A JSX Element with the Privacy Policy Page
 */
const PrivacyPolicyPage = () => {
  return (
    <div className="privacy-policy-page Page-layout">
      <Header heading="Privacy Policy" />
      <main className="privacy-policy-container">
        <h2>Data Privacy</h2>
        <p>
          We store all user-submitted arguments for up to 30 days solely for
          data analysis purposes. No personal data is collected or stored apart
          from what the user submits willingly in feature requests or error
          reports.
        </p>
        <p>
          We store user preferences in your browser and track analytics to
          enhance your experience. This data is anonymous and does not include
          any personal information.
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
