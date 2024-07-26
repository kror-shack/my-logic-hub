import getContradictionSteps from "../../utils/pLIndirectProofUtils/getContradictionSteps/getContradictionSteps";

onmessage = function (event) {
  const { copiedPropositionArr, conc } = event.data;

  const newDeductionSteps = getContradictionSteps(copiedPropositionArr, conc);

  postMessage(newDeductionSteps);
};
