import getContradictionSteps from "../../utils/pLIndirectProofUtils/getContradictionSteps/getContradictionSteps";

onmessage = function (event) {
  const { propositionArr, conc } = event.data;

  const newDeductionSteps = getContradictionSteps(propositionArr, conc);

  postMessage(newDeductionSteps);
};
