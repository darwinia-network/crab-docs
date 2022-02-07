---
id: crab-home
title: Crab Network
sidebar_label: Crab Network
sidebar_position: 1
slug: /
---

Crab Network (Crab) is a canary network with real economic value for Darwinia, and its positioning is similar to Polkadot's Kusama Network. To expect chaos is a reasonable assumption!

Crab mainly serves as a testbed and simulation environment for Darwinia network upgrades and application deployment on which radical experiments can be performed. It not only provides a complete network and software execution environment, but also an economic environment.


Crab is the first crosschain Bridge in the Polkadot ecosystem with Ethereum Virtual Machine (EVM) compatibility that enabling bridge message delivery, serving multiple ecosystem applications such as Wormhole(token bridge) and Evolution Land(Multi chain blockchain game and metaverse).

Utilizing Darwinia Network's innovative bridge technology, Crab provides an onramp to the Polkadot ecosystem for projects deployed on public blockchains such as Ethereum, TRON, and BSC, and does so with very low transaction fees. 

Crab has the same parameters as Darwinia Mainnet, and uses the same staking and inflation models. Crab’s tokens are CRAB and CKTON, with the intial supply of CRAB being 2000M, and supply of CKTON starting at 0.

There are two chains in Crab network, Crab Chain(CC) and Crab Smart Chain(CSC). They provide two set of interfaces and chain structures but share the same nodes network, state storage and native token(CRAB). Crab is Darwinia’s canary network.

CC is the native standalone chain of Darwinia Crab based on Substrate with a set of dispatch calls defined by its runtime, so its chain type is Substrate. The address is of Substrate SS58 format with prefix 42, and the decimal is 9. The node of CC provides substrate RPC endpoint for reading chain states and sending extrinsics which can be included in Substrate blocks, and these blocks are chained together as a Substrate blockchain in the network. The CC data is available at Subscan.

CSC is for EVM compatibility, and provides users with the ability to create and interact with smart contracts. In the dispatch calls of CC, there is a special one called Ethereum.transact which is used for Ethereum transaction.

*** [Crab Network has won the 22nd Kusama parachain slot!]***
