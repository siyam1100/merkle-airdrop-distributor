const hre = require("hardhat");

async function main() {
  const tokenAddress = "0x..."; // Your ERC20 address
  const merkleRoot = "0x..."; // Output from generate-root.js

  const Airdrop = await hre.ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy(tokenAddress, merkleRoot);

  await airdrop.waitForDeployment();

  console.log(`Airdrop Distributor deployed to: ${await airdrop.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
