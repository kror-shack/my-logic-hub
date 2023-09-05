export type TreeNode = {
  data: string[];
  primitive: boolean;
  orderNumber: number | string;
  originNumber: number | string | null;
  unpacked: boolean;
  absurdity: boolean;
  left: TreeNode | null;
  right: TreeNode | null;
  middle: TreeNode | null;
};
