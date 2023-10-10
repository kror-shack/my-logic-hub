import Link from "next/link";
import Header from "../../components/Header/Header";
import "./InfoPage.scss";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Info | My Logic Hub",
  description:
    "Explore our informative Info Page. Find valuable resources and useful links to enhance your knowledge about logical calculations on My Logic Hub.",
};

/**
 * Renders an info page
 *
 * @component
 * @returns A JSX element of a summary of the info pages, and links to all the info pages
 */
const InfoPage = () => {
  const pages = [
    {
      id: "quantificational-logic",
      name: "Quantificational Logic Calculator",
    },
    {
      id: "propositional-logic",
      name: "Propositional Logic Calculator",
    },
    {
      id: "venn-diagram",
      name: "Venn Diagram Generator",
    },
    {
      id: "truth-table",
      name: "Truth Table Generator",
    },
    {
      id: "semantic-tableaux",
      name: "Semantic Tableaux Generator",
    },
    {
      id: "propositional-logic-indirect-proof",
      name: "Propositional Logic Indirect Proof Generator",
    },
  ];

  return (
    <div className="Info-page Page-layout">
      <Header heading="Info" />
      <div className="info-container">
        <p>
          This page contains links to information of the different tools present
          in my logic hub. You can get detailed information on the purpose of
          the tool, the input syntax, and the supported rules of inference.
        </p>

        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link href={`/info/${page.id}`}>{page.name} info</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPage;
