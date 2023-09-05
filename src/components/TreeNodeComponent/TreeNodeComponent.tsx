import { transformSymbolsForDisplay } from "../../utils/HelperFunctions/tranfromSymbols/transformSymbols";
import TreeNode from "../../utils/PLTreeUtils/TreeNode/TreeNode";
import QLTreeNode from "../../utils/QLTreeUtils/QLTreeNode/QLTreeNode";
import "./TreeNodeComponent.scss";

type Props = {
  node: TreeNode | QLTreeNode;
  inheritedClassName?: string;
};

/**
 * Renders a trenary tree as semantic tableaux
 *
 * This component uses recursion to render a symbolic logic semantic tableaux.
 *
 * @param Props.node - The node to be printed
 * @param Props.inheritedClassName = "middle" - The classname for the node to be printed to align it with the tree.
 * @returns - A JSX element of the semantic tableaux.
 */

const TreeNodeComponent = ({ node, inheritedClassName = "middle" }: Props) => {
  return (
    <div className="Tree-node">
      <div>
        <div
          className={
            inheritedClassName
              ? `node-data  ${inheritedClassName}`
              : "node data"
          }
        >
          <p className="number">{node.orderNumber})</p>
          <p>{transformSymbolsForDisplay(node.data.join(" "))}</p>
          <p className="number">{node.originNumber}</p>
        </div>
        {node.absurdity && <p className="absurdity">X</p>}
      </div>
      <div className="branches">
        {node.left && (
          <div className="left-node node">
            <div className="left-branch"></div>
            <TreeNodeComponent
              node={node.left}
              inheritedClassName="left-align"
            />
          </div>
        )}
        {node.middle && (
          <div className="middle-node node">
            <TreeNodeComponent node={node.middle} />
          </div>
        )}
        {node.right && (
          <div className="right-node node">
            <div className="right-branch"></div>
            <TreeNodeComponent
              node={node.right}
              inheritedClassName="right-align"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TreeNodeComponent;
