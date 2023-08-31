import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLIndirectProofBody from "../../components/PLIndirectProofBody/PLIndirectProofBody";

const PLIndirectProofPage = () => {
  return (
    <div>
      <Header heading="Propositional Logic Indirect Proof" />
      <NotebookLines />
      <PLIndirectProofBody />
    </div>
  );
};

export default PLIndirectProofPage;
