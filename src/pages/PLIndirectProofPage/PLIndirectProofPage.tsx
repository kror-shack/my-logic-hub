import Header from "../../components/Header/Header";
import NotebookLines from "../../components/NotebookLines/NotebookLines";
import PLIndirectProofBody from "../../components/PLIndirectProofBody/PLIndirectProofBody";

/**
 * A React component displaying the propositional logic indirect proof page.
 *
 * @returns - A JSX element with the respective page.
 */
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
