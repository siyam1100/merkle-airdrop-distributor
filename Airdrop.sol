// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Airdrop {
    address public immutable token;
    bytes32 public immutable merkleRoot;

    mapping(address => bool) public hasClaimed;

    event Claimed(address indexed account, uint256 amount);

    constructor(address _token, bytes32 _merkleRoot) {
        token = _token;
        merkleRoot = _merkleRoot;
    }

    function claim(uint256 amount, bytes32[] calldata merkleProof) external {
        require(!hasClaimed[msg.sender], "Airdrop already claimed.");

        // Verify the leaf node (address + amount)
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, amount))));
        
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid proof.");

        hasClaimed[msg.sender] = true;
        require(IERC20(token).transfer(msg.sender, amount), "Transfer failed.");

        emit Claimed(msg.sender, amount);
    }
}
