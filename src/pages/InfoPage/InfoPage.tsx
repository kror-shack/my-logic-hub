import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import "./InfoPage.scss";

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
    <div className="Info-page">
      <Header heading="Info" />
      <NotebookLines />
      <div className="info-container">
        <p>
          This page contains links to information of the different tools present
          in my logic hub. You can get detailed information on the purpose of
          the tool, the input syntax, and the supported rules of inference.
        </p>

        <ul>
          {pages.map((page) => (
            <li key={page.id}>
              <Link to={`/info/${page.id}`}>{page.name} info</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InfoPage;
