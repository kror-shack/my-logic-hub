import VennDiagramBody from "../../components/VennDiagramComponents/VennDiagramBody/VennDiagramBody";
import VennDiagramFooter from "../../components/VennDiagramComponents/VennDiagramFooter/VennDiagramFooter";
import VennDiagramHeader from "../../components/VennDiagramComponents/VennDiagramHeader/VennDiagramHeader";
import "./VennDiagramPage.scss";

const VennDiagramPage = () => {
  return (
    <div className="Venn-diagram-page">
      <VennDiagramHeader />
      <VennDiagramBody />
      <VennDiagramFooter />
    </div>
  );
};

export default VennDiagramPage;
