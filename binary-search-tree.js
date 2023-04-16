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
}

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

const arr = [2, 3, 1, -4, 0, 1];
const cleanArr = getUnique(arr);
const root = buildTree(cleanArr, 0, arr.length - 1)
const tree = new Tree(cleanArr, root);

prettyPrint(root);
