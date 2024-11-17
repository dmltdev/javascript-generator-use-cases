interface BinaryTree {
  value: string;
  left?: BinaryTree;
  right?: BinaryTree;
  [Symbol.iterator](): IterableIterator<string>;
  breadthFirst(): IterableIterator<string>;
}

function binaryTreeNode(value: string): BinaryTree {
  const node: BinaryTree = {
    value,
    left: undefined,
    right: undefined,
    [Symbol.iterator]: function* depthFirst(): IterableIterator<string> {
      yield this.value;
      if (this.left) yield* this.left;
      if (this.right) yield* this.right;
    },
    breadthFirst: function* (): IterableIterator<string> {
      const queue: BinaryTree[] = [this];

      while (queue.length > 0) {
        const current = queue.shift();

        if (current) {
          yield current.value;
          if (current.left) queue.push(current.left);
          if (current.right) queue.push(current.right);
        }
      }
    },
  };

  return node;
}

const tree = function () {
  const root = binaryTreeNode("root");
  root.left = binaryTreeNode("L1");
  root.right = binaryTreeNode("R1");
  root.left.left = binaryTreeNode("Leaf L1");
  root.left.right = binaryTreeNode("Leaf L2");
  root.right.left = binaryTreeNode("Leaf R1");
  root.right.right = binaryTreeNode("Leaf R2");

  return root;
};

console.table([...tree()]);
console.table([...tree().breadthFirst()]);
