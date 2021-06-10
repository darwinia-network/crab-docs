---
id: crab-crowdloan
title: Kusama Parachain Slot Auction Crowdloan
sidebar_label: Kusama Parachain Auction Crowdloan
---

Kusama allows parachains to source KSM for their parachain bids in a decentralized crowdloan.

## What you can get?

* Guaranteed rewards

  Every **1 KSM** donated by supporters of Crab during the Crowdloan will earn a reward of about **25 CRING** per day immediately at the end of the auction.

* Rewards for a successful bid

  After successfully winning the slot, we will distribute a 240,000,000 CRING prize pool and a 6,000,000 RING prize pool.

* BTC Prize Lotto

  In addition to NFT rewards, We will also offer a Mystery BTC Super Prize hidden somewhere in the NFT land. Within 20 days after the parachain auction is finished, all players who get the Evolution Land NFT Legendary Package lucky draw will have a chance to win the BTC lotto prize!

More details in [Darwinia Crab’s Kusama Parachain Auction Strategy](https://darwinianetwork.medium.com/darwinia-crabs-kusama-parachain-auction-strategy-3f37cbfdfe4)

## How to contribute

### If your KSM is in your exchange account

* [Okex](./crab-crowdloan-okex.md)

* You can withdraw your KSM to your wallet. So, 

### If your KSM is in your wallet

* [Unstaking](./crab-crowdloan-howto-unstaking.md)

* [Contribute through our webpage](https://crab.network/plo)

* [Contribute through Polkadot.{js}](./crab-crowdloan-howto-polkadotjs.md)

### About

Anyone can create a new crowdloan campaign for a parachain slot. A campaign is configured as a range of slots (i.e. the duration the parachain will bid for), a cap, and a duration. The duration can last over several auctions, meaning that the team will not need to restart the campaign just because they do not secure a slot on their first attempt.

Each created campaign will have an index. Once a crowdloan campaign is open, anyone can participate by sending a special transaction that references the campaign's index. KSM used to participate must be transferable --- that is, not locked for any reason, including staking, vesting, and governance --- because they will be moved into a module-controlled account that was generated uniquely for this campaign.

> Important: All crowdloan contributions are handled by the Crowdloan module's logic where a campaign is identified by index, not by address. Never transfer KSM to an address in support of a campaign.

It is up to individual parachain teams to decide if and how they want to reward participants who forgo staking and choose to lock their KSM in support of the parachain's campaign. As one can imagine, rewards will take many forms and may vary widely among projects.

During some point of the crowdloan campaign the owner will upload the parachain data. Ideally, the owner does this before soliciting contributions to the campaign so that the contributors can verify it. The data can only be uploaded once during the course of the campaign and it will be what is deployed as the parachain's runtime. Of course, once the parachain is running it can always change via runtime upgrades (as determined through its own local governance).

If a crowdloan campaign is successful, that parachain will be on-boarded in Kusama. The collective KSM will be locked in that parachain's account for the entire duration that it is active (up to two years).

> The user's KSM will not leave their wallet (except for those hosted by the exchange). 

Participants will be able to reclaim their KSM in one of two ways:

- If the crowdloan campaign was successful, then the parachain will enter a retirement phase at the end of its lease. During this phase, participants can withdraw the KSM with which they participated.

- If the crowdloan campaign was not successful, then this retirement phase will begin at the campaign's configured end, and participants can likewise withdraw their KSM.

![crowdloan.png](./assets/crowdloan/crowdloan.png)

> Note that withdrawing KSM requires a transaction for each participant. Anyone can make the transactions, so a parachain team could free every participant's KSM in a batch. Tokens that are not withdrawn within a certain amount of time will go to the Kusama Treasury.

[More details in Kusama website](https://kusama.network/auctions)