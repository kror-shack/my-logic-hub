import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import VennDiagramBody from "../../components/VennDiagramComponents/VennDiagramBody/VennDiagramBody";
import "./VennDiagramPage.scss";

/**
 * A React component for displaying a page containing a Logic Venn Diagram.
 *
 * @component
 * @returns - A React JSX element representing the Venn Diagram page.
 */

const VennDiagramPage = () => {
  return (
    <div className="Propositional-logic-page">
      <Header heading="Logic Venn" />
      <NotebookLines />
      <VennDiagramBody />
      <InfoLink url="/info/venn-diagram" />
    </div>
  );
};

export default VennDiagramPage;
