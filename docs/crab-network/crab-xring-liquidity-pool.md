---
id: crab-xring-liquidity-pool
title: A Note on CRAB<>xRING Liquidity Pool
sidebar_label: CRAB<>xRING Liquidity Pool
sidebar_position: 6
---

Some users wonder whether the RING-to-CRAB exchange rate is fixed, or how the exchange rate evolves. This article will clarify some questions around this topic.

## History
We [reserved](https://github.com/darwinia-network/darwinia-common/blob/c387ba1c7303e1bad26aa612f232afcbcfd891ae/frame/bridge/crab/backing/src/lib.rs#L62) 40M RING in *CrabBacking* Account in the launch of Darwinia Network, and the corresponding mapped(wrapped) RINGs were [issued and recorded](https://github.com/darwinia-network/darwinia-common/blob/c387ba1c7303e1bad26aa612f232afcbcfd891ae/frame/bridge/crab/issuing/src/lib.rs#L82) in Crab Network's *Issuing* module on Crab network. xRING denotes mapped RING in the rest part of this article. 

Before Darwinia mainnet, there was a genesis cross-chain event during which uses could convert *CRAB* into *xRING* at the rate of **100 *CRAB* = 1 *xRING* ** and redeem that 1 ***xRING*** into Darwinia genesis(burned in Crab side, and [unlocked](https://github.com/darwinia-network/darwinia-common/blob/45c85a84750c42bef91637507d706bf40dbdb5fe/frame/bridge/crab/issuing/src/lib.rs#L132) from CrabBacking to user).
The *CRAB* used to swap for *xRING* is currently locked in the [module account](https://crab.subscan.io/account/5EYCAe5gKAhHQ8Hp3UUSqEGzsUtdrevrhUadXKWuwzDYmX9T).

## Rationale
The backing assets(*xRING*) are allocated to Crab Network to make it a canary network with real economic incentives and massive gaming theory testing other than a testnet.

## Problems
Once the two networks have started evolving independently, the exchange rate of 100:1 between CRAB and RING no longer applies. There is no such pegging mechanism inherently. The evaluation of two assets(RING & CRAB) should be market-driven and relatively independent.

The total supply of CRAB would be 10,000M, which requires a liquidity pool of larger volume. The amount currently locked in the backing account is far from sufficient.

*xRING was recorded in CrabIssuing pallet because sub-sub bridge is not ready and MappingTokenFactory(based on DVM) is not ready.*

## Proposals
We plan to migrate *xRING* recorded in the *CrabIssuing* pallet to ERC-20 mapped tokens in a reserved EVM account controlled by Crab Module Account(Treasury/Council) after a Substrate-to-Substrate bridge between Darwinia and Crab networks. All mapped tokens are managed using EVM by design, and controlled by the *Issuing* module and relative MappingTokenFactory.

We will use tokens from the above reserved account and the Crab *Issuing* Account to create a UNISW-like liquidity pool to increase the liquidity of both tokens. It is possible that that the amount of CRAB currently locked in the Crab *Issuing* module does match the outside price, but the shortfall or surplus can be addressed by *Treasuary*.

## Summary
CRAB and xRING no longer follow the 100:1 swap ratio, which has already happened in off-chain exchanges with most liquidation. The original backing assets(xRING) will be transferred to Crab Treasury(/Council), and Crab Treasury can use these backing assets to create a liquidity pool for the long-term running of the **CRAB/xRING** trade pair. These changes conform to the positioning of Crab as a Canary network of Darwinia with real economic value.
