import constructTreeProof from "../../utils/pLTreeUtils/constructTreeProof/constructTreeProof";

onmessage = function (event) {
  const { propositionArr, conc } = event.data;

  const newDeductionSteps = constructTreeProof(propositionArr, conc);

  postMessage(newDeductionSteps);
};
