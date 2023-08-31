import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import TruthTableBody from "../../components/TruthTableBody/TruthTableBody";

const TruthTablePage = () => {
  return (
    <div className="Truth-table-page">
      <Header heading="Truth Table" />
      <NotebookLines />
      <TruthTableBody />
    </div>
  );
};

export default TruthTablePage;

export {};
