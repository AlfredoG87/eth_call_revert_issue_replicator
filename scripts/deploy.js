const hre = require("hardhat");

async function main() {
  const DummyContract = await hre.ethers.getContractFactory("DummyContract");
  const dummyContract = await DummyContract.deploy();

  await dummyContract.deployed();

  console.log("DummyContract deployed to:", dummyContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });