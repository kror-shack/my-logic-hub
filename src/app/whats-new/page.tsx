import "./WhatsNewPage.scss";
import Header from "../../components/Header/Header";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";
import getWhatsNew from "../../utils/services/getWhatsNew/getWhatsNew";

export const metadata: Metadata = {
  title: "Whats New | My Logic Hub",
  description: "Discover the latest releases, features, and developments.",
};

/**
 * A React component for rendering a Whats new Page.
 *
 *
 * @returns - A JSX Element with the Whats new Page
 */
const WhatsNewPage = async () => {
  const whatsNewData = await getWhatsNew();

  return (
    <div className="whats-new-page Page-layout">
      <Header heading="Whats New" />
      <div className="whats-new-container">
        {whatsNewData ? (
          <div>
            {whatsNewData.map((item, index) => (
              <div key={index} className="whats-new-item">
                <p className="date">{item.createdAt}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        ) : (
          <h2>Error trying to fetch the data.</h2>
        )}
      </div>
    </div>
  );
};

export default WhatsNewPage;
