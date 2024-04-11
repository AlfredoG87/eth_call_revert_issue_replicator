const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DummyContract", () => {
  let dummyContract;

  before(async () => {
    const DummyContract = await ethers.getContractFactory("DummyContract");
    dummyContract = await DummyContract.deploy();
    await dummyContract.deployed();

    console.log("DummyContract deployed to:", dummyContract.address);
  });

  const testEventIds = [1, 2, 3, 4, 5, 6];

  it("should emit DummyIdEvent with multiple IDs", async () => {
    for (const eventId of testEventIds) {
      const tx = await dummyContract.generateDummyIdEvent(eventId);
      await expect(tx)
        .to.emit(dummyContract, "DummyIdEvent")
        .withArgs(eventId);

      console.log(`DummyIdEvent with ID ${eventId} emitted in transaction: ${tx.hash}`);
    }
  });
});