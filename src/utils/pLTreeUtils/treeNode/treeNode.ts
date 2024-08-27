import {
  areStringArraysEqual,
  getOperator,
  splitArray,
} from "../../helperFunctions/deductionHelperFunctions/deductionHelperFunctions";
import removeOutermostBrackets from "../../helperFunctions/removeOutermostBrackets/removeOutermostBrackets";
import {
  checkIfWffIsBranchingNode,
  checkIfWffIsPrimtive,
  negateWff,
} from "../pLTHelperFunctions/pLTHelperFunctions";

type PremiseArray = string[];

// Mock Node is used for recursion
// so that the everytime addMiddleChild is called
// for different leaf nodes, different instances
// of a tree node should be generated
type MockNode = {
  premise: string[];
  isPrimitive: boolean;
  isBranching: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
};

type ParentMap = Map<number | string, TreeNode>;
export default class TreeNode {
  constructor(
    public data: PremiseArray,
    public primitive: boolean,
    public branchingWff: boolean,
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
    if (this.absurdity) return;
    if (this.isLeafNode()) {
      const node = new TreeNode(
        mockNode.premise,
        mockNode.isPrimitive,
        mockNode.isBranching,
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

  addLeftChild(mockNode: MockNode, parentMap: ParentMap): null | undefined {
    if (this.absurdity) return;
    if (this.isLeafNode()) {
      const node = new TreeNode(
        mockNode.premise,
        mockNode.isPrimitive,
        mockNode.isBranching,
        mockNode.orderNumber,
        mockNode.originNumber
      );
      const parentExists = parentMap.get(node.orderNumber);
      if (!parentExists) parentMap.set(node.orderNumber, this);
      this.middle = node;
      return;
    } else {
      if (this.left) {
        const parentExists = parentMap.get(this.left.orderNumber);
        if (!parentExists) parentMap.set(this.left.orderNumber, this);
        this.left.addLeftChild(mockNode, parentMap);
      }
      if (this.middle && !this.middle.isLeafNode()) {
        const parentExists = parentMap.get(this.middle.orderNumber);
        if (!parentExists) parentMap.set(this.middle.orderNumber, this);
        this.middle.addLeftChild(mockNode, parentMap);
      }
      if (this.right && !this.right.isLeafNode()) {
        const parentExists = parentMap.get(this.right.orderNumber);
        if (!parentExists) parentMap.set(this.right.orderNumber, this);
        this.right.addLeftChild(mockNode, parentMap);
      }
    }
  }

  addRightChild(mockNode: MockNode, parentMap: ParentMap): null | undefined {
    if (this.absurdity) return;
    if (this.isLeafNode()) {
      const node = new TreeNode(
        mockNode.premise,
        mockNode.isPrimitive,
        mockNode.isBranching,
        mockNode.orderNumber,
        mockNode.originNumber
      );
      const parentExists = parentMap.get(node.orderNumber);
      if (!parentExists) parentMap.set(node.orderNumber, this);
      this.middle = node;
      return;
    } else {
      if (this.right) {
        const parentExists = parentMap.get(this.right.orderNumber);
        if (!parentExists) parentMap.set(this.right.orderNumber, this);
        this.right.addRightChild(mockNode, parentMap);
      }
      if (this.middle && !this.middle.isLeafNode()) {
        const parentExists = parentMap.get(this.middle.orderNumber);
        if (!parentExists) parentMap.set(this.middle.orderNumber, this);
        this.middle.addRightChild(mockNode, parentMap);
      }
      if (this.left && !this.left.isLeafNode()) {
        const parentExists = parentMap.get(this.left.orderNumber);
        if (!parentExists) parentMap.set(this.left.orderNumber, this);
        this.left.addRightChild(mockNode, parentMap);
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

    if (this.absurdity) return;
    if (this.isLeafNode()) {
      const firstNode = new TreeNode(
        firstMockNode.premise,
        firstMockNode.isPrimitive,
        firstMockNode.isBranching,
        firstMockNode.orderNumber,
        firstMockNode.originNumber
      );
      const secondNode = new TreeNode(
        secondMockNode.premise,
        secondMockNode.isPrimitive,
        secondMockNode.isBranching,
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
    if (!node) return false;
    if (areStringArraysEqual(node.data, data)) {
      return true;
    }
    const parentNode = parentMap.get(node.orderNumber);
    if (!parentNode) return false;
    return parentNode.checkForNegationInParentPath(data, parentNode, parentMap);
  }

  closeBranch() {
    if (!this.middle && !this.left && !this.right) this.absurdity = true;
    if (this.middle) this.middle.closeBranch();
  }

  checkForAbusdity(node: TreeNode | null, parentMap: ParentMap) {
    if (node === null) {
      return;
    }

    if (node.primitive) {
      if (
        node.checkForNegationInParentPath(negateWff(node.data), node, parentMap)
      ) {
        node.closeBranch();
      }
      if (node.isLeafNode()) {
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
    const beforeIsBranching = checkIfWffIsBranchingNode(negatedBefore);
    const afterIsBranching = checkIfWffIsBranchingNode(after);

    const firstNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackBiConditional(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premise = this.data;
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "<->");

    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);
    const beforeIsBranching = checkIfWffIsBranchingNode(before);
    const afterIsBranching = checkIfWffIsBranchingNode(after);

    const negatedBefore = negateWff(before);
    const negatedAfter = negateWff(after);
    const negatedBeforeIsPrimitive = checkIfWffIsPrimtive(negatedBefore);
    const negatedAfterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);
    const negatedBeforeIsBranching = checkIfWffIsBranchingNode(negatedBefore);
    const negatedAfterIsBranching = checkIfWffIsBranchingNode(negatedAfter);

    const firstNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    const secondNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: negatedBeforeIsPrimitive,
      isBranching: negatedBeforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    totalSteps++;

    const fourthNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    totalSteps++;

    const thirdNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: negatedAfterIsPrimitive,
      isBranching: negatedAfterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addBranchedChild(firstNode, secondNode, parentMap);
    this.addLeftChild(fourthNode, parentMap);
    this.addRightChild(thirdNode, parentMap);
    totalSteps++;

    return totalSteps;
  }

  unpacknegatedBiConditional(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const negatedPremise = this.data;
    const premise = negatedPremise.slice(1);
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "<->");

    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);
    const beforeIsBranching = checkIfWffIsBranchingNode(before);
    const afterIsBranching = checkIfWffIsBranchingNode(after);

    const negatedBefore = negateWff(before);
    const negatedAfter = negateWff(after);
    const negatedBeforeIsPrimitive = checkIfWffIsPrimtive(negatedBefore);
    const negatedAfterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);
    const negatedBeforeIsBranching = checkIfWffIsBranchingNode(negatedBefore);
    const negatedAfterIsBranching = checkIfWffIsBranchingNode(negatedAfter);

    const firstNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    const secondNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: negatedBeforeIsPrimitive,
      isBranching: negatedBeforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    totalSteps++;

    const thirdNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: negatedAfterIsPrimitive,
      isBranching: negatedAfterIsBranching,
      orderNumber: totalSteps + 1,
      originNumber: this.orderNumber,
    };
    totalSteps++;

    const fourthNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps + 1,
      originNumber: this.orderNumber,
    };
    this.addBranchedChild(firstNode, secondNode, parentMap);
    this.addLeftChild(thirdNode, parentMap);
    this.addRightChild(fourthNode, parentMap);

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
    const beforeIsBranching = checkIfWffIsBranchingNode(before);
    const afterIsBranching = checkIfWffIsBranchingNode(after);

    const firstNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }
  unpackNegatedConjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const negatedPremise = this.data;
    const premise = negatedPremise.slice(1);
    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "&");
    const negatedBefore = negateWff(before);
    const negatedAfter = negateWff(after);
    const beforeIsPrimtive = checkIfWffIsPrimtive(negatedBefore);
    const afterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);
    const beforeIsBranching = checkIfWffIsBranchingNode(negatedBefore);
    const afterIsBranching = checkIfWffIsBranchingNode(negatedAfter);

    const firstNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    const secondNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addBranchedChild(firstNode, secondNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackNegatedConditional(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premiseWithNegation = this.data;
    const premise = premiseWithNegation.slice(1);

    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "->");
    const negatedAfter = negateWff(after);
    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(negatedAfter);
    const beforeIsBranching = checkIfWffIsBranchingNode(before);
    const afterIsBranching = checkIfWffIsBranchingNode(negatedAfter);

    const firstMockNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addMiddleChild(secondMockNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackConjunction(parentMap: ParentMap, totalSteps: number) {
    this.unpacked = true;

    const premise = this.data;

    const modifiedPremise = removeOutermostBrackets(premise);
    const [before, after] = splitArray(modifiedPremise, "&");
    const beforeIsPrimtive = checkIfWffIsPrimtive(before);
    const afterIsPrimitive = checkIfWffIsPrimtive(after);
    const beforeIsBranching = checkIfWffIsBranchingNode(before);
    const afterIsBranching = checkIfWffIsBranchingNode(after);
    const firstMockNode: MockNode = {
      premise: before,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: after,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
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
    const beforeIsBranching = checkIfWffIsBranchingNode(negatedBefore);
    const afterIsBranching = checkIfWffIsBranchingNode(negatedAfter);
    const firstMockNode: MockNode = {
      premise: negatedBefore,
      isPrimitive: beforeIsPrimtive,
      isBranching: beforeIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };
    this.addMiddleChild(firstMockNode, parentMap);
    totalSteps++;
    const secondMockNode: MockNode = {
      premise: negatedAfter,
      isPrimitive: afterIsPrimitive,
      isBranching: afterIsBranching,
      orderNumber: totalSteps,
      originNumber: this.orderNumber,
    };

    this.addMiddleChild(secondMockNode, parentMap);
    totalSteps++;
    return totalSteps;
  }

  unpackUnfoldThenBranch(
    parentMap: ParentMap,
    totalSteps: number,
    rootNode: TreeNode,
    firstNode?: TreeNode
  ) {
    /**
     * Loops over the middle childs
     * and unpacks all nonbranching wffs first
     * and then the branching wffs
     */

    if (this.isLeafNode() && this.primitive && !firstNode) {
      return totalSteps;
    }

    if (!firstNode) {
      const steps = this.unpackWff(parentMap, totalSteps, rootNode);
      totalSteps = steps;

      if (this.middle) {
        const steps = this.middle.unpackUnfoldThenBranch(
          parentMap,
          totalSteps,
          rootNode
        );
        totalSteps = steps;
      }
    }

    if (!this.branchingWff && !this.unpacked && firstNode) {
      const steps = this.unpackWff(parentMap, totalSteps, rootNode);
      totalSteps = steps;
    }

    if (this.middle) {
      const steps = this.middle.unpackUnfoldThenBranch(
        parentMap,
        totalSteps,
        rootNode,
        firstNode
      );
      totalSteps = steps;
    }

    if (!this.middle && firstNode) {
      const steps = firstNode.unpackUnfoldThenBranch(
        parentMap,
        totalSteps,
        rootNode
      );
      totalSteps = steps;
    }
    return totalSteps;
  }

  traverseTreeWithBFS(
    parentMap: ParentMap,
    totalSteps: number,
    rootNode: TreeNode
  ) {
    if (this.isLeafNode() && this.primitive) {
      return totalSteps;
    }
    if (!this.unpacked) {
      if (this.middle && !this.middle.unpacked) {
        const steps = this.unpackUnfoldThenBranch(
          parentMap,
          totalSteps,
          rootNode,
          this
        );
        totalSteps = steps;
      }
      if (!this.unpacked) {
        const steps = this.unpackWff(parentMap, totalSteps, rootNode);
        totalSteps = steps;
      }
    }

    if (this.middle) {
      const steps = this.middle.traverseTreeWithBFS(
        parentMap,
        totalSteps,
        rootNode
      );
      totalSteps = steps;
    }

    if (this.left) {
      const steps = this.left.traverseTreeWithBFS(
        parentMap,
        totalSteps,
        rootNode
      );
      totalSteps = steps;
    }
    if (this.right) {
      const steps = this.right.traverseTreeWithBFS(
        parentMap,
        totalSteps,
        rootNode
      );
      totalSteps = steps;
    }
    return totalSteps;
  }

  unpackWff(parentMap: ParentMap, totalSteps: number, rootNode?: TreeNode) {
    if (rootNode) rootNode.checkForAbusdity(rootNode, parentMap);
    if (this.unpacked || this.primitive) return totalSteps;

    const premise = this.data;
    const operator = getOperator(premise);
    if (operator === "~") {
      const secondaryOperator = getOperator(premise.slice(1));
      if (secondaryOperator === "<->") {
        const steps = this.unpacknegatedBiConditional(parentMap, totalSteps);
        return steps;
      }
      if (secondaryOperator === "->") {
        const steps = this.unpackNegatedConditional(parentMap, totalSteps);
        return steps;
      }
      if (secondaryOperator === "&") {
        const steps = this.unpackNegatedConjunction(parentMap, totalSteps);
        return steps;
      }
      if (secondaryOperator === "|") {
        const steps = this.unpackNegatedDisjunction(parentMap, totalSteps);
        return steps;
      }
    } else {
      if (operator === "<->") {
        const steps = this.unpackBiConditional(parentMap, totalSteps);
        totalSteps = steps;
      }

      if (operator === "->") {
        const steps = this.unpackConditional(parentMap, totalSteps);
        return steps;
      }
      if (operator === "&") {
        const steps = this.unpackConjunction(parentMap, totalSteps);
        return steps;
      }
      if (operator === "|") {
        const steps = this.unpackDisjunction(parentMap, totalSteps);
        return steps;
      }
    }
    return totalSteps;
  }
}
