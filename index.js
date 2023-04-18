import { Tree, getUnique, prettyPrint } from "./binary-search-tree.js";

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const arr = [];
for (let i = 0; i < 15; i++) {
    arr.push(generateRandomNumber(0, 100));
}

const sortedArr = getUnique(arr);

const tree = new Tree(sortedArr);

console.log('Binary Tree');
prettyPrint(tree.root);

console.log('Is Balance?', tree.isBalanced());

console.log('Preorder: ', tree.preorder(tree.root));
console.log('Postorder: ', tree.postorder(tree.root));
console.log('Inorder: ', tree.inorder(tree.root));

for (let i = 0; i < 20; i++) {
    tree.insert(tree.root, generateRandomNumber(-200, 200));
}

prettyPrint(tree.root);
console.log('Is Balance?', tree.isBalanced());

console.log('Balance new tree');
tree.rebalance();
prettyPrint(tree.root);
console.log('Is Balance?', tree.isBalanced());

console.log('Preorder: ', tree.preorder(tree.root));
console.log('Postorder: ', tree.postorder(tree.root));
console.log('Inorder: ', tree.inorder(tree.root));