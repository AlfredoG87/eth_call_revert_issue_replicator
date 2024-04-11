require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    yourNetworkName: {
      url: process.env.NETWORK_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};