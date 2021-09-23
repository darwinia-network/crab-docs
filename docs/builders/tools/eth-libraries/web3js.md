---
title: Web3.js
sidebar_position: 2
description: Follow this tutorial to learn how to use the Ethereum Web3 JavaScript Library to deploy Solidity smart contracts to Pangolin.
---
# Web3.js JavaScript Library

![Intro diagram](/images/integrations/integrations-web3js-banner.png)

## Introduction

[Web3.js](https://web3js.readthedocs.io/) is a set of libraries that allow developers to interact with Ethereum nodes using HTTP, IPC, or WebSocket protocols with JavaScript. Pangolin has an Ethereum-like API available that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the web3.js library to interact with a Pangolin node as if they were doing so on Ethereum.

## Setup Web3.js with Pangolin

To get started with the web3.js library, we first need to install it using the following command:

```
npm install web3
```

Once done, the simplest setup to start using the library and its methods is the following:

```js
const Web3 = require('web3');

//Create web3 instance
const web3 = new Web3('RPC_URL');
```

Depending on which network you want to connect to, you can set the `RPC_URL` to the following values:

 - Pangolin development node: `http://localhost:9933/`
 - Pangolin TestNet: `http://pangolin-rpc.darwinia.network`
 - Crab: `http://crab-rpc.darwinia.network`

## Tutorials

If you are interested in a more detailed step-by-step guide, go to our specific tutorials about using web3.js on Pangolin to [send a transaction](/builders/interact/eth-libraries/send-transaction/) or [deploy a contract](/builders/interact/eth-libraries/deploy-contract/).

