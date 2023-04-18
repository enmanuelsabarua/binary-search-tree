class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    static inorder = [];
    static preorder = [];
    static postorder = [];

    constructor (arr) {
        this.arr = arr;
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }

    buildTree(arr, start, end) {
    
        if (start > end) {
            return null;
        }
    
        const mid = parseInt((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.buildTree(arr, start, mid - 1);
        node.right = this.buildTree(arr, mid + 1, end);
    
        return node;
    }

    insert(root, data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }

        if (data < root.data) {
            root.left = this.insert(root.left, data);
        } else if (data > root.data) {
            root.right = this.insert(root.right, data);
        }

        return root;
    }

    delete(root, data) {
        if (root == null) {
            return root;
        }

        if (data < root.data) {
            root.left = this.delete(root.left, data);
        } else if (data > root.data) {
            root.right = this.delete(root.right, data)
        } else {

            if (root.left == null) {
                return root.right;
            } else if (root.right == null) {
                return root.left;
            }

            root.data = Tree.minValue(root.right);

            root.right = this.delete(root.right, root.data);

        }

        return root;
    }

    find(root, value) {
        if (root == null || root.data == value) {
            return root;
        } 

        if (root.data < value) {
            return this.find(root.right, value);
        }
        
        return this.find(root.left, value);
        
    }

    levelOrder(callback) {
        if (this.root == null) return;
        const breadthFirst = [];
        const queue = [];
        queue.push(this.root);
        while (queue.length != 0) {
            let current = queue[0];
            breadthFirst.push(current.data);
            callback(current.data);
            if (current.left != null) queue.push(current.left);
            if (current.right != null) queue.push(current.right);
            queue.shift();
        }

        return breadthFirst;

        
    }

    inorder(root, callback) {
        if (root != null) {
            this.inorder(root.left, callback);
            if (callback) callback(root.data);
            Tree.inorder.push(root.data);
            this.inorder(root.right, callback);
        }

        return Tree.inorder;

    }

    preorder(root, callback) {
        if (root != null) {
            if (callback) callback(root.data);
            Tree.preorder.push(root.data);
            this.preorder(root.left, callback);
            this.preorder(root.right, callback);
        }

        return Tree.preorder;
    }

    postorder(root, callback) {
        if (root != null) {
            this.postorder(root.left, callback);
            this.postorder(root.right, callback);
            if (callback) callback(root.data);
            Tree.postorder.push(root.data);
        }

        return Tree.postorder;
    }

    height(node) {
        if (node == null) {
            return 0;
        } else {

            let lDepth = this.height(node.left);
            let rDepth = this.height(node.right);

            if (lDepth > rDepth) {
                return (lDepth + 1);
            } else {
                return (rDepth + 1);
            }
        }
    }

    depth(root, data) {
        if (root ==  null) {
            return -1;
        }

        let dist = -1;

        if ((root.data == data) || (dist = this.depth(root.left, data)) >= 0 || (dist = this.depth(root.right, data)) >= 0) {
            return dist + 1;
        }

        return dist;
    }

    isBalanced() {
        if (this.height(this.root.left) - this.height(this.root.right) <= 1) {
            return true;
        }

        return false;
    }

    rebalance() {
        const newTree = this.inorder(this.root, (node) => {
            // console.log(node);
        });

        const sortedTree = Tree.getUnique(newTree);

        this.root = this.buildTree(sortedTree, 0, sortedTree.length - 1);
    }

    static minValue(root) {
        let minV = root.data;
        while (root.left != null) {
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    }

    static getUnique(array){
        const sorted = array.slice().sort((a,b)=>a-b)
        const uniqueArray = [];
        
        // Loop through array values
        for(let i = 0; i < sorted.length; i++){
            if(uniqueArray.indexOf(sorted[i]) === -1) {
                uniqueArray.push(sorted[i]);
            }
        }
        return uniqueArray;
    }
}

// // Utility functions
function getUnique(array){
    const sorted = array.slice().sort((a,b)=>a-b)
    const uniqueArray = [];
    
    // Loop through array values
    for(let i = 0; i < sorted.length; i++){
        if(uniqueArray.indexOf(sorted[i]) === -1) {
            uniqueArray.push(sorted[i]);
        }
    }
    return uniqueArray;
}

// Print the tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
       return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}


// // Testing code
// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// const cleanArr = getUnique(arr);
// // const root = buildTree(cleanArr, 0, arr.length - 1)
// const tree = new Tree(cleanArr);
// tree.insert(tree.root, 0);
// tree.insert(tree.root, -1);
// tree.delete(tree.root, 7);
// // console.log(tree.find(tree.root, 2));
// tree.levelOrder(node => {
//     // console.log(node);
// });
// const inorder = tree.inorder(tree.root, (node) => {
//     // console.log(node);
// });
// const preorder = tree.preorder(tree.root, (node) => {
//     // console.log(node);
// });
// const postorder = tree.postorder(tree.root, (node) => {
//     // console.log(node);
// });

// // console.log(tree.height(root));
// // console.log(tree.depth(tree.root, 1));
// // console.log(tree.isBalanced());
// tree.rebalance();

// // inorderRec(root);
// // prettyPrint(tree.root);

export { Tree, getUnique, prettyPrint }