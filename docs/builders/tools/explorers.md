---
title: Block Explorers
sidebar_position: 9
description: An overview of the currently available block explorers that may be used to navigate the Substrate and Ethereum layers of the Pangolin TestNet.
---
# Block Explorers

## Introduction

Block explorers can be thought of as search engines for the blockchain. They allow users to search information such as balances, contracts, and transactions. More advanced block explorers even offer indexing capabilities, which enable them to provide a complete set of information, such as ERC20 tokens in the network. They might even offer API services to access it via external services.

### PolkadotJS (Dev Node - TestNet)

Polkadot JS Apps uses the WebSocket endpoint to interact with the Network. To connect it to a Darwinia development node, you can follow the steps in [this tutorial](/builders/get-started/darwinia-dev/#connecting-to-darwinia-apps). The default port for this is `9944`.

![Polkadot JS Local Node](/images/explorers/explorers-images-3.png)

To view and interact with Pangolin's substrate layer, go to [this URL](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpangolin-rpc.darwinia.network#/explorer). This is the Polkadot JS Apps pointing to the TestNet. You can find more information in [this page](/builders/get-started/darwinia-dev/#connecting-to-darwinia-apps).

![Polkadot JS Pangolin](/images/explorers/explorers-images-4.png)

### Subscan

Subscan provides blockchain explorer capabilities for Substrate-based chains. It is capable of parsing standard or custom modules. For example, this is useful to display information regarding the Staking, Governance, and EVM pallets (or modules). Code is all open-source and can be found [here](https://github.com/itering/subscan-essentials).

An instance of Subscan running against the Pangolin TestNet can be found in [this link](https://pangolin.subscan.io/).

![Subscan Pangolin](/images/explorers/explorers-images-5.png)
