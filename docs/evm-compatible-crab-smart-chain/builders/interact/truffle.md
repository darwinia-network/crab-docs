---
title: Using Truffle
sidebar_position: 4
description: Darwinia makes it incredibly easy to deploy a Solidity-based smart contract to a Darwinia node using Truffle. Learn how in this tutorial.
---

# Using Truffle to Deploy to Darwinia

## Introduction

This guide walks through the process of deploying a Solidity-based smart contract to a Darwinia node using [Truffle](https://www.trufflesuite.com/), a commonly used development tool for smart contracts on Ethereum. Given Darwinia’s Ethereum compatibility features, Truffle can be used directly with a Darwinia node.

:::note
This tutorial was created using the v2.6.4 tag which is based on the v2.6.4 release of [Darwinia-Common](https://github.com/darwinia-network/darwinia-common/releases/tag/v2.6.4). The Darwinia platform and the [Frontier](https://github.com/paritytech/frontier) components it relies on for Substrate-based Ethereum compatibility are still under very active development.

The examples in this guide assumes you have a MacOS or Ubuntu 18.04-based environment and will need to be adapted accordingly for Windows.
:::

For this guide, you will need to have a Darwinia development node running in `--dev` mode. This can be done by either following the steps detailed [here](/builders/get-started/darwinia-dev/).

## Checking Prerequisites

import InstallNodeJs from '/snippets/text/common/install-nodejs.md';

<InstallNodeJs name="installNodeJs"/>

As of writing of this guide, the versions used were 16.0.0 and 7.10.0, respectively.

Also, you will need the following:

 - Have MetaMask installed and [connected to Darwinia](../../wallets/dvm-metamask.md)
 - Have an account with funds, which you can get from [Faucet](/builders/get-started/darwinia-pangolin/#get-tokens)

Once all requirements have been met, you are ready to build with truffle.

## Starting a Truffle Project

To get started with the Truffle box, if you have Truffle installed globally, you can execute:

```
mkdir metacoin-box && cd metacoin-box
truffle unbox metacoin
```

![Unbox Truffle box](../../../assets/evm-compatible-crab-smart-chain/builders/interact/truffle.png)

Nevertheless, the box also has Truffle as a dependency in case you do not want to have it installed globally. In such a case, you can directly clone the following repository:

```
git clone https://github.com/truffle-box/metacoin-box.git
cd metacoin-box
``` 

:::note
To create a bare Truffle project with no smart contracts included, use `truffle init`.
:::

Once this operation is completed, you'll now have a project structure with the following items:

- `contracts/`: Directory for Solidity contracts
- `migrations/`: Directory for scriptable deployment files
- `test/`: Directory for test files for testing your application and contracts
- `truffle-config.js`: Truffle configuration file

### The Truffle Configuration File

Navigate inside the directory to take a look at the `truffle-config.js` file (for the purpose of this guide, some information was removed):

```js
const HDWalletProvider = require('@truffle/hdwallet-provider');
// Darwinia Development Node Private Key
const privateKeyDev ='YOUR-PRIVATE-KEY-HERE';
//...
module.exports = {
  networks: {
    dev: {
         provider: () => {
            return new HDWalletProvider(privateKeyDev, 'http://localhost:9933/')
         },
         network_id: 43,
    }
  },
  compilers: {
    solc: {
      version: "^0.6.7"
    }
  }
};
```

After write config file, we need to install `@truffle/hdwallet-provider` package.
```
npm i @truffle/hdwallet-provider
```

Note that we are using `HD-Wallet-Provider` from Truffle as the Hierarchical Deterministic wallet. Also, we've defined a `dev` network that points to the development node provider URL, and the private key of the development account, which holds all funds in the development node, is included.

For deployments to the Pangolin TestNet or Crab, you need to provide the private key of an address that holds funds. For Pangolin, you can create an account in MetaMask, fund it using the [TestNet faucet](/builders/get-started/darwinia-pangolin/#get-tokens), and export its private key.

Below you can find network configurations for all of our networks:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="Darwinia Development Node"
  values={[
    {label: 'Darwinia Development Node', value: 'Darwinia Development Node'},
    {label: 'Pangolin', value: 'Pangolin'},
    {label: 'Crab', value: 'Crab'},
  ]}>
  <TabItem value="Darwinia Development Node">

```
dev: {
  provider: () => {
	 ...
	 return new HDWalletProvider(privateKeyDev, 'http://localhost:9933/') // Insert your private key here
  },
  network_id: 43,
},
```

  </TabItem>
  <TabItem value="Pangolin">

```
pangolin: {
  provider: () => {
	 ...
	 return new HDWalletProvider(privateKeyPangolin, 'https://pangolin-rpc.darwinia.network') // Insert your private key here
  },
  network_id: 43,
},
```

  </TabItem>
  <TabItem value="Crab">

```
crab: {
  provider: () => {
	 ...
	 return new HDWalletProvider(privateKeyCrab, 'https://crab-rpc.darwinia.network') // Insert your private key here
  },
  network_id: 44,
},
```

  </TabItem>
</Tabs>

## The Contract File

There is also a MetaCoin contract included with the Truffle box:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.7.0;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() public {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

If we take a look at the Truffle contract migration script under `migrations/2_deploy_contracts.js`, it contains the following:

```javascript
const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
```

## Deploying a Contract to Darwinia Using Truffle

Before we can deploy our contracts, we must compile them. (We say "contracts" because normal Truffle deployments include the `Migrations.sol` contract.) You can do this with the following command:

```
truffle compile
```

If successful, you should see output like the following:

```
$ metacoin-box truffle compile

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
✔ Downloading compiler. Attempt #1.
> Compiling ./contracts/ConvertLib.sol
> Compiling ./contracts/MetaCoin.sol
> Compiling ./contracts/Migrations.sol
✔ Fetching solc version list from solc-bin. Attempt #1
> Artifacts written to /Users/echo/workspace/draft/code/metacoin-box/build/contracts
> Compiled successfully using:
   - solc: 0.6.12+commit.27d51765.Emscripten.clang
```

Now we are ready to deploy the compiled contracts. You can do this with the following command:

<Tabs
  defaultValue="Darwinia Development Node"
  values={[
    {label: 'Darwinia Development Node', value: 'Darwinia Development Node'},
    {label: 'Pangolin', value: 'Pangolin'},
    {label: 'Crab', value: 'Crab'},
  ]}>
  <TabItem value="Darwinia Development Node">

```
truffle migrate --network dev
```

  </TabItem>
  <TabItem value="Pangolin">

```
truffle migrate --network pangolin
```

  </TabItem>
  <TabItem value="Crab">

```
truffle migrate --network Crab
```

  </TabItem>
</Tabs>

If successful, you will see deployment actions, including the address of the deployed contract:

```
$ metacoin-box truffle migrate --network pangolin

Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.



Starting migrations...
======================
> Network name:    'pangolin'
> Network id:      43
> Block gas limit: 4294967295 (0xffffffff)


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x1cf510a03023bd4842ed2fa6e901bad99445ca3caea952451350bc66b7fb3b5b
   > Blocks: 2            Seconds: 13
   > contract address:    0xe5C85b572c57F20e6FCA59b7b6B4D0d56B10f87c
   > block number:        686236
   > block timestamp:     1632915054
   > account:             0xA4ADf2A419Fe24e7f6527F76AfBA5674BF9252f3
   > balance:             93.900544511883035776
   > gas used:            159195 (0x26ddb)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0031839 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0031839 ETH


2_deploy_contracts.js
=====================

   Deploying 'ConvertLib'
   ----------------------
   > transaction hash:    0xa782ad8ee3cd9fd572adbb5ea3971f8f862959cb7826ea3b67c8df182e2a2cb9
   > Blocks: 4            Seconds: 27
   > contract address:    0x59Ef69D2Dc9b55461bF0BBCAA32b351d669A54b8
   > block number:        686244
   > block timestamp:     1632915102
   > account:             0xA4ADf2A419Fe24e7f6527F76AfBA5674BF9252f3
   > balance:             93.897784031883035776
   > gas used:            95686 (0x175c6)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00191372 ETH


   Linking
   -------
   * Contract: MetaCoin <--> Library: ConvertLib (at address: 0x59Ef69D2Dc9b55461bF0BBCAA32b351d669A54b8)

   Deploying 'MetaCoin'
   --------------------
   > transaction hash:    0x245f3136b9044ef34541753fdf08cd2679ddde63ea93c5c4c37d72382bca727c
   > Blocks: 4            Seconds: 21
   > contract address:    0xD05FDEC15D2eEA9E13d07817b3C85bf1b500EB58
   > block number:        686252
   > block timestamp:     1632915150
   > account:             0xA4ADf2A419Fe24e7f6527F76AfBA5674BF9252f3
   > balance:             93.892056811883035776
   > gas used:            286361 (0x45e99)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00572722 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00764094 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.01082484 ETH
```

