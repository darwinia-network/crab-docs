---
title: Deploy a Contract
sidebar_position: 2
description: Learn how to deploy unmodified and unchanged Solidity-based smart contracts to a Darwinia node with a simple script using Web3.js, Ethers.js, or Web3.py.
---

# Using Ethereum Libraries to Deploy To Pangolin

## Introduction

This guide walks through using the Solidity compiler and three different Ethereum libraries to deploy a contract to Pangolin manually. The three libraries covered by this tutorial are:

 - [Web3.js](/builders/tools/eth-libraries/web3js)
 - [Ethers.js](/builders/tools/eth-libraries/etherjs)
 - [Web3.py](/builders/tools/eth-libraries/web3py)

:::note
If you would like to find the simplest way to get started, check out the quick start guide for each library by clicking the links above
:::

Besides, two other libraries will be used to compile the smart contract:

 - [Solc-js](https://www.npmjs.com/package/solc) to compile Solidity smart contracts using JavaScript
 - [Py-solc-x](https://pypi.org/project/py-solc-x/) to compile Solidity smart contracts using Python

## Checking Prerequisites

The examples using both web3.js and ethers.js need you to install Node.js and NPM previously. For the web3.py, you need Python and PIP. As of the writing of this guide, the versions used were:

 - Node.js v16.0.0
 - NPM v7.10.0
 - Python v3.6.9 (web3 requires Python >= 3.5.3 and < 4)
 - PIP3 v9.0.1

:::note
The examples in this guide assumes you have a MacOS or Ubuntu 18.04-based environment and will need to be adapted accordingly for Windows.
:::

Next, create a directory to store all of the relevant files:

```
mkdir incrementer && cd incrementer/
```

For the JavaScript libraries, first, you can create a simple `package.json` file (not required):

```
npm init --yes
```

In the directory, install the corresponding library and the Solidity compiler (_web3.py_ and _py-solc-x_ are installed in the default directory of PIP3):

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```
npm i web3 solc@0.8.0
```

  </TabItem>
  <TabItem value="Ethers.js">

```
npm i ethers solc@0.8.0
```

  </TabItem>
  <TabItem value="Web3.py">

```
pip3 install web3 py-solc-x
```

  </TabItem>
</Tabs>

The versions used when this guide was published were

 - Web3.js v1.5.2 (`npm ls web3`)
 - Ethers.js v5.4.7 (`npm ls ethers`)
 - Web3.py v5.23.1 (`pip3 show web3`)
 - Solc (JS) v0.8.0 (`npm ls solc`)
 - Py-solc-x v1.1.0 (`pip3 show py-solc-x`)

The setup for this example will be relatively simple, and it'll contain the following files:

 - **_Incrementer.sol_** — the file with our Solidity code
 - **_compile.\*_** — compiles the contract with the Solidity compiler
 - **_deploy.\*_**: it will handle the deployment to our local Pangolin node
 - **_get.\*_** — it will make a call to the node to get the current value of the number
 - **_increment.\*_** — it will make a transaction to increment the number stored on the Pangolin node
 - **_reset.\*_** — the function to call that will reset the number stored to zero

## The Contract File

The contract used is a simple incrementer, arbitrarily named _Incrementer.sol_, which you can find [here](/snippets/code/web3-contract-local/Incrementer.sol). The Solidity code is the following:

```solidity
pragma solidity ^0.8.0;

contract Incrementer {
    uint256 public number;

    constructor(uint256 _initialNumber) {
        number = _initialNumber;
    }

    function increment(uint256 _value) public {
        number = number + _value;
    }

    function reset() public {
        number = 0;
    }
}
```

The `constructor` function, which runs when the contract is deployed, sets the initial value of the number variable stored on-chain (default is 0). The `increment` function adds the `_value` provided to the current number, but a transaction needs to be sent, which modifies the stored data. Lastly, the `reset` function resets the stored value to zero.

:::note
This contract is a simple example for illustration purposes only and does not handle values wrapping around.
:::

## Compiling the Contract

The only purpose of the compile file is to use the Solidity compiler to output the bytecode and interface (ABI) our contract. You can find the code snippet for each library here (they were arbitrarily named `compile.*`):

 - Web3.js: [_compile.js_](/snippets/code/web3-contract-local/compile.js)
 - Ethers.js: [_compile.js_](/snippets/code/web3-contract-local/compile.js)
 - Web3.py: [_compile.py_](/snippets/code/web3py-contract/compile.py)

:::note
The compile file for both JavaScript libraries is the same as they share the JavaScript bindings for the Solidity compiler (same package)
:::

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```js
const fs = require('fs');
const solc = require('solc');

// Get Path and Load Contract
const source = fs.readFileSync('Incrementer.sol', 'utf8');

// Compile Contract
const input = {
   language: 'Solidity',
   sources: {
      'Incrementer.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

// Export Contract Data
module.exports = contractFile;
```

  </TabItem>
  <TabItem value="Ethers.js">

```js
const fs = require('fs');
const solc = require('solc');

// Get Path and Load Contract
const source = fs.readFileSync('Incrementer.sol', 'utf8');

// Compile Contract
const input = {
   language: 'Solidity',
   sources: {
      'Incrementer.sol': {
         content: source,
      },
   },
   settings: {
      outputSelection: {
         '*': {
            '*': ['*'],
         },
      },
   },
};
const tempFile = JSON.parse(solc.compile(JSON.stringify(input)));
const contractFile = tempFile.contracts['Incrementer.sol']['Incrementer'];

// Export Contract Data
module.exports = contractFile;
```

  </TabItem>
  <TabItem value="Web3.py">

```python
import solcx

# If you haven't already installed the Solidity compiler, uncomment the following line
# solcx.install_solc()

# Compile contract
temp_file = solcx.compile_files('Incrementer.sol')

# Export contract data
abi = temp_file['Incrementer.sol:Incrementer']['abi']
bytecode = temp_file['Incrementer.sol:Incrementer']['bin']
```

  </TabItem>
</Tabs>

### Web3.js and Ethers.js

In the first part of [the script](/snippets/code/web3-contract-local/compile.js), the contract's path is fetched, and its content read.

Next, the Solidity compiler's input object is built, and it is passed as input to the `solc.compile` function.

Lastly, extract the data of the `Incrementer` contract of the `Incrementer.sol` file, and export it so that the deployment script can use it.

### Web3.py

In the first part of [the script](/snippets/code/web3py-contract/compile.py), the contract file is compiled using the `solcx.compile_files` function. Note that the contract file is in the same directory as the compile script.

:::note
When running the `compile.py` you might be get an error stating that `Solc` needs to be installed. If so, uncomment the line in the file that executes `solcx.install_solc()` and rerun the compile file again with `python3 compile.py`. More information can be found in [this link](https://pypi.org/project/py-solc-x/).
:::

Next, and wrapping up the script, the contract data is exported. In this example, only the interface (ABI) and bytecode were defined.

## Deploying the Contract

Regardless of the library, the strategy to deploy the compiled smart contract is somewhat similar. A contract instance is created using its interface (ABI) and bytecode. From this instance, a deployment function is used to send a signed transaction that deploys the contract. You can find the code snippet for each library here (they were arbitrarily named `deploy.*`):

 - Web3.js: [_deploy.js_](/snippets/code/web3-contract-local/deploy.js)
 - Ethers.js: [_deploy.js_](/snippets/code/ethers-contract-local/deploy.js)
 - Web3.py: [_deploy.py_](/snippets/code/web3py-contract/deploy.py)

For simplicity, the deploy file is composed of two sections. In the first section ("Define Provider & Variables"), the library to use and the ABI and bytecode of the contract are imported. Also, the provider and account from (with the private key) are defined. Note that `providerRPC` has three the standard node RPC endpoint, the one for development, the one for [Pangolin](/builders/get-started/darwinia-pangolin.md) and another one for [Crab](/builders/get-started/darwinia-crab.md).

The second section ("Deploy Contract") outlines the actual contract deployment part. Note that for this example, the initial value of the `number` variable was set to 5. Some of the key takeaways are discussed next.

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```js
const Web3 = require('web3');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   pangolin: 'http://pangolin-rpc.darwinia.network',
   crab: 'http://crab-rpc.darwinia.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
   address: 'PUBLIC-ADDRESS-OF-PK-HERE',
};
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

/*
   -- Deploy Contract --
*/
const deploy = async () => {
   console.log(`Attempting to deploy from account ${account_from.address}`);

   // Create Contract Instance
   const incrementer = new web3.eth.Contract(abi);

   // Create Constructor Tx
   const incrementerTx = incrementer.deploy({
      data: bytecode,
      arguments: [5],
   });

   // Sign Transacation and Send
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         data: incrementerTx.encodeABI(),
         gas: await incrementerTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Contract deployed at address: ${createReceipt.contractAddress}`
   );
};

deploy();
```

  </TabItem>
  <TabItem value="Ethers.js">

```js
const ethers = require('ethers');
const contractFile = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 43,
   },
   pangolin: {
      name: 'pangolin',
      rpc: 'http://pangolin-rpc.darwinia.network',
      chainId: 43,
   },
   crab: {
      name: 'crab',
      rpc: 'http://crab-rpc.darwinia.network',
      chainId: 44,
   },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const bytecode = contractFile.evm.bytecode.object;
const abi = contractFile.abi;

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Deploy Contract --
*/
// Create Contract Instance with Signer
const incrementer = new ethers.ContractFactory(abi, bytecode, wallet);

const deploy = async () => {
   console.log(`Attempting to deploy from account: ${wallet.address}`);

   // Send Tx (Initial Value set to 5) and Wait for Receipt
   const contract = await incrementer.deploy([5]);
   await contract.deployed();

   console.log(`Contract deployed at address: ${contract.address}`);
};

deploy();
```

  </TabItem>
  <TabItem value="Web3.py">

```python
from compile import abi, bytecode
from web3 import Web3

#
# -- Define Provider & Variables --
#
# Provider
provider_rpc = {
    'development': 'http://localhost:9933',
    "pangolin": 'http://pangolin-rpc.darwinia.network',
    "crab": 'http://crab-rpc.darwinia.network',
}
web3 = Web3(Web3.HTTPProvider(provider_rpc['development']))  # Change to correct network

# Variables
account_from = {
    'private_key': 'YOUR-PRIVATE-KEY-HERE',
    'address': 'PUBLIC-ADDRESS-OF-PK-HERE',
}

#
#  -- Deploy Contract --
#
print(f'Attempting to deploy from account: { account_from["address"] }')

# Create Contract Instance
Incrementer = web3.eth.contract(abi=abi, bytecode=bytecode)

# Build Constructor Tx
construct_txn = Incrementer.constructor(5).buildTransaction(
    {
        'from': account_from['address'],
        'nonce': web3.eth.getTransactionCount(account_from['address']),
    }
)

# Sign Tx with PK
tx_create = web3.eth.account.signTransaction(construct_txn, account_from['private_key'])

# Send Tx and Wait for Receipt
tx_hash = web3.eth.sendRawTransaction(tx_create.rawTransaction)
tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)

print(f'Contract deployed at address: { tx_receipt.contractAddress }')
```

  </TabItem>
</Tabs>

:::note
The _deploy.\*_ script provides the contract address as an output. This comes in handy, as it is used for the contract interaction files.
:::

### Web3.js

In the first part of [the script](/snippets/code/web3-contract-local/deploy.js), the `web3` instance (or provider) is created using the `Web3` constructor with the provider RPC. By changing the provider RPC given to the constructor, you can choose which network you want to send the transaction to.

The private key, and the public address associated with it, are defined for signing the transaction and logging purposes. Only the private key is required. Also, the contract's bytecode and interface (ABI) are fetched from the compile's export.

In the second section, a contract instance is created by providing the ABI. Next, the `deploy` function is used, which needs the bytecode and arguments of the constructor function. This will generate the constructor transaction object.

Afterwards, the constructor transaction can be signed using the `web3.eth.accounts.signTransaction()` method. The data field corresponds to the bytecode, and the constructor input arguments are encoded together. Note that the value of gas is obtained using `estimateGas()` option inside the constructor transaction.

Lastly, the signed transaction is sent, and the contract's address is displayed in the terminal.

### Ethers.js

In the first part of [the script](/snippets/code/ethers-contract-local/deploy.js), different networks can be specified with a name, RPC URL (required), and chain ID. The provider (similar to the `web3` instance) is created with the `ethers.providers.StaticJsonRpcProvider` method. An alternative is to use the `ethers.providers.JsonRpcProvide(providerRPC)` method, which only requires the provider RPC endpoint address. But this might created compatibility issues with individual project specifications.

The private key is defined to create a wallet instance, which also requires the provider from the previous step. The wallet instance is used to sign transactions. Also, the contract's bytecode and interface (ABI) are fetched from the compile's export.

In the second section, a contract instance is created with `ethers.ContractFactory()`, providing the ABI, bytecode, and wallet. Thus, the contract instance already has a signer. Next, the `deploy` function is used, which needs the constructor input arguments. This will send the transaction for contract deployment. To wait for a transaction receipt you can use the `deployed()` method of the contract deployment transaction.

Lastly, the contract's address is displayed in the terminal.

### Web3.py

In the first part of [the script](/snippets/code/web3py-contract/deploy.py), the `web3` instance (or provider) is created using the `Web3(Web3.HTTPProvider(provider_rpc))` method with the provider RPC. By changing the provider RPC, you can choose which network you want to send the transaction to.

The private key and the public address associated with it are defined for signing the transaction and establishing the from address.

In the second section, a contract instance is created with `web3.eth.contract()`, providing the ABI and bytecode imported from the compile file. Next, the constructor transaction can be built using the `constructor().buildTransaction()` method of the contract instance. Note that inside the `constructor()`, you need to specify the constructor input arguments. The `from` account needs to be outlined as well. Make sure to use the one associated with the private key. Also, the transaction count can be obtained with the `web3.eth.getTransactionCount(address)` method.

The constructor transaction can be signed using `web3.eth.account.signTransaction()`, passing the constructor transaction and the private key.

Lastly, the signed transaction is sent, and the contract's address is displayed in the terminal.

## Reading from the Contract (Call Methods)

Call methods are the type of interaction that don't modify the contract's storage (change variables), meaning no transaction needs to be sent.

Let's overview the _get.\*_ file (the simplest of them all), which fetches the current value stored in the contract. You can find the code snippet for each library here (they were arbitrarily named `get.*`):

 - Web3.js: [_get.js_](/snippets/code/web3-contract-local/get.js)
 - Ethers.js: [_get.js_](/snippets/code/ethers-contract-local/get.js)
 - Web3.py: [_get.py_](/snippets/code/web3py-contract/get.py)

For simplicity, the get file is composed of two sections. In the first section ("Define Provider & Variables"), the library to use and the ABI of the contract are imported. Also, the provider and the contract's address are defined. Note that `providerRPC` has three the standard node RPC endpoint, the one for development, the one for [Pangolin](/builders/get-started/darwinia-pangolin.md) and another one for [Crab](/builders/get-started/darwinia-crab.md).

The second section ("Call Function") outlines the actual call to the contract. Regardless of the library, a contract instance is created (linked to the contract's address), from which the call method is queried. Some of the key takeaways are discussed next.

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```js
const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   pangolin: 'http://pangolin-rpc.darwinia.network',
   crab: 'http://crab-rpc.darwinia.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const contractAddress = 'CONTRACT-ADDRESS-HERE';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

const get = async () => {
   console.log(`Making a call to contract at address: ${contractAddress}`);

   // Call Contract
   const data = await incrementer.methods.number().call();

   console.log(`The current number stored is: ${data}`);
};

get();
```

  </TabItem>
  <TabItem value="Ethers.js">

```js
const ethers = require('ethers');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 43,
   },
   pangolin: {
      name: 'pangolin',
      rpc: 'http://pangolin-rpc.darwinia.network',
      chainId: 43,
   },
   crab: {
      name: 'crab',
      rpc: 'http://crab-rpc.darwinia.network',
      chainId: 44,
   },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
); //Change to correct network

// Variables
const contractAddress = 'CONTRACT-ADDRESS-HERE';

/*
   -- Call Function --
*/
// Create Contract Instance
const incrementer = new ethers.Contract(contractAddress, abi, provider);

const get = async () => {
   console.log(`Making a call to contract at address: ${contractAddress}`);

   // Call Contract
   const data = await incrementer.number();

   console.log(`The current number stored is: ${data}`);
};

get();
```

  </TabItem>
  <TabItem value="Web3.py">

```python
from compile import abi, bytecode
from web3 import Web3

#
# -- Define Provider & Variables --
#
# Provider
provider_rpc = {
    'development': 'http://localhost:9933',
    "pangolin": 'http://pangolin-rpc.darwinia.network',
    "crab": 'http://crab-rpc.darwinia.network',
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["development"]))  # Change to correct network

# Variables
contract_address = 'CONTRACT-ADDRESS-HERE'

#
#  -- Call Function --
#
print(f'Making a call to contract at address: { contract_address }')

# Create Contract Instance
Incrementer = web3.eth.contract(address=contract_address, abi=abi)

# Call Contract
number = Incrementer.functions.number().call()

print(f'The current number stored is: { number } ')
```

  </TabItem>
</Tabs>

### Web3.js

In the first part of [the script](/snippets/code/web3-contract-local/get.js), the `web3` instance (or provider) is created using the `Web3` constructor with the provider RPC. By changing the provider RPC given to the constructor, you can choose which network you want to send the transaction to.

The contract's interface (ABI) and address are needed as well to interact with it.

In the second section, a contract instance is created with `web3.eth.Contract()` by providing the ABI and address. Next, the method to call can be queried with the `contract.methods.methodName(_input).call()` function, replacing `contract`, `methodName` and `_input` with the contract instance, function to call, and input of the function (if necessary). This promise, when resolved, will return the value requested.

Lastly, the value is displayed in the terminal.

### Ethers.js

In the first part of [the script](/snippets/code/ethers-contract-local/get.js), different networks can be specified with a name, RPC URL (required), and chain ID. The provider (similar to the `web3` instance) is created with the `ethers.providers.StaticJsonRpcProvider` method. An alternative is to use the `ethers.providers.JsonRpcProvide(providerRPC)` method, which only requires the provider RPC endpoint address. But this might created compatibility issues with individual project specifications.

The contract's interface (ABI) and address are needed as well to interact with it.

In the second section, a contract instance is created with `ethers.Contract()`, providing its address, ABI, and the provider. Next, the method to call can be queried with the `contract.methodName(_input)` function, replacing `contract` `methodName`, and `_input` with the contract instance, function to call, and input of the function (if necessary). This promise, when resolved, will return the value requested.

Lastly, the value is displayed in the terminal.

### Web3.py

In the first part of [the script](/snippets/code/web3py-contract/get.py), the `web3` instance (or provider) is created using the `Web3(Web3.HTTPProvider(provider_rpc))` method with the provider RPC. By changing the provider RPC, you can choose which network you want to send the transaction to.

The contract's interface (ABI) and address are needed as well to interact with it.

In the second section, a contract instance is created with `web3.eth.contract()` by providing the ABI and address. Next, the method to call can be queried with the `contract.functions.method_name(input).call()` function, replacing `contract`, `method_name` and `input` with the contract instance, function to call, and input of the function (if necessary). This returns the value requested.

Lastly, the value is displayed in the terminal.

## Interacting with the Contract (Send Methods)

Send methods are the type of interaction that modify the contract's storage (change variables), meaning a transaction needs to be signed and sent.

First, let's overview the _increment.\*_ file, which increments the current number stored in the contract by a given value. You can find the code snippet for each library here (they were arbitrarily named `increment.*`):

 - Web3.js: [_increment.js_](/snippets/code/web3-contract-local/increment.js)
 - Ethers.js: [_increment.js_](/snippets/code/ethers-contract-local/increment.js)
 - Web3.py: [_increment.py_](/snippets/code/web3py-contract/increment.py)

For simplicity, the increment file is composed of two sections. In the first section ("Define Provider & Variables"), the library to use and the ABI of the contract are imported. The provider, the contract's address, and the value of the `increment` function are also defined. Note that `providerRPC` has three the standard node RPC endpoint, the one for development, the one for [Pangolin](/builders/get-started/darwinia-pangolin.md) and another one for [Crab](/builders/get-started/darwinia-crab.md).

The second section ("Send Function") outlines the actual function to be called with the transaction. Regardless of the library, a contract instance is created (linked to the contract's address), from which the function to be used is queried.

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```js
const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   pangolin: 'http://pangolin-rpc.darwinia.network',
   crab: 'http://crab-rpc.darwinia.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const contractAddress = 'CONTRACT-ADDRESS-HERE';
const _value = 3;

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Increment Tx
const incrementTx = incrementer.methods.increment(_value);

const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: incrementTx.encodeABI(),
         gas: await incrementTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

increment();
```

  </TabItem>
  <TabItem value="Ethers.js">

```js
const ethers = require('ethers');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 43,
   },
   pangolin: {
      name: 'pangolin',
      rpc: 'http://pangolin-rpc.darwinia.network',
      chainId: 43,
   },
   crab: {
      name: 'crab',
      rpc: 'http://crab-rpc.darwinia.network',
      chainId: 44,
   },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const contractAddress = 'CONTRACT-ADDRESS-HERE';
const _value = 3;

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Send Function --
*/
// Create Contract Instance with Signer
const incrementer = new ethers.Contract(contractAddress, abi, wallet);
const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );

   // Sign-Send Tx and Wait for Receipt
   const createReceipt = await incrementer.increment([_value]);
   await createReceipt.wait();

   console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

increment();
```

  </TabItem>
  <TabItem value="Web3.py">

```python
from compile import abi, bytecode
from web3 import Web3

#
# -- Define Provider & Variables --
#
# Provider
provider_rpc = {
    'development': 'http://localhost:9933',
    "pangolin": 'http://pangolin-rpc.darwinia.network',
    "crab": 'http://crab-rpc.darwinia.network',
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["development"]))  # Change to correct network

# Variables
account_from = {
    'private_key': 'YOUR-PRIVATE-KEY-HERE',
    'address': 'PUBLIC-ADDRESS-OF-PK-HERE',
}
contract_address = 'CONTRACT-ADDRESS-HERE'
value = 3

#
#  -- Send Function --
#
print(
    f'Calling the increment by { value } function in contract at address: { contract_address }'
)

# Create Contract Instance
Incrementer = web3.eth.contract(address=contract_address, abi=abi)

# Build Increment Tx
increment_tx = Incrementer.functions.increment(value).buildTransaction(
    {
        'from': account_from['address'],
        'nonce': web3.eth.getTransactionCount(account_from['address']),
    }
)

# Sign Tx with PK
tx_create = web3.eth.account.signTransaction(increment_tx, account_from['private_key'])

# Send Tx and Wait for Receipt
tx_hash = web3.eth.sendRawTransaction(tx_create.rawTransaction)
tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)

print(f'Tx successful with hash: { tx_receipt.transactionHash.hex() }')
```

  </TabItem>
</Tabs>

The second file to interact with the contract is the _reset.\*_ file, which resets the number stored in the contract to zero. You can find the code snippet for each library here (they were arbitrarily named `reset.*`):

 - Web3.js: [_reset.js_](/snippets/code/web3-contract-local/reset.js)
 - Ethers.js: [_reset.js_](/snippets/code/ethers-contract-local/reset.js)
 - Web3.py: [_reset.py_](/snippets/code/web3py-contract/reset.py)

Each file's structure is very similar to his _increment.\*_ counterpart for each library. The main difference is the method being called.

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```js
const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   pangolin: 'http://pangolin-rpc.darwinia.network',
   crab: 'http://crab-rpc.darwinia.network',
};
const web3 = new Web3(providerRPC.development); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const contractAddress = 'CONTRACT-ADDRESS-HERE';

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Reset Tx
const resetTx = incrementer.methods.reset();

const reset = async () => {
   console.log(
      `Calling the reset function in contract at address: ${contractAddress}`
   );

   // Sign Tx with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: resetTx.encodeABI(),
         gas: await resetTx.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Tx and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Tx successful with hash: ${createReceipt.transactionHash}`);
};

reset();
```

  </TabItem>
  <TabItem value="Ethers.js">

```js
const ethers = require('ethers');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: {
      name: 'development',
      rpc: 'http://localhost:9933',
      chainId: 43,
   },
   pangolin: {
      name: 'pangolin',
      rpc: 'http://pangolin-rpc.darwinia.network',
      chainId: 43,
   },
   crab: {
      name: 'crab',
      rpc: 'http://crab-rpc.darwinia.network',
      chainId: 44,
   },
};
const provider = new ethers.providers.StaticJsonRpcProvider(
   providerRPC.development.rpc,
   {
      chainId: providerRPC.development.chainId,
      name: providerRPC.development.name,
   }
); //Change to correct network

// Variables
const account_from = {
   privateKey: 'YOUR-PRIVATE-KEY-HERE',
};
const contractAddress = 'CONTRACT-ADDRESS-HERE';

// Create Wallet
let wallet = new ethers.Wallet(account_from.privateKey, provider);

/*
   -- Send Function --
*/
// Create Contract Instance with Signer
const incrementer = new ethers.Contract(contractAddress, abi, wallet);
const reset = async () => {
   console.log(
      `Calling the reset function in contract at address: ${contractAddress}`
   );

   // Sign-Send Tx and Wait for Receipt
   const createReceipt = await incrementer.reset();
   await createReceipt.wait();

   console.log(`Tx successful with hash: ${createReceipt.hash}`);
};

reset();
```

  </TabItem>
  <TabItem value="Web3.py">

```python
from compile import abi, bytecode
from web3 import Web3

#
# -- Define Provider & Variables --
#
# Provider
provider_rpc = {
    'development': 'http://localhost:9933',
    "pangolin": 'http://pangolin-rpc.darwinia.network',
    "crab": 'http://crab-rpc.darwinia.network',
}
web3 = Web3(Web3.HTTPProvider(provider_rpc["development"]))  # Change to correct network

# Variables
account_from = {
    'private_key': 'YOUR-PRIVATE-KEY-HERE',
    'address': 'PUBLIC-ADDRESS-OF-PK-HERE',
}
contract_address = 'CONTRACT-ADDRESS-HERE'

#
#  -- Call Function --
#
print(f'Calling the reset function in contract at address: { contract_address }')

# Create Contract Instance
Incrementer = web3.eth.contract(address=contract_address, abi=abi)

# Build Reset Tx
reset_tx = Incrementer.functions.reset().buildTransaction(
    {
        'from': account_from['address'],
        'nonce': web3.eth.getTransactionCount(account_from['address']),
    }
)

# Sign Tx with PK
tx_create = web3.eth.account.signTransaction(reset_tx, account_from['private_key'])

# Send Tx and Wait for Receipt
tx_hash = web3.eth.sendRawTransaction(tx_create.rawTransaction)
tx_receipt = web3.eth.waitForTransactionReceipt(tx_hash)

print(f'Tx successful with hash: { tx_receipt.transactionHash.hex() }')
```

  </TabItem>
</Tabs>

### Web3.js

In the first part of the script ([increment](/snippets/code/web3-contract-local/increment.js) or [reset](/snippets/code/web3-contract-local/reset.js) files), the `web3` instance (or provider) is created using the `Web3` constructor with the provider RPC. By changing the provider RPC given to the constructor, you can choose which network you want to send the transaction to.

The private key, and the public address associated with it, are defined for signing the transaction and logging purposes. Only the private key is required. Also, the contract's interface (ABI) and address are needed to interact with it. If necessary, you can define any variable required as input to the function you are going to interact with.

In the second section, a contract instance is created with `web3.eth.Contract()` by providing the ABI and address. Next, you can build the transaction object with the `contract.methods.methodName(_input)` function, replacing `contract`, `methodName` and `_input` with the contract instance, function to call, and input of the function (if necessary).

Afterwards, the transaction can be signed using the `web3.eth.accounts.signTransaction()` method. The data field corresponds to the transaction object from the previous step. Note that the value of gas is obtained using `estimateGas()` option inside the transaction object.

Lastly, the signed transaction is sent, and the transaction hash is displayed in the terminal.

### Ethers.js

In the first part of the script ([increment](/snippets/code/ethers-contract-local/increment.js) or [reset](/snippets/code/ethers-contract-local/reset.js) files), different networks can be specified with a name, RPC URL (required), and chain ID. The provider (similar to the `web3` instance) is created with the `ethers.providers.StaticJsonRpcProvider` method. An alternative is to use the `ethers.providers.JsonRpcProvide(providerRPC)` method, which only requires the provider RPC endpoint address. But this might created compatibility issues with individual project specifications.

The private key is defined to create a wallet instance, which also requires the provider from the previous step. The wallet instance is used to sign transactions. Also, the contract's interface (ABI) and address are needed to interact with it. If necessary, you can define any variable required as input to the function you are going to interact with.

In the second section, a contract instance is created with `ethers.Contract()`, providing its address, ABI, and wallet. Thus, the contract instance already has a signer. Next, transaction corresponding to a specific function can be send with the `contract.methodName(_input)` function, replacing `contract`, `methodName` and `_input` with the contract instance, function to call, and input of the function (if necessary). To wait for a transaction receipt, you can use the `wait()` method of the contract deployment transaction.

Lastly, the transaction hash is displayed in the terminal.

### Web3.py

In the first part of the script ([increment](/snippets/code/web3py-contract/increment.py) or [reset](/snippets/code/web3py-contract/reset.py) files), the `web3` instance (or provider) is created using the `Web3(Web3.HTTPProvider(provider_rpc))` method with the provider RPC. By changing the provider RPC, you can choose which network you want to send the transaction to.

The private key and the public address associated with it are defined for signing the transaction and establishing the from address. Also, the contract's interface (ABI) and address are needed as well to interact with it.

In the second section, a contract instance is created with `web3.eth.contract()` by providing the ABI and address. Next, you can build the transaction object with the `contract.functions.methodName(_input).buildTransaction` function, replacing `contract`, `methodName` and `_input` with the contract instance, function to call, and input of the function (if necessary). Inside `buildTransaction()`, the `from` account needs to be outlined. Make sure to use the one associated with the private key. Also, the transaction count can be obtained with the `web3.eth.getTransactionCount(address)` method.

The transaction can be signed using `web3.eth.account.signTransaction()`, passing the transaction object of the previous step and the private key.

Lastly, the transaction hash is displayed in the terminal.

## Running the Scripts

For this section, the code shown before was adapted to target a development node, which you can run by following [this tutorial](/builders/get-started/darwinia-dev/). Also, each transaction was sent from the pre-funded account that comes with the node:

import DevAccount from '/snippets/text/metamask-local/dev-account.md';

<DevAccount name="devAccount" />

First, deploy the contract by running (note that the directory was renamed for each library):

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```
node deploy.js
```

  </TabItem>
  <TabItem value="Ethers.js">

```
node deploy.js
```

  </TabItem>
  <TabItem value="Web3.py">

```
python3 deploy.py
```

  </TabItem>
</Tabs>

This will deploy the contract and return the address:

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">
	<img
	  src={require('/images/deploycontract/contract-deploy-web3js.png').default}
	  alt="Deploy Contract Web3js"
	/>
  </TabItem>
  <TabItem value="Ethers.js">
	<img
	  src={require('/images/deploycontract/contract-deploy-ethers.png').default}
	  alt="Deploy Contract Etherjs"
	/>
  </TabItem>
  <TabItem value="Web3.py">
	<img
	  src={require('/images/deploycontract/contract-deploy-web3py.png').default}
	  alt="Deploy Contract Web3py"
	/>
  </TabItem>
</Tabs>

Next, run the increment file. You can use the get file to verify the value of the number stored in the contract before and after increment it:

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```
# Get value
node get.js
# Increment value
increment.js
# Get value
node get.js
```

  </TabItem>
  <TabItem value="Ethers.js">

```
# Get value
node get.js
# Increment value
increment.js
# Get value
node get.js
```

  </TabItem>
  <TabItem value="Web3.py">

```
# Get value
python3 get.py
# Increment value
python3 increment.py
# Get value
python3 get.py
```

  </TabItem>
</Tabs>

This will display the value before the increment transaction, the hash of the transaction, and the value after:

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">
	<img
	  src={require('/images/deploycontract/contract-increment-web3js.png').default}
	  alt="Increment Contract Web3js"
	/>
  </TabItem>
  <TabItem value="Ethers.js">
	<img
	  src={require('/images/deploycontract/contract-increment-ethers.png').default}
	  alt="Increment Contract Etherjs"
	/>
  </TabItem>
  <TabItem value="Web3.py">
	<img
	  src={require('/images/deploycontract/contract-increment-web3py.png').default}
	  alt="Increment Contract Web3py"
	/>
  </TabItem>
</Tabs>

Lastly, run the reset file. Once again, you can use the get file to verify the value of the number stored in the contract before and after resetting it:

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">

```
# Get value
node get.js
# Reset value
node reset.js
# Get value
node get.js
```

  </TabItem>
  <TabItem value="Ethers.js">

```
# Get value
node get.js
# Reset value
node reset.js
# Get value
node get.js
```

  </TabItem>
  <TabItem value="Web3.py">

```
# Get value
python3 get.py
# Reset value
python3 reset.py
# Get value
python3 get.py
```

  </TabItem>
</Tabs>

This will display the value before the reset transaction, the hash of the transaction, and the value after:

<Tabs
  defaultValue="Web3.js"
  values={[
    {label: 'Web3.js', value: 'Web3.js'},
    {label: 'Ethers.js', value: 'Ethers.js'},
    {label: 'Web3.py', value: 'Web3.py'},
  ]}>
  <TabItem value="Web3.js">
	<img
	  src={require('/images/deploycontract/contract-reset-web3js.png').default}
	  alt="Reset Contract Web3js"
	/>
  </TabItem>
  <TabItem value="Ethers.js">
	<img
	  src={require('/images/deploycontract/contract-reset-ethers.png').default}
	  alt="Reset Contract Etherjs"
	/>
  </TabItem>
  <TabItem value="Web3.py">
	<img
	  src={require('/images/deploycontract/contract-reset-web3py.png').default}
	  alt="Reset Contract Web3py"
	/>
  </TabItem>
</Tabs>