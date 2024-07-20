const hre = require("hardhat");

async function main() {

    const sHelp = await hre.ethers.getContractFactory("sendHelp");
    const contract = await sHelp.deploy();
    await contract.waitForDeployment();

    console.log("Address of contract: ", contract.target);
}  

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });