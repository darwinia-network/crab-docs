---
title: Events Subscription
sidebar_position: 11
description: Use Ethereum-like publish-subscribe functionality to subscribe to specific events on Darwinia's Ethereum-compatible chain.
---

# Subscribe to Events in Pangolin

## Introduction
The ability to subscribe to Ethereum-style events was supported by Pangolin. In this guide, we will outline the subscription types available and current limitations.

## Checking Prerequisites
The examples in this guide are based on a MacOS environment. You will also need the following:

 - Have MetaMask installed and [connected to Pangolin](../../wallets/dvm-metamask.md)
 - Have an account with funds. You can get this from [Faucet](../../get-started/darwinia-pangolin.mdx)
 - Deploy your own ERC-20 token on Pangolin. You can do following [our Remix tutorial](../interact/remix/), while first pointing MetaMask to Pangolin

import InstallNodeJs from '/snippets/text/common/install-nodejs.md';

<InstallNodeJs name="installNodeJs"/>

As of writing of this guide, the versions used were 16.0.0 and 7.10.0, respectively. We will also need to install the Web3 package by executing:

```
npm install --save web3
```

To verify the installed version of Web3, you can use the `ls` command:

```
npm ls web3
```

As of writing this guide, the version used was 1.3.0.

## Subscribing to Event Logs in Pangolin
Any contract that follows the ERC-20 token standard emits an event related to a transfer of tokens, that is, `event Transfer(address indexed from, address indexed to, uint256 value)`. For this example, we will subscribe to the logs of such events. Using the web3.js library, we need the following piece of code:

```js
const Web3 = require('web3');
const web3 = new Web3('wss://pangolin-rpc.darwinia.network');

web3.eth.subscribe('logs', {
    address: 'ContractAddress',
    topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
}, (error, result) => {
    if (error)
        console.error(error);
})
    .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
    })
    .on("data", function (log) {
        console.log(log);
    });
```

Note that we are connecting to the WebSocket endpoint of Pangolin. We use the `web3.eth.subscribe(‘logs’,  options [, callback])` method to subscribe to the logs, filtered by the given options. In our case, the options are the contract’s address where the events are emitted from and the topics used to describe the event. More information about topics can be found in [this Medium post](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378). If no topics are included, you subscribe to all events emitted by the contract. In order to only filter the Transfer event, we need to include the signature of the event, calculated as:

```js
EventSignature = keccak256(Transfer(address,address,uint256))
```

The result of the calculation is shown in the previous code snippet. We’ll return to filtering by topics later on. The rest of the code handles the callback function. Once we execute this code, we’ll get a subscription ID, and the terminal will wait for any event through that subscription:

```
$ event node contracts-events.js
0x4d4c476b6759683667557170434f6276
```

Next, an ERC-20 token transfer will be sent with the following parameters:

 - From address: 0xA4ADf2A419Fe24e7f6527F76AfBA5674BF9252f3
 - To address: 0xF712eEa0FC84D94b7f0ACc14bB3F248BdB454cF9
 - Value (tokens): 1000000000000000000 - that is 1 with 18 zeros

Once we send the transaction, the log of the event emitted by the transaction will appear in the terminal:
```
$ event node contracts-events.js
0x4d4c476b6759683667557170434f6276
{
  address: '0x0883474d63bBC730c34Cccb5269a1c0f1a7F1310',
  blockHash: '0xc966b7495399dfaf499827de46fa4b9733d22edfee8008246898656e377111da',
  blockNumber: 687284,
  data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
  logIndex: 0,
  removed: false,
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000a4adf2a419fe24e7f6527f76afba5674bf9252f3',
    '0x000000000000000000000000f712eea0fc84d94b7f0acc14bb3f248bdb454cf9'
  ],
  transactionHash: '0x2cde426491b264b366eaa6cc850672ebf1fac0996a80f8e035cba73c5edf3db0',
  transactionIndex: 0,
  transactionLogIndex: '0x0',
  id: 'log_e350b838'
}
```


Let's break down the response received. Our target event sends two pieces of indexed information: the `from` and `to` addresses (in that order), which are treated like topics. The other piece of data shared by our event is the number of tokens, which is not indexed. Therefore, there is a total of three topics (the maximum is four), which correspond to the opcode LOG3:


Consequently, you can see that the `from` and `to` addresses are contained inside the topics returned by the logs. Ethereum addresses are 40 hex characters long (1 hex character is 4 bits, hence 160 bits or H160 format). Thus, the extra 24 zeros are needed to fill the gap to H256, which is 64 hex characters long.

Unindexed data is returned in the `data` field of the logs, but this is encoded in bytes32/hex. To decode it we can use, for example, this [online tool](https://web3-type-converter.onbrn.com/), and verify that the `data` is in fact 1 (plus 18 zeros).

If the event returns multiple unindexed values, they will be appended one after the other in the same order the event emits them. Therefore, each value is then obtained by deconstructing data into separate 32 bytes (or 64 hex character long) pieces.

### Using Wildcards and Conditional Formatting
Using the same example as in the previous section, lets subscribe to the events of the token contract with the following code:

```js
const Web3 = require('web3');
const web3 = new Web3('wss://pangolin-rpc.darwinia.network');

web3.eth
   .subscribe(
      'logs',
      {
         address: 'ContractAddress',
         topics: [
            null,
            [
               '0x000000000000000000000000a4adf2a419fe24e7f6527f76afba5674bf9252f3',,
               '0x000000000000000000000000f712eea0fc84d94b7f0acc14bb3f248bdb454cf9',
            ],
         ],
      },
      (error, result) => {
         if (error) console.error(error);
      }
   )
   .on('connected', function (subscriptionId) {
      console.log(subscriptionId);
   })
   .on('data', function (log) {
      console.log(log);
   });
```

Here, by using the wildcard null in place for the event signature, we filter to listen to all events emitted by the contract that we subscribed to. But with this configuration, we can also use a second input field (`topic_1`) to define a filter by address as mentioned before. In the case of our subscription, we are notifying that we want to only receive events where `topic_1` is one of the addresses we are providing. Note that the addresses need to be in H256 format. For example, the address `0xA4ADf2A419Fe24e7f6527F76AfBA5674BF9252f3` needs to be entered as `0x000000000000000000000000a4adf2a419fe24e7f6527f76afba5674bf9252f3`. As before, the output of this subscription will display the event signature in `topic_0` to tell us which event was emitted by the contract.

```
$ event node contracts-events.js
{
  address: '0x0883474d63bBC730c34Cccb5269a1c0f1a7F1310',
  blockHash: '0x4d38a4253cf565a969612a19274c7b4acce3d8e8dbf445187a0c4e9ed9fd9510',
  blockNumber: 687689,
  data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
  logIndex: 0,
  removed: false,
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000a4adf2a419fe24e7f6527f76afba5674bf9252f3',
    '0x000000000000000000000000f712eea0fc84d94b7f0acc14bb3f248bdb454cf9'
  ],
  transactionHash: '0xe179e187a7e60a96801ab39dd215807ab61066136cd4c8c0ff2a9a91ba208dd2',
  transactionIndex: 0,
  transactionLogIndex: '0x0',
  id: 'log_c985230f'
}
{
  address: '0x0883474d63bBC730c34Cccb5269a1c0f1a7F1310',
  blockHash: '0xc966b7495399dfaf499827de46fa4b9733d22edfee8008246898656e377111da',
  blockNumber: 687284,
  data: '0x0000000000000000000000000000000000000000000000000de0b6b3a7640000',
  logIndex: 0,
  removed: false,
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
    '0x000000000000000000000000a4adf2a419fe24e7f6527f76afba5674bf9252f3',
    '0x000000000000000000000000f712eea0fc84d94b7f0acc14bb3f248bdb454cf9'
  ],
  transactionHash: '0x2cde426491b264b366eaa6cc850672ebf1fac0996a80f8e035cba73c5edf3db0',
  transactionIndex: 0,
  transactionLogIndex: '0x0',
  id: 'log_e350b838'
}
```

As shown, after we provided the two addresses with conditional formatting, we received two logs with the same subscription ID. Events emitted by transactions from different addresses will not throw any logs to this subscription.

This example showed how we could subscribe to just the event logs of a specific contract, but the web3.js library provides other subscription types that we’ll go over in the following sections.

## Subscribe to Incoming Pending Transactions
In order to subscribe to pending transactions, we can use the `web3.eth.subscribe('pendingTransactions', [, callback])` method, implementing the same callback function to check for the response. This is much simpler than our previous example, and it returns the transaction hash of the pending transactions.

```
$ event node pending-tx.js
0x4a767a6c61566e63587077346f665a71
0x1dcc68d6e6b66e885c765f4733909d642ba53ad6354d62d8823145184645fcad
0x9bdc01fef632bbd4ef48d47751d3d255e8dc7f90fe530db70d32ea755af16a9c
```


We can verify that this transaction hash is the same as that shown in MetaMask (or Remix).

## Subscribe to Incoming Block Headers
Another type available under the Web3.js library is to subscribe to new block headers. To do so, we use the `web3.eth.subscribe('newBlockHeaders' [, callback])` method, implementing the same callback function to check for the response. This subscription provides incoming block headers and can be used to track changes in the blockchain.

```
$ event node block-headers.js
0x47586b513475396a74543274414b725a
{
  author: '0x07c0a51e0d88ede9d531f165e370013b648e6b62',
  difficulty: '0',
  extraData: '0x',
  gasLimit: 4294967295,
  gasUsed: 0,
  hash: '0x49a51bc4d07f4715c124ecb3bb0ab3e0afdddc22b2048d45dd2e679931f8f223',
  logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  miner: '0x07C0A51e0D88Ede9D531f165E370013b648e6b62',
  number: 687807,
  parentHash: '0xdc7c74b5ef125737f5f68fa1ef6e51874efbb9811f13f43f14086bfd6ecbd804',
  receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
  sealFields: [
    '0x0000000000000000000000000000000000000000000000000000000000000000',
    '0x0000000000000000'
  ],
  sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
  size: 514,
  stateRoot: '0xbb7843482f08c6010df7eb7e9e55b445a6d5c5ea451e1ba3b8873bd6518326f9',
  timestamp: 1632924588000,
  transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'
}
```

Note that only one block header is shown in the image. These messages are displayed for every block produced so they can fill up the terminal quite fast.

## Check if a Node is Synchronized with the Network
With pub/sub it is also possible to check whether a particular node you are subscribed to is currently synchronized with the network. For that, we can leverage the `web3.eth.subscribe('syncing' [, callback])` method, implementing the same callback function to check for the response. This subscription will return an object when the node is synced with the network.


## Current Limitations
The pub/sub implementation in [Frontier](https://github.com/paritytech/frontier) is still in active development. This first version allows DApp developers (or users in general) to subscribe to specific event types, but there are still some limitations. You may have noticed from previous examples that some of the fields are not showing proper information with the current version released, and that is because certain properties are yet to be supported by Frontier.

