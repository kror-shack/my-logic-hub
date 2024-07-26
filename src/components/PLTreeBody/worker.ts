import constructTreeProof from "../../utils/pLTreeUtils/constructTreeProof/constructTreeProof";

onmessage = function (event) {
  const { copiedPropositionArr, conc } = event.data;

  const newDeductionSteps = constructTreeProof(copiedPropositionArr, conc);

  postMessage(newDeductionSteps);
};
