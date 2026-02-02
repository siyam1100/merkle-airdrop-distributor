const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const { ethers } = require('ethers');

const recipients = [
    { address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", amount: "1000" },
    { address: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC", amount: "500" }
];

function generate() {
    const leaves = recipients.map(x => 
        keccak256(ethers.solidityPacked(["address", "uint256"], [x.address, x.amount]))
    );
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    const root = tree.getHexRoot();

    console.log("Merkle Root:", root);
    
    // Example proof for the first user
    const leaf = leaves[0];
    const proof = tree.getHexProof(leaf);
    console.log("Proof for first user:", proof);
}

generate();
