class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    let newNode = new Node(val);
    let currentNode = this.root;
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    while (currentNode) {
      if (val < currentNode.val) {
        currentNode.left ?
        currentNode = currentNode.left :
        currentNode.left = newNode;
      } else if (val > currentNode.val) {
        currentNode.right ?
        currentNode = currentNode.right :
        currentNode.right = newNode;
      } else {
        break;
      }
    }
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, node=this.root) {
    if (!this.root) {
      this.root = new Node(val);
      return this;
    }
    if (val < node.val) {
      if (node.left) {
        node = node.left;
        return this.insertRecursively(val, node);
      } else {
        node.left = new Node(val);
      }
    }
    if (val > node.val) {
      if (node.right) {
        node = node.right;
        return this.insertRecursively(val, node);
      } else {
        node.right = new Node(val);
      }
    }
    return this;
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
        while (currentNode) {
            if (currentNode.val === val) return currentNode;
            if (currentNode.val > val) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, node=this.root) {
    if (!node) return;
    if (node.val === val) return node;
    if (val < node.val) {
      return this.findRecursively(val, node.left);
    } else {
      return this.findRecursively(val, node.right);
    } 
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(nod=this.root) {
    let arr = []
    function traversePreOrder(node=nod) {
      arr.push(node.val);
      if (node.left) traversePreOrder(node.left);
      if (node.right) traversePreOrder(node.right);
    }
    traversePreOrder();
    return arr;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(nod=this.root) {
    let arr = []
    function traverseInOrder(node=nod) {
      if (node.left) traverseInOrder(node.left);
      arr.push(node.val);
      if (node.right) traverseInOrder(node.right);
    }
    traverseInOrder();
    return arr;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(nod=this.root) {
    let arr = []
    function traversePostOrder(node=nod) {
      if (node.left) traversePostOrder(node.left);
      if (node.right) traversePostOrder(node.right);
      arr.push(node.val);
    }
    traversePostOrder();
    return arr;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    let stack = [];
    let arr = [];
    stack.push(this.root);
    while (stack.length) {
      let currentNode = stack.shift();
      arr.push(currentNode.val);
      if (currentNode.left) stack.push(currentNode.left);
      if (currentNode.right) stack.push(currentNode.right);
    }
    return arr;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. 
   * 
   * Okay, my method works.  The unit tests seems very particular.
   * Is it because mine will be O(n) where their solution is O(1)?
   * */

  remove(val) {
    // Find node and make list of it's childrens' values
    // for re-insertion later
    const node = this.find(val);
    let vals = this.dfsInOrder(node);
    vals = vals.filter((num) => num !== val);

    // find node just before target node and set its left or right
    // pointer to null
    let currentNode = this.root;
        while (currentNode) {
            if (currentNode.left && currentNode.left.val === val) {
              currentNode.left = null;
              break
            } else if (currentNode.right && currentNode.right.val === val) {
              currentNode.right = null;
              break;
            }
            if (currentNode.val > val) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }

    // re-insert everything after the removed node
    for (let num of vals) {
      this.insert(num);
    }

    //console.log("derp");
    return node;
  }

  maxDepth(root = this.root) {
    if (root === null) return 0;
    if (root.left === null && root.right === null) return 1;
    if (root.left === null) return this.maxDepth(root.right) + 1;
    if (root.right === null) return this.maxDepth(root.left) + 1;
    return Math.max(this.maxDepth(root.left) + 1, this.maxDepth(root.right) + 1);
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const leftDepth = this.maxDepth(this.root.left);
    const rightDepth = this.maxDepth(this.root.right);

    if (Math.max(leftDepth, rightDepth) - Math.min(leftDepth, rightDepth) <= 1) return true;
    return false;
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest(root=this.root) {
    if (root === null) return;
    let highest = 0;
    let secondHighest = 0;
    function traverse(node=root) {
      if (node.val > highest) {
        secondHighest = highest;
        highest = node.val;
      } else if (node.val < highest && node.val > secondHighest) {
        secondHighest = node.val;
      }
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
    traverse();
    return secondHighest;
  }
}

module.exports = BinarySearchTree;
