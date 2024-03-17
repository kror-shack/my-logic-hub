import "./AboutPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import BuyMeACoffeeButton from "../../components/BuyMeACoffeeButton/BuyMeACoffeeButton";

export const metadata: Metadata = {
  title: "About Us | My Logic Hub",
  description: "Learn more about My Logic Hub, it's developer and license.",
};

/**
 * A React component for rendering a About Page.
 *
 *
 * @returns - A JSX Element with the About Page
 */
const AboutPage = () => {
  return (
    <div className="About-page Page-layout">
      <Header heading="About Us" />
      <main className="About-container">
        <h2>About my logic hub</h2>
        <p>
          My Logic Hub contains tools for performing various logical
          calculations. This app is open-sourced and licensed under the GNU
          General Public License v3. This application is currently in
          development, and I also intend to continue contributing to it as I
          learn more logical concepts. You can find the repository on{" "}
          <a href="https://github.com/kror-shack/logic-app">GitHub</a>
        </p>
        <h2>About Me</h2>
        <p>
          Hi there! I'm Fouzan Tariq, the developer behind my logic hub. I am a
          second-year undergraduate student at Middle East Technical University.
          Most of the contents around which the calculators of this application
          are built are concepts that I was introduced to in my introductory
          symbolic logic course. I could not find any suitable online tools to
          help me with my course at the time, so here we are :)
        </p>

        <h2>Contact</h2>
        <p>
          If you have any questions, feedback, or suggestions, please feel free
          to reach out to me at{" "}
          <a href="mailto:tariqfouzan@gmail.com">tariqfouzan@gmail.com</a>. Your
          input is valuable and helps me improve this app for everyone.
        </p>
      </main>
      <BuyMeACoffeeButton />
    </div>
  );
};

export default AboutPage;
