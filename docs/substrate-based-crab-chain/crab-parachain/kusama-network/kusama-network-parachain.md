---
id: Parachain
sidebar_label: Parachain
sidebar_position: 1
title: Parachain
---

## Introduction

Kusama is a scalable heterogeneous multi-chain. This means that unlike previous blockchain implementations which have focused on providing a single chain of varying degrees of generality over potential applications, Kusama itself is designed to provide no inherent application functionality at all. Rather, Kusama provides the bedrock “relay chain” upon which a large number of validatable, globally-coherent dynamic data-structures may be hosted side-by-side. We call these data-structures “parallelised” chains or parachains, though there is no specific need for them to be blockchain in nature. 

## Relay Chain

*The Relay Chain is the central chain of Kusama. All validators of Kusama are staked on the Relay Chain in KSM and validate for the Relay Chain. The Relay Chain is composed of a relatively small number of transaction types that include ways to interact with the governance mechanism, parachain auctions, and participating in NPoS. The Relay Chain has deliberately minimal functionality - for instance, smart contracts are not supported. The main responsibility is to coordinate the system as a whole, including parachains. Other specific work is delegated to the parachains, which have different implementations and features.*

### Roles in the Relay Chain

`Nominator`: A nominator is a stake-holding party who contributes to the security bond of a validator. They have no additional role except to place risk capital and as such to signal that they trust a particular validator (or set thereof) to act responsibly in their maintenance of the network. They receive a pro-rata increase or reduction in their deposit according to the bond’s growth to which they contribute. Nominators are in some sense similar to the miners of the present-day PoW networks.

> Nominators are the token holders who want to get rewards through staking. They are one type of participant in the staking subsystem of Kusama. They are responsible for appointing their stake to the validators. By appointing their stake, they are able to elect the active set of validators and share in the rewards that are paid out.

`Validator`: Validators are active participants in the network that engage in the block production and finality mechanisms. Running a validator on a live network is a lot of responsibility! Validators will be accountable for not only their own stake, but also the stake of their current nominators. If validators make a mistake and get slashed, their money and reputation will be at risk. Also, a validator in the Kusama ecosystem plays an essential role in parachain network and is responsible for crucial tasks, including block production and transaction confirmation.

More explain about the roles, please refer [Polkadot WhitePaper](https://polkadot.network/PolkaDotPaper.pdf).

## Parallel Chain(Parachain)

*A parachain is an application-specific data structure that is globally coherent and validatable by the validators of the Relay Chain. They take their name from the concept of parallelized chains that run parallel to the Relay Chain. Most commonly, a parachain will take the form of a blockchain, but there is no specific need for them to be actual blockchains.*

### Roles in the Parachain

`Collator`: Collators maintain parachains by collecting parachain transactions from users and producing state transition proofs for Relay Chain validators. In other words, collators maintain parachains by aggregating parachain transactions into parachain block candidates and producing state transition proofs for validators based on those blocks. Unlike validators, collator nodes do not secure the network. If a parachain block is invalid, it will get rejected by validators on relay-chain. Therefore the assumption that having more collators is better or more secure is not correct. On the contrary, too many collators may slow down the network.

`Fisherman`: Collators as a role who collecting and propagating user transactions, as well as propagating block candidates to fishermen on the parachain and validators on the relay chain. Fishermen are full nodes of parachains, like collators, but instead of packaging the state transitions and producing the next parachain blocks as collators do, fishermen will receive block candidates from collators and watch this process and ensure no invalid state transitions are included. But, fishermen are not available on Kusama and are not planned for formal implementation.