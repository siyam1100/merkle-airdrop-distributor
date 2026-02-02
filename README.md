# Merkle Airdrop Distributor

This repository provides an expert implementation of a gas-efficient token airdrop. Instead of sending tokens to each user individually, the contract stores a single 32-byte Merkle Root. Users provide a cryptographic proof to claim their specific allocation.

### Core Mechanics
* **Gas Efficiency:** The deployer pays a one-time fee to set the root; users pay a small fee to claim.
* **Security:** Prevents double-claiming and ensures only addresses in the original snapshot can withdraw.
* **Scalability:** Supports an unlimited number of recipients without increasing contract storage costs.
* **Flat Structure:** All necessary components (Contract, Proof Generator, Deployment) are in the root directory.

### How to Use
1. Prepare your recipient list in `whitelist.json`.
2. Run `generate-root.js` to get your Merkle Root.
3. Deploy the contract using `deploy.js` with the generated root.
4. Users claim tokens by providing their proof generated in the frontend.
