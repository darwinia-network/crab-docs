---
title: Ethers.js
sidebar_position: 1
description: Follow this tutorial to learn how to use the Ethereum EtherJS Library to deploy Solidity smart contracts to Pangolin.
---
# Ethers.js JavaScript Library

## Introduction

The [ethers.js](https://docs.ethers.io/) library provides a set of tools to interact with Ethereum Nodes with JavaScript, similar to web3.js. Pangolin has an Ethereum-like API available that is fully compatible with Ethereum-style JSON RPC invocations. Therefore, developers can leverage this compatibility and use the ethers.js library to interact with a Pangolin node as if they were doing so on Ethereum. You can read more about ethers.js on this [blog post](https://medium.com/l4-media/announcing-ethers-js-a-web3-alternative-6f134fdd06f3).

## Setup Ethers.js with Pangolin

To get started with the ethers.js library, install it using the following command:

```
npm install ethers
```

Once done, the simplest setup to start using the library and its methods is the following:

```js
const ethers = require('ethers');

// Variables definition
const privKey = '0xPRIVKEY';

// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider('RPC_URL', {
    chainId: ChainId,
    name: 'NETWORK_NAME'
});

// Create Wallet
let wallet = new ethers.Wallet(privKey, provider);
```

Different methods are available inside `provider` and `wallet`. Depending on which network you want to connect to, you can set the `RPC_URL` to the following values:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="Pangolin Development Node"
  values={[
    {label: 'Pangolin Development Node', value: 'Pangolin Development Node'},
    {label: 'Pangolin', value: 'Pangolin'},
    {label: 'Crab', value: 'Crab'},
  ]}>
  <TabItem value="Pangolin Development Node">

```
- RPC_URL: http://localhost:9933/
- ChainId: 43
- NETWORK_NAME: development
```

  </TabItem>
  <TabItem value="Pangolin">

```
- RPC_URL: http://pangolin-rpc.darwinia.network
- ChainId: 43
- NETWORK_NAME: Pangolin
```

  </TabItem>
  <TabItem value="Crab">

```
- RPC_URL: http://crab-rpc.darwinia.network
- ChainID: 44
- NETWORK_NAME: Crab
```

  </TabItem>
</Tabs>

## Tutorials

If you are interested in a more detailed step-by-step guide, you can go to our specific tutorials on using ethers.js on Pangolin to [send a transaction](/builders/interact/eth-libraries/send-transaction/) or [deploy a contract](/builders/interact/eth-libraries/deploy-contract/).
