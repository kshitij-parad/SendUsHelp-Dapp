// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.



/*

This file is only for hardhat

*/


const hre = require("hardhat");


async function getBalance(address) {
  const balanceBigInt = await hre.ethers.provider.getBalance(address);
  return hre.ethers.formatEther(balanceBigInt);
}

async function consoleBalances(addresses) {
  let counter = 0;

  for (const address of addresses) {
    console.log(`Address ${counter}: ` + await getBalance(address));
    counter++;
  }
}

async function consoleMemo(memos) {
  for (let memo of memos) {
    let timestamp = memo.timestamp;
    let name = memo.name;
    let msg = memo.message;
    let from = memo.from;

    console.log(`at ${timestamp} from ${from}, ${name} said ${msg}`);
  }
}
async function main() {
  const [owner, from1, from2, from3] = await hre.ethers.getSigners();
  const sHelp = await hre.ethers.getContractFactory("sendHelp");

  const contract = await sHelp.deploy();
  await contract.waitForDeployment();

  // const re = await contract.waitForDeployment();

  // console.log("Address of contract: ", contract.address); 


  console.log("Address of contract: ", contract.target); //because of waitForDeploument()
  const addresses = [owner.address, from1.address, from2.address, from3.address];

  console.log("Before sending help....");
  await consoleBalances(addresses);


  const amount = { value: hre.ethers.parseEther("2") };
  await contract.connect(from1).sendHelpp("from1", "nice work", amount);
  await contract.connect(from2).sendHelpp("from2", "nice working", amount);
  await contract.connect(from3).sendHelpp("from3", "nice workinf good", amount);

  console.log("after sending help....");
  await consoleBalances(addresses);


  const memos = await contract.getMemo();
  consoleMemo(memos);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
