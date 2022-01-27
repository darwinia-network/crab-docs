---
title: Remix
sidebar_position: 4
description: Learn how to use one of the most popular Ethereum developer tools, the Remix IDE, to interact with Darwinia.
---

# Remix

## Introduction

Another tool developers can use to interact with Pangolin is the [Remix IDE](https://remix.ethereum.org/), one of the most commonly used development environments for smart contracts on Ethereum. It provides a web-based solution to quickly compile and deploy Solidity and Vyper based code to either a local VM or, more interestingly, an external Web3 provider, such as MetaMask. By combining both tools, one can get started very swiftly with Pangolin.

## Deploying a Contract to Pangolin

To demonstrate how you can leverage [Remix](https://remix.ethereum.org/) to deploy smart contracts to Pangolin, we will use the following basic contract:

```solidity
pragma solidity ^0.7.5;
contract SimpleContract{
    string public text;

    constructor(string memory _input) {
        text = _input;
    }
}
```

Once you've compiled the contract and are ready to deploy you can navigate to the "Deploy & Run Transactions" tab in Remix and follow these steps:

1. Set the Remix environment to "Injected Web3"
2. Set your account and ensure you have funds. For Pangolin, you can use our [TestNet faucet](../../get-started/darwinia-pangolin/#get-tokens)
3. Pass in `Test Contract` as input to the contructor function and hit "Deploy"
4. MetaMask will pop-up and show the information regarding the transaction, which you'll need to sign by clicking "Confirm"

![Deploying Contract](/images/remix/integrations-remix-1.png)

Once the transaction is included, the contract appears in the "Deployed Contracts" section on Remix. In there, we can interact with the functions available from our contract.

![Interact with Contract](/images/remix/integrations-remix-2.png)

## Tutorial

If you are interested in a more detailed step-by-step guide, go to our specific tutorials about [using Remix](../interact/remix/) with Pangolin.
