---
id: crab-home
title: Crab Network
sidebar_label: Crab Network
sidebar_position: 1
slug: /
---

Crab Network (Crab) is a canary network with real economic value for Darwinia, and its positioning is similar to Polkadot's Kusama Network. To expect chaos is a reasonable assumption!

Crab mainly serves as a testbed and simulation environment for Darwinia network upgrades and application deployment on which radical experiments can be performed. It not only provides a complete network and software execution environment, but also an economic environment.

There are three types chains in the Crab network, namely Crab Chain(CC), Crab Parachain(CP) and Crab Smart Chain(CSC). CC and CSC provide two set of different interfaces and chain structures but share the same nodes network, state storage and native token(CRAB).

### Crab Chain

Crab Chain(CC) is the native standalone chain based on Substrate with a set of dispatch calls defined by its runtime, so its chain type is Substrate. The address is of Substrate SS58 format with prefix 42, and the decimal is 9. The node of CC provides substrate RPC endpoint for reading chain states and sending extrinsics which can be included in Substrate blocks, and these blocks are chained together as a Substrate blockchain in the network.

### Crab Parachain

**Crab Network has won the 22nd Kusama parachain slot!**
### Crab Smart Chain

CSC adds an Ethereum-Compatible layer to the CC and provides users with the ability to create and interact with solidity smart contracts. The node of CSC provides Ethereum RPCs endpoint for reading chain states and sending transactions which can be included in Ethereum blocks, and these blocks are chained together as an Ethereum blockchain in the network. Therefore, it is easy for projects in the Ethereum ecosystem to migrate to the Darwinia Network.