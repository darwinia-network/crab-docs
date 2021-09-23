---
title: Truffle
sidebar_position: 6
description: Learn how to configure Truffle to add a local Pangolin development node and the Pangolin TestNet as networks for testing and deploying Solidity smart contracts.
---

# Truffle

## Introduction

[Truffle](https://www.trufflesuite.com/truffle) is a popular development framework for compiling, testing, and deploying Solidity smart contracts. Since Pangolin is Ethereum compatible, with a few lines of extra configuration, you can use Truffle as you normally would with Ethereum to develop on Pangolin.

## Configure Truffle to Connect to Pangolin

If you haven't yet, you'll want to globally install Truffle:

```
npm install -g truffle
```

In your `truffle-config.js` file, add network configurations for a Pangolin development node and the Pangolin TestNet:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');
// Pangolin Development Node Private Key
const privateKeyDev = 'YOUR-PRIVATE-KEY-HERE';
// Pangolin Private Key
const privateKeyPangolin = "YOUR-PRIVATE-KEY-HERE";
// Crab Private Key - Note: This is for example purposes only. Never store your private keys in a JavaScript file.
const privateKeyCrab = "YOUR-PRIVATE-KEY-HERE";

module.exports = {
   networks: {
      // Pangolin Development Node
      dev: {
        provider: () => {
          return new HDWalletProvider(privateKeyDev, 'http://localhost:9933/')
         },
        network_id: 43,
      },
      // Pangolin TestNet
      pangolin: {
        provider: () => {
          return new HDWalletProvider(
            privateKeyPangolin,
            'http://pangolin-rpc.darwinia.network'
          );
        },
        network_id: 43,
      },
      // Crab
      crab: {
        provider: () => {
          return new HDWalletProvider(
            privateKeyCrab,
            'http://crab-rpc.darwinia.network'
          );
        },
        network_id: 44,
      }
   },
};
```


## Tutorial

If you are interested in a more detailed step-by-step guide, go to our specific tutorial about [using Truffle](/builders/interact/truffle/) with Pangolin.
