import parseSymbolicLogicInput from "../../helperFunctions/parseSymbolicLogicInput/parseSymbolicLogicInput";
import {
  checkIfWffIsBranchingNode,
  checkIfWffIsPrimtive,
  negateWff,
} from "../pLTHelperFunctions/pLTHelperFunctions";
import TreeNode from "../treeNode/treeNode";

type MockNode = {
  premise: string[];
  isPrimitive: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
  isBranching: boolean;
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
  const isBranching = checkIfWffIsBranchingNode(firstPremise);
  const rootNode = new TreeNode(firstPremise, isPrimitive, isBranching, 1);
  totalSteps++;
  premiseArr.shift();

  for (let i = 0; i < premiseArr.length; i++) {
    /**
     * To add the premises and the conlcusion to the tree
     */
    const premise = premiseArr[i];
    const isPrimitive = checkIfWffIsPrimtive(premise);
    if (!isPrimitive) simplifiableExpressions.push(premise);
    const isBranching = checkIfWffIsBranchingNode(premise);
    const premiseMockNode: MockNode = {
      premise: premise,
      isPrimitive: isPrimitive,
      orderNumber: totalSteps,
      originNumber: null,
      isBranching: isBranching,
    };
    rootNode.addMiddleChild(premiseMockNode, parentMap);
    totalSteps++;
  }

  do {
    const oldTotalSteps = totalSteps;
    rootNode.traverseTreeWithBFS(parentMap, totalSteps, rootNode);
    if (oldTotalSteps === totalSteps) break;
  } while (true);
  rootNode.checkForAbusdity(rootNode, parentMap);

  const isTreeValid = rootNode.checkTreeForValidity();

  return rootNode;
};

export default constructTreeProof;
