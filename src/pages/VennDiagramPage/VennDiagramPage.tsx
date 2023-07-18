import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import VennDiagramBody from "../../components/VennDiagramComponents/VennDiagramBody/VennDiagramBody";
import VennDiagramFooter from "../../components/VennDiagramComponents/VennDiagramFooter/VennDiagramFooter";
import VennDiagramHeader from "../../components/VennDiagramComponents/VennDiagramHeader/VennDiagramHeader";
import "./VennDiagramPage.scss";

const VennDiagramPage = () => {
  return (
    <div className="Venn-diagram-page">
      <Header heading="Logic Venn" />
      <VennDiagramBody />
      <Footer />
    </div>
  );
};

export default VennDiagramPage;
