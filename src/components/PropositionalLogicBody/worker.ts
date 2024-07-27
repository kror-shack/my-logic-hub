import getDeductionSteps from "../../utils/propositionalLogicUtils/getDeductionSteps/getDeductionsteps";

onmessage = function (event) {
  const { propositionArr, conc } = event.data;

  const newDeductionSteps = getDeductionSteps(propositionArr, conc);

  postMessage(newDeductionSteps);
};
