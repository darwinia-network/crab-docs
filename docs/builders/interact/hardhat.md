---
title: Using Hardhat
sidebar_position: 3
description: Use Hardhat to compile, deploy, and debug Ethereum smart contracts on Pangolin.
---

# Using Hardhat to Deploy To Pangolin

## Introduction

Hardhat is an Ethereum development environment that helps developers manage and automate the recurring tasks inherent to building smart contracts and DApps. Hardhat can directly interact with Pangolin's Ethereum API so it can also be used to deploy smart contracts into Pangolin.

This guide will cover how to use Hardhat to compile, deploy, and debug Ethereum smart contracts on the Pangolin Network.

## Checking Prerequisites

import InstallNodeJs from '/snippets/text/common/install-nodejs.md';

<InstallNodeJs name="installNodeJs"/>

As of writing of this guide, the versions used were 16.0.0 and 7.10.0, respectively.

Also, you will need the following:

 - Have MetaMask installed and [connected to Pangolin](/dvm/wallets/dvm-metamask.md)
 - Have an account with funds, which you can get from [Faucet](/builders/get-started/darwinia-pangolin/#get-tokens)

Once all requirements have been met, you are ready to build with Hardhat.

## Starting a Hardhat Project

To start a new project, create a directory for it:

```
mkdir hardhat && cd hardhat
```

Then, initialize the project by running:

```
npm init -y
```

You will notice a newly created `package.json`, which will continue to grow as you install project dependencies.

To get started with Hardhat, we will install it in our newly created project directory:

```
npm install hardhat
```

Once installed, run:

```
npx hardhat
```

This will create a Hardhat config file (`hardhat.config.js`) in our project directory.

:::note
`npx` is used to run executables installed locally in your project. Although Hardhat can be installed globally, we recommend installing locally in each project so that you can control the version on a project by project basis.
:::

After running the command, choose `Create an empty hardhat.config.js`:

![Hardhat Create Project](/images/hardhat/hardhat-images-1.png)

## The Contract File

We are going to store our contract in the `contracts` directory. Create it:

```
mkdir contracts && cd contracts
```

The smart contract that we'll deploy as an example will be called Box: it will let people store a value that can be later retrieved.

We will save this file as `contracts/Box.sol`:

```solidity
// contracts/Box.sol
pragma solidity ^0.8.1;

contract Box {
    uint256 private value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 newValue);

    // Stores a new value in the contract
    function store(uint256 newValue) public {
        value = newValue;
        emit ValueChanged(newValue);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

## Hardhat Configuration File

Let's modify our Hardhat configuration file so we can compile and deploy this contract to Pangolin.

If you have not yet done so, create a MetaMask Account, [connect to Pangolin](/dvm/wallets/dvm-metamask.md), and fund it through [Faucet](/builders/get-started/darwinia-pangolin/#get-tokens). We will use the private key of the account created to deploy the contract.

We start by requiring the [ethers plugin](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html), which brings the [ethers.js](/builders/tools/eth-libraries/etherjs/) library that allows you to interact with the blockchain in a simple way. We can install `ethers` plugin by running:

```
npm install @nomiclabs/hardhat-ethers ethers
```

Next, we import the private key that we've retrieved from MetaMask and store it in a `.json` file.

:::note
Please always manage your private keys with a designated secret manager or similar service. Never save or commit your private keys inside your repositories.
:::

Inside the `module.exports`, we need to provide the Solidity version (`0.8.1` according to our contract file), and the network details:

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
	url: 'http://localhost:9933/',
	chainId: 43,
	accounts: [privateKeyDev] // Insert your private key here
  },
```

  </TabItem>
  <TabItem value="Pangolin">

```
pangolin: {
	url: `https://pangolin-rpc.darwinia.network`,
	chainId: 43,
	accounts: [privateKeyPangolin] // Insert your private key here
  },
```

  </TabItem>
  <TabItem value="Crab">

```
crab: {
	url: `https://crab-rpc.darwinia.network`,
	chainId: 44,
	accounts: [privateKeyCrab] // Insert your private key here
  },
```

  </TabItem>
</Tabs>

The Hardhat configuration file should look like this:

```js
// ethers plugin required to interact with the contract
require('@nomiclabs/hardhat-ethers');

// private key from the pre-funded Pangolin testing account
const { privateKey } = require('./secrets.json');

module.exports = {
  // latest Solidity version
  solidity: "0.8.1",

  networks: {
    // Pangolin network specification
    pangolin: {
      url: `https://pangolin-rpc.darwinia.network`,
      chainId: 43,
      accounts: [privateKey]
    }
  }
};
```

Next, let's create a `secrets.json`, where the private key mentioned before is stored. Make sure to add the file to your project's `.gitignore`, and to never reveal your private key. The `secrets.json` file must contain a `privateKey` entry, for example:

```js
{
    "privateKey": "YOUR-PRIVATE-KEY-HERE"
}
```

Congratulations! We are ready for deployment!

## Compiling Solidity

Our contract, `Box.sol`, uses Solidity 0.8.1. Make sure the Hardhat configuration file is correctly set up with this solidity version. If so, we can compile the contract by running:

```
npx hardhat compile
```

![Hardhat Contract Compile](/images/hardhat/hardhat-images-2.png)

After compilation, an `artifacts` directory is created: it holds the bytecode and metadata of the contract, which are `.json` files. It’s a good idea to add this directory to your `.gitignore`.

## Deploying the Contract

In order to deploy the Box smart contract, we will need to write a simple deployment script. First, let's create a new directory (`scripts`). Inside the newly created directory, add a new file `deploy.js`.

```
mkdir scripts && cd scripts
touch deploy.js
```

Next, we need to write our deployment script using `ethers`. Because we'll be running it with Hardhat, we don't need to import any libraries. The script is a simplified version of that used in [this tutorial](/builders/interact/eth-libraries/deploy-contract/#deploying-the-contract).

We start by creating a local instance of the contract with the `getContractFactory()` method. Next, let's use the `deploy()` method that exists within this instance to initiate the smart contract. Lastly, we wait for its deployment by using `deployed()`. Once deployed, we can fetch the address of the contract inside the box instantiation.

```js
// scripts/deploy.js
async function main() {
   // We get the contract to deploy
   const Box = await ethers.getContractFactory('Box');
   console.log('Deploying Box...');

   // Instantiating a new Box smart contract
   const box = await Box.deploy();

   // Waiting for the deployment to resolve
   await box.deployed();
   console.log('Box deployed to:', box.address);
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });
```

Using the `run` command, we can now deploy the `Box` contract to `Pangolin`:

```
  npx hardhat run --network pangolin scripts/deploy.js
```

:::note
To deploy to a Darwinia development node, replace `pangolin` for `dev` in the `run` command.
:::

After a few seconds, the contract is deployed, and you should see the address in the terminal.

![Hardhat Contract Deploy](/images/hardhat/hardhat-images-3.png)

Congratulations, your contract is live! Save the address, as we will use it to interact with this contract instance in the next step.

## Interacting with the Contract

Let's use Hardhat to interact with our newly deployed contract in Pangolin. To do so, launch `hardhat console` by running:

```
npx hardhat console --network pangolin
```

:::note
To deploy to a Darwinia development node, replace `pangolin` for `dev` in the `console` command.
:::

Then, add the following lines of code one line at a time. First, we create a local instance of the `Box.sol`contract once again. Don't worry about the `undefined` output you will get after each line is executed:

```js
const Box = await ethers.getContractFactory('Box');
```

Next, let's connect this instance to an existing one by passing in the address we obtained when deploying the contract:

```js
const box = await Box.attach('0x05ECF77bCAA70ea8F20B601F0d2E7987A4F6e554');
```

After attaching to the contract, we are ready to interact with it. While the console is still in session, let's call the `store` method and store a simple value:

```
await box.store(5)
```

The transaction will be signed by your Pangolin account and broadcast to the network. The output should look similar to:

![Transaction output](/images/hardhat/hardhat-images-4.png)

Notice your address labeled `from`, the address of the contract, and the `data` that is being passed. Now, let's retrieve the value by running:

```
(await box.retrieve()).toNumber()
```

We should see `5` or the value you have stored initially.

Congratulations, you have completed the Hardhat tutorial! 🤯 🎉

For more information on Hardhat, hardhat plugins, and other exciting functionality, please visit [hardhat.org](https://hardhat.org/).
