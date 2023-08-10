import parseSymbolicLogicInput from "../../HelperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  checkIfWffIsPrimtive,
  negateWff,
} from "../PLTHelperFunctions/PLTHelperFunctions";
import TreeNode from "../TreeNode/TreeNode";

type MockNode = {
  premise: string[];
  isPrimitive: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
};

type ParentMap = Map<number | string, TreeNode>;
const constructTreeProof = (argumentArr: string[], conclusion: string) => {
  const conclusionArr = parseSymbolicLogicInput(conclusion);
  const negatedConclusion = negateWff(conclusionArr);
  const parentMap: ParentMap = new Map();
  const premiseArr: string[][] = [];
  const simplifiableExpressions: string[][] = [];
  let totalSteps = 1;

  for (let i = 0; i < argumentArr.length; i++) {
    /**Parsing of the premises */
    const premise = parseSymbolicLogicInput(argumentArr[i]);
    premiseArr.push(premise);
  }
  premiseArr.push(negatedConclusion);

  /**
   * To make the root node from the first premise
   */
  const firstPremise = premiseArr[0];
  const isPrimitive = checkIfWffIsPrimtive(firstPremise);
  if (!isPrimitive) simplifiableExpressions.push(firstPremise);
  const rootNode = new TreeNode(firstPremise, isPrimitive, 1);
  totalSteps++;
  premiseArr.shift();

  for (let i = 0; i < premiseArr.length; i++) {
    /**
     * To add the premises and the conlcusion to the tree
     */
    const premise = premiseArr[i];
    const isPrimitive = checkIfWffIsPrimtive(premise);
    if (!isPrimitive) simplifiableExpressions.push(premise);
    const premiseMockNode: MockNode = {
      premise: premise,
      isPrimitive: isPrimitive,
      orderNumber: totalSteps,
      originNumber: null,
    };
    rootNode.addMiddleChild(premiseMockNode, parentMap);
    totalSteps++;
  }

  do {
    console.log("doing onceeeeee");
    const oldTotalSteps = totalSteps;
    rootNode.unPackWffs(parentMap, totalSteps);
    if (oldTotalSteps === totalSteps) break;
  } while (true);
  rootNode.checkForAbusdity(rootNode, parentMap);

  console.log(parentMap);
  console.log(rootNode);
  return rootNode;
};

export default constructTreeProof;
