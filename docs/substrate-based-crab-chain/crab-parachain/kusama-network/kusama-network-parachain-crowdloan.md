---
id: Parachain Crowdloan
sidebar_label: Parachain Crowdloan
sidebar_position: 3
title: Parachain Crowdloan
---

## Introduction

Crowdloan functionality was designed to help new parachains fundraise to get a “slot” on the Kusama network. These slots are competitive, which means many projects may need to lock a large number of tokens to secure the slot lease when they’re auctioned off. Crowdloans help continually bring fresh projects into the ecosystem by letting the community “back” a project without directly giving them control of funds.

For Kusama, the crowdloan is a way for new projects to garner the support they need to connect to the Kusama network as a parachain. Crowdloan is just one way for a project to raise KSM to bid. There are numerous other ways that a project can raise these tokens to bid in the parachain auction including private and public sales, ICOs, IDOs, and more.

The term itself can be misleading, since you’re not actually “loaning” funds to the parachain; rather, your crowdloan contributions (KSM tokens for Kusama project crowdloans) are locked into a Kusama account for a designated period of time (a “lock period”). Typically, during this lock period (or after), you are eligible to receive a reward. This reward is usually in the form of a native token from the project.

## Typical Process for a Crowdloan

1. The team creates a crowdloan campaign, setting a maximum of total allowed contributions and a campaign end date (to account for the possibility of losing one or more auctions, a campaign can last for several auctions), and invites their community to participate.
2. Crowdloan contributors initiate a special transaction allocating transferable KSM to the campaign’s index (this is different from a normal send transaction, contributors should NOT send KSM to an external account).
3. KSM contributions can be submitted throughout the duration of the crowdloan campaign or until an auction is won, up to the maximum amount of contributions set by the parachain team when creating the campaign.
4. If there are enough contributions to win an auction, the chain is automatically deployed at the start of the lease, and the ***full amount*** of KSM contributed to the campaign index will remain locked for the duration of the lease.
5. Crowdloaned KSM can be unlocked and returned to contributor’s control at the end of the lease period. In the event that a crowdloan campaign ends without the team winning an auction, contributors’ KSM can be unlocked at the end of the campaign.

## Features of the Crowdloan

Crowdloans present a way for users to help projects launch without jeopardizing their assets, as they are only locked temporarily. 

### Tokens are not accessible by the project

Development teams do not control the assets contributed to the crowdloan and have no access to tokens. Once contributed, they are locked on the Relay Chain. 

### Tokens are returned once the lease is over

Kusama has ‘slots’ for projects to participate in a crowdloan. Each of these slots on the network has an expiration date. Once the slot lease is over, users who participated receive back their initially locked assets.

### Parachains must prove their value again and again

When the lease expires, projects must find a way to renew their lease. For projects with immediate success, they can often do this using funds from their treasury. For others, they may need to hold another crowdloan or find another way to raise the funds they need to secure the slot again. This dynamic creates a situation where projects must constantly prove their value in order to retain their spot on the network.

### Long lease periods

Once your assets are locked (for up to one year on the Kusama network), there’s no way to pull them out if you want to do something else with them. They’re locked. Therefore, it’s important to consider your options carefully before choosing a crowdloan to back.

### Each Crowdloan is unique

Each crowdloan on the Kusama network has its own unique terms and conditions. Such as lease period, rewards pool, total genesis supply, hard cap, etc.

## FAQs

Crowdloans FAQ's , please check [this article](https://support.polkadot.network/support/solutions/articles/65000177342-crowdloans-faq-s).