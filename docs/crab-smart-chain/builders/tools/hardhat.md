---
title: Hardhat
sidebar_position: 5
description: Learn how to configure Hardhat to add a local Darwinia development node and the Pangolin TestNet as networks for testing and deploying Solidity smart contracts.
---

# Hardhat

## Introduction

[Hardhat](https://hardhat.org/) is a popular development framework for compiling, testing, and deploying Solidity smart contracts. Since Darwinia is Ethereum compatible, with a few lines of extra configuration, you can use Hardhat as you normally would to develop on Pangolin.

## Configure Hardhat to Connect to Pangolin

To get started with Hardhat you must have an npm project. If you do not yet have one, to create one you can run:

```
npm init
```

Once you have a npm project, install Hardhat:

```
npm install hardhat
```

Then to create a Hardhat config file in your project, run:

```
npx hardhat
```

In your `hardhat.config.js` file, add network configurations for a Darwinia development node and the Pangolin TestNet:

```javascript
// Darwinia Development Node Private Key
const privateKeyDev = 'YOUR-PRIVATE-KEY-HERE';
// Pangolin Private Key
const privateKeyPangolin = "YOUR-PRIVATE-KEY-HERE";
// Crab Private Key - Note: This is for example purposes only. Never store your private keys in a JavaScript file.
const privateKeyCrab = "YOUR-PRIVATE-KEY-HERE";

module.exports = {
   networks: {
      // Darwinia Development Node
      dev: {
        url: 'http://localhost:9933/',
        chainId: 43,
        accounts: [privateKeyDev]
      },
      // Pangolin TestNet
      pangolin: {
        url: 'https://pangolin-rpc.darwinia.network',
        chainId: 43,
        accounts: [privateKeyPangolin]
      },
      // Crab
      crab: {
        url: 'https://crab-rpc.darwinia.network',
        chainId: 44,
        accounts: [privateKeyCrab]
      },
   },
};
```

## Tutorial

If you are interested in a more detailed step-by-step guide, check out our specific tutorial about using [Hardhat](../interact/hardhat/) with Pangolin.
