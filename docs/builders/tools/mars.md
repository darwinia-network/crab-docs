---
title: Mars
sidebar_position: 8
description: Learn how to configure Mars for deploying Solidity smart contracts to either a locally running Darwinia development node or the Pangolin TestNet.
---

# Mars

## Introduction

[Mars](https://github.com/EthWorks/Mars) is a new infrastructure-as-code tool for deploying Solidity smart contracts. Mars makes writing advanced deployment scripts a breeze and handles state change for you, making sure your deployments are always up-to-date. Since Darwinia is Ethereum compatible, you can use Mars as you normally would with Ethereum to develop on Pangolin. All you have to do is change the network you wish to deploy to.

## Configure Mars to Connect to Pangolin

Assuming you already have a JavaScript or TypeScript project, install Mars:

```
npm install ethereum-mars
```

To configure Mars to deploy to a Darwinia development node or the Pangolin TestNet, within your deployment scripts add the following network configurations:

```typescript
import { deploy } from 'ethereum-mars';
const privateKey = "<insert-your-private-key-here>";
// For Darwinia development node
deploy({network: 'http://localhost:9933', privateKey},(deployer) => {
  // Deployment logic will go here
});
// For Pangolin
deploy({network: 'https://pangolin-rpc.darwinia.network', privateKey},(deployer) => {
  // Deployment logic will go here
});
```

## Tutorial

If you are interested in a more detailed step-by-step guide on how to use Mars, go to our specific tutorial about using [Waffle & Mars](/builders/interact/waffle-mars/) on Pangolin,.
