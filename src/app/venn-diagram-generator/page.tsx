import Header from "../../components/Header/Header";
import InfoLink from "../../components/InfoLink/InfoLink";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import VennDiagramBody from "../../components/VennDiagramComponents/VennDiagramBody/VennDiagramBody";
import "../../styles/shared-page-layout.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Venn Diagram Generator| My Logic Hub",
  description:
    "Venn diagram Generator: Easily generate Venn diagrams for syllogistic figures. Visualize entities and their intersections effortlessly.",
};

/**
 * A React component for displaying a page containing a Logic Venn Diagram.
 *
 * @component
 * @returns - A React JSX element representing the Venn Diagram page.
 */

const VennDiagramPage = () => {
  return (
    <div className="Page-layout">
      <Header heading="Logic Venn" />
      <VennDiagramBody />
      <InfoLink url="/info/venn-diagram" />
    </div>
  );
};

export default VennDiagramPage;
