import inferThroughPermutations from "../../utils/quantifiableLogicUtils/inferThroughPermutations/inferThroughPermutations";

onmessage = function (event) {
  const { propositionArr, conc } = event.data;

  const newDeductionSteps = inferThroughPermutations(propositionArr, conc);

  postMessage(newDeductionSteps);
};
