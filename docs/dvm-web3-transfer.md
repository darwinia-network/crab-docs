---
id: dvm-web3-transfer
title: Web3 Transfer
sidebar_label: Web3 Transfer
---

## Preparations

1. Install Nodejs

```sh
$ sudo apt install -y nodejs
```

2. install web3 package

```sh
$ mkdir transaction && cd transaction/
$ npm init --yes
$ npm install --save web3
```

3. The project layout as follows:

```sh
$ ls transaction/
balance.js  node_modules/  package.json  package-lock.json  transaction.js
```

## Get balance

```js
// balance.js
const Web3 = require('web3');

// Variables definition
const addressFrom = '0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b';
const addressTo = '0xAa01a1bEF0557fa9625581a293F3AA7770192632';
const web3 = new Web3('http://localhost:9933');

// Balance call
const balances = async () => {
   const balanceFrom = web3.utils.fromWei(
      await web3.eth.getBalance(addressFrom),
      'ether'
   );
   const balanceTo = await web3.utils.fromWei(
      await web3.eth.getBalance(addressTo),
      'ether'
   );

   console.log(`The balance of ${addressFrom} is: ${balanceFrom} PRING.`);
   console.log(`The balance of ${addressTo} is: ${balanceTo} PRING.`);
};

balances();
```

The output:

```sh
$ node balance.js
The balance of 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b is: 123.45678900000000009 PRING.
The balance of 0xAa01a1bEF0557fa9625581a293F3AA7770192632 is: 0 PRING.
```

## Transfer

Make a transaction to Transfer 50 PRING from `0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b` to `0xAa01a1bEF0557fa9625581a293F3AA7770192632`.

```js
// transfer.js
const Web3 = require('web3');

// Variables definition
const privKey =
   '99B3C12287537E38C90A9219D4CB074A89A16E9CDB20BF85728EBD97C343E342';
const addressFrom = '0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b';
const addressTo = '0xAa01a1bEF0557fa9625581a293F3AA7770192632';
const web3 = new Web3('http://localhost:9933');

// Create transaction
const deploy = async () => {
   console.log(
      `Attempting to send transaction from ${addressFrom} to ${addressTo}`
   );

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: web3.utils.toWei('50', 'ether'),
         gas: '5000000000',
      },
      privKey
   );

   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );

   console.log(
      `Transaction successful with hash: ${createReceipt.transactionHash}`
   );

}

deploy();
```

The output:

```sh
$ node transaction.js 
Attempting to send transaction from 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b to 0xAa01a1bEF0557fa9625581a293F3AA7770192632
Transaction successful with hash: 0xaccfb5438c6927c6c32adc640394600f5dda183ea82683dc5a9feddc64b5d438
```

Get balances again:

```sh
The balance of 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b is: 73.45678900000000009 PRING.
The balance of 0xAa01a1bEF0557fa9625581a293F3AA7770192632 is: 50 PRING.
```
