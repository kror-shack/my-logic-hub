import Header from "../../components/Header/Header";
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
    <div className="Venn-diagram-page">
      <Header heading="Logic Venn" />
      <NotebookLines />
      <VennDiagramBody />
    </div>
  );
};

export default VennDiagramPage;
