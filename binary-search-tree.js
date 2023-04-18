class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor (arr, root) {
        this.arr = arr;
        this.root = root;
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

    levelOrder(root) {
        if (root == null) return;
        const breadthFirst = [];
        const queue = [];
        queue.push(root);
        while (queue.length != 0) {
            let current = queue[0];
            breadthFirst.push(current.data);
            if (current.left != null) queue.push(current.left);
            if (current.right != null) queue.push(current.right);
            queue.shift();
        }

        return breadthFirst;

        
    }

    static minValue(root) {
        let minV = root.data;
        while (root.left != null) {
            minV = root.left.data;
            root = root.left;
        }
        return minV;
    }
}

// Create the tree
function buildTree(arr, start, end) {
    
    if (start > end) {
        return null;
    }

    const mid = parseInt((start + end) / 2);
    const node = new Node(arr[mid]);
    node.left = buildTree(arr, start, mid - 1);
    node.right = buildTree(arr, mid + 1, end);

    return node;
}

// Utility functions
function getUnique(array){
    const sorted = array.slice().sort((a,b)=>a-b)
    const uniqueArray = [];
    
    // Loop through array values
    for(i=0; i < sorted.length; i++){
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


// Testing code
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cleanArr = getUnique(arr);
const root = buildTree(cleanArr, 0, arr.length - 1)
const tree = new Tree(cleanArr, root);
tree.insert(root, 0);
tree.delete(root, 7);
// console.log(tree.find(root, 2));
console.log(tree.levelOrder(root));

// inorderRec(root);
prettyPrint(root);

