import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import TruthTableBody from "../../components/TruthTableComponents/TruthTableBody/TruthTableBody";

const TruthTablePage = () => {
  return (
    <div className="Truth-table-page">
      <Header heading="Truth Table Generator" />
      <TruthTableBody />
    </div>
  );
};

export default TruthTablePage;

export {};
