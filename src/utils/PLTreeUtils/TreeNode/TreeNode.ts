import {
  areStringArraysEqual,
  getOperator,
  splitArray,
} from "../../HelperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../HelperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  checkIfWffIsPrimtive,
  negateWff,
} from "../PLTHelperFunctions/PLTHelperFunctions";

type PremiseArray = string[];
type MockNode = {
  premise: string[];
  isPrimitive: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
};

type ParentMap = Map<number | string, TreeNode>;
export default class TreeNode {
  constructor(
    public data: PremiseArray,
    public primitive: boolean,
    public orderNumber: number | string,
    public originNumber: number | string | null = null,
    public unpacked: boolean = false,
    public absurdity: boolean = false,
    public left: TreeNode | null = null,
    public right: TreeNode | null = null,
    public middle: TreeNode | null = null
  ) {}

  isLeafNode() {
    return !this.middle && !this.left && !this.right;
  }

  addMiddleChild(mockNode: MockNode, parentMap: ParentMap): null | undefined {
    if (this.isLeafNode()) {
      const node = new TreeNode(
        mockNode.premise,
        mockNode.isPrimitive,
        mockNode.orderNumber,
        mockNode.originNumber
      );
      const parentExists = parentMap.get(node.orderNumber);
      if (!parentExists) parentMap.set(node.orderNumber, this);
      this.middle = node;
      return;
    } else {
      if (this.middle) {
        const parentExists = parentMap.get(this.middle.orderNumber);
        if (!parentExists) parentMap.set(this.middle.orderNumber, this);
        this.middle.addMiddleChild(mockNode, parentMap);
      }
      if (this.right) {
        const parentExists = parentMap.get(this.right.orderNumber);
        if (!parentExists) parentMap.set(this.right.orderNumber, this);
        this.right.addMiddleChild(mockNode, parentMap);
      }
      if (this.left) {
        const parentExists = parentMap.get(this.left.orderNumber);
        if (!parentExists) parentMap.set(this.left.orderNumber, this);
        this.left.addMiddleChild(mockNode, parentMap);
      }
    }
  }

  addBranchedChild(
    firstMockNode: MockNode,
    secondMockNode: MockNode,
    parentMap: ParentMap
  ) {
    /**
     * The assignment of nodes to left and right
     * does not change the verdict of the tree proof
     */
    console.log(this);
    if (this.isLeafNode()) {
      const firstNode = new TreeNode(
        firstMockNode.premise,
        firstMockNode.isPrimitive,
        firstMockNode.orderNumber,
        firstMockNode.originNumber
      );
      const secondNode = new TreeNode(
        secondMockNode.premise,
        secondMockNode.isPrimitive,
        secondMockNode.orderNumber,
        secondMockNode.originNumber
      );

      parentMap.set(firstNode.orderNumber, this);
      parentMap.set(secondNode.orderNumber, this);
      this.left = firstNode;
      this.right = secondNode;
      return;
    }
    if (this.middle) {
      const parentExists = parentMap.get(this.middle.orderNumber);
      if (!parentExists) parentMap.set(this.middle.orderNumber, this);
      this.middle.addBranchedChild(firstMockNode, secondMockNode, parentMap);
    }
    if (this.right) {
      const parentExists = parentMap.get(this.right.orderNumber);
      if (!parentExists) parentMap.set(this.right.orderNumber, this);
      this.right.addBranchedChild(firstMockNode, secondMockNode, parentMap);
    }
    if (this.left) {
      const parentExists = parentMap.get(this.left.orderNumber);
      if (!parentExists) parentMap.set(this.left.orderNumber, this);
      this.left.addBranchedChild(firstMockNode, secondMockNode, parentMap);
    }
  }

  checkForNegationInParentPath(
    data: string[],
    node: TreeNode | null | undefined,
    parentMap: ParentMap
  ): boolean {
    /**
     * data is negated leaf node
     */
    console.log("checking for negation in parent path for : " + node?.data);
    console.log("this is the negation " + data);
    if (!node) return false;
    if (areStringArraysEqual(node.data, data)) {
      console.log("the string arrays are equal");
      return true;
    }
    const parentNode = parentMap.get(node.orderNumber);
    if (!parentNode) return false;
    return parentNode.checkForNegationInParentPath(data, parentNode, parentMap);
  }

  closeBranch() {
    console.log("closing branch");
    if (!this.middle && !this.left && !this.right) this.absurdity = true;
    if (this.middle) this.middle.closeBranch();
  }

  checkForAbusdity(node: TreeNode | null, parentMap: ParentMap) {
    console.log("checking for absurdity for node: + " + node?.data);
    if (node === null) {
      return;
    }

    if (node.primitive) {
      if (
        node.checkForNegationInParentPath(negateWff(node.data), node, parentMap)
      ) {
        console.log("it returned true");
        node.closeBranch();
      }
      if (node.isLeafNode()) {
        console.log("the node is a leaf node so returnign");
        return;
      }
    }

    if (node.absurdity) {
      return;
    }

    if (node.left) node.checkForAbusdity(node.left, parentMap);
    if (node.middle) {
      node.checkForAbusdity(node.middle, parentMap);
    }
    if (node.right) node.checkForAbusdity(node.right, parentMap);
  }

  checkTreeForValidity() {
    if (this.isLeafNode() && this.primitive) {
      if (!this.absurdity) return false;
      return true;
    }

    if (this.left) {
      const leftCheck = this.left.checkTreeForValidity();
      if (!leftCheck) return false;
    }
    if (this.middle) {
      const middleCheck = this.middle.checkTreeForValidity();
      if (!middleCheck) return false;
    }
    if (this.right) {
      const rightCheck = this.right.checkTreeForValidity();
      if (!rightCheck) return false;
    }
    return true;
  }

  unpackConditional(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premise = this.data;
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "->");
    const negatedBefore = negateWff(before);
    const beforeIsPrimtive = checkIfWffIsPrimtive(negatedBefore);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);

    const firstNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackDisjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premise = this.data;
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "|");
    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);

    const firstNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }
  unpackNegatedConjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;
    console.log("unpacking negated conjunction : " + this.data);
    console.log("total steps: " + totalSteps);

    const negatedPremise = this.data;
    const premise = negatedPremise.slice(1);
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "&");
    const negatedBefore = negateWff(before);
    const negatedAfter = negateWff(after);
    const beforeIsPrimtive = checkIfWffIsPrimtive(negatedBefore);
    const afterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);

    const firstNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackNegatedConditional(parentMap: ParentMap, totalSteps: number) {
    console.log("unpacking negated conditional : " + this.data);
    console.log("total steps: " + totalSteps);
    this.unpacked = true;

    const premiseWithNegation = this.data;
    const premise = premiseWithNegation.slice(1);

    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "->");
    const negatedAfter = negateWff(after);
    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);

    const firstMockNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addMiddleChild(secondMockNode, parentMap);
    totalSteps++;
    console.log("total steps at the end: " + totalSteps);
    return totalSteps;
  }

  unpackConjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premise = this.data;

    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "&");
    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);
    const firstMockNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addMiddleChild(secondMockNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackNegatedDisjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const negatedPremise = this.data;
    const premise = negatedPremise.slice(1);

    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "|");
    const negatedBefore = negateWff(before);
    const negatedAfter = negateWff(after);
    const beforeIsPrimtive = checkIfWffIsPrimtive(negatedBefore);
    const afterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);
    const firstMockNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addMiddleChild(secondMockNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unPackWffs(parentMap: ParentMap, totalSteps: number) {
    if (this.isLeafNode()) {
      return;
    } else if (!this.unpacked) {
      const premise = this.data;
      const operator = getOperator(premise);
      if (operator === "~") {
        const secondaryOperator = getOperator(premise.slice(1));
        if (secondaryOperator === "->") {
          const steps = this.unpackNegatedConditional(parentMap, totalSteps);
          totalSteps = steps;
        }
        if (secondaryOperator === "&") {
          const steps = this.unpackNegatedConjunction(parentMap, totalSteps);
          totalSteps = steps;
        }
        if (secondaryOperator === "|") {
          const steps = this.unpackNegatedDisjunction(parentMap, totalSteps);
          totalSteps = steps;
        }
      } else {
        if (operator === "->") {
          const steps = this.unpackConditional(parentMap, totalSteps);
          totalSteps = steps;
        }
        if (operator === "&") {
          const steps = this.unpackConjunction(parentMap, totalSteps);
          totalSteps = steps;
        }
        if (operator === "|") {
          const steps = this.unpackDisjunction(parentMap, totalSteps);
          totalSteps = steps;
        }
      }
    }
    if (this.middle) this.middle.unPackWffs(parentMap, totalSteps);
    if (this.left) this.left.unPackWffs(parentMap, totalSteps);
    if (this.right) this.right.unPackWffs(parentMap, totalSteps);
  }
}
