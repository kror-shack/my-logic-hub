import getTruthFE from "../../utils/truthFEUtils/getTruthFE/getTruthFE";

onmessage = function (event) {
  const { propositionArr, conc } = event.data;

  const truthFESteps = getTruthFE(propositionArr, conc);

  postMessage(truthFESteps);
};
