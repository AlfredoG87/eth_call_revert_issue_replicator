# Sample Hardhat Project

This project deploys a dummy contract with 2 methods, `generateDummyIdEvent` and `getDummyData`.

It has a test case that deploys the contract and calls the `generateDummyIdEvent` method 6 times with Id or eventId 1 to 6.

When calling the method `getDummyData` it will return a custom struct with the following data types:
```
 struct DummyData {
        address addr1;
        address addr2;
        int256 value1;
        int256 value2;
    }
```

However if the id is equal to 2, it will revert with the following reason:

```
revert("Dummy revert for ID 2");
```

This is needed to demostrate an issue on `TheGraph` node when indexing events that revert when performing `eth_call` on the contract.

## Pre-requisites
1. Node.js
2. npm
4. graph-cli (npm install -g @graphprotocol/graph-cli)


## Installation

1. First is needed to deploy the contract and create the events. To do this, run the following command:

```bash
npm install
npx compile
npx hardhat run scripts/deploy.js --network hederatestnet
npx hardhat test --network hederatestnet
```

2. Copy the contract address, I have already deployed and run this on hedera `testnet` network and you can use the same addres and skip step number 1, the address is `0x2c988802d0411f07f196cb0bc678f12c4d086b6f` and is included on the subgraph.yaml file inside the `/dummy-contract-subgraph` folder.

4. Run locally an hedera subgraph node, to do this follow instructions on: https://github.com/hashgraph/hedera-json-rpc-relay/tree/main/tools/subgraph-example


3. Go to the `dummy-contract-subgraph` folder and run the following command:

```bash
npm install
npm run codegen
npm run build
npm run create
npm run deploy

```
4. Once the subgraph is deployed, you can see the logs on the thegraph node docker instance and will see the following error:

```
graph-node-1  | Apr 11 20:36:19.750 DEBG Trying again after eth_call RPC call for block #2755444 (02f173bfad90468f0dff1a491356361ee9d3c3b166a33b2cee01a6e74cfd1af6) failed (attempt #7) with result Err(Web3Error(Transport(Message("failed to deserialize response: data did not match any variant of untagged enum Output")))), sgd: 3, subgraph_id: QmQR1wHinnRpo9vEkA7TpyVKFAgfnQtEbHv9usKPQvK1pi, component: SubgraphInstanceManager

```