---
id: crab-parameters
title: 网络参数
sidebar_label: 网络参数
sidebar_position: 3
---

> 本节内容旨在说明 Crab 网络的一些关键参数， 全部参数请查询 [Runtime File Setting](https://github.com/darwinia-network/darwinia/blob/master/runtime/crab/src/lib.rs)。

## 共识机制

| 参数          | 机制   |
| ------------- | ------|
| **区块生成**   | BABE    |
| **链一致性**  | GRANDPA |

## 共识参数设置

| Crab     | 时长     | Slots |
| -------- | ---------| ----- |
| Block    | 6 秒     | 1     |
| Epoch    | 1 小时    | 600   |
| Era      | 6 小时    | 3600 |

## Identity

| Parameter                                        | Value     | Description                                                  |
| ------------------------------------------------ | --------- | ------------------------------------------------------------ |
| Required Bond Per Identity                       | 10 CRING  | Bond required to store IDs on-chain.                         |
| Required Bond Per Each Additional Identity Field | 2.5 CRING | Bond required to store additional IDs on-chain               |
| Sub-Account Deposit                              | 2 CRING   | Amount required to deposit in order to create a sub account. |
| Maximum Sub-Accounts                             | 100       | The maximum number of sub account an account may have.       |

**A maximum of one block per slot can be in a chain.*

## 验证人相关

| Darwinia                | Time                               | Slots                                                      | Description                                                                                                                                      |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Validator Slots         | 7                                  | Initial slots for active validators, gradually increasing. |                                                                                                                                                  |
| Term duration           | 6 hours                            | 3,600                                                      | The time for which a validator is in the set after being elected. Note,  this duration can be shortened in the case that a validator misbehaves. |
| Nomination period       | 6 hours                            | 3,600                                                      | Every 6 hours, a new validator set is elected according to Phragmen's method.                                                                    |
| Bonding duration        | 14 days                            | 201,600                                                    | How long until your funds will be transferrable after unbonding.                                                                                 |
| Slash defer duration    | 14 days                            | 201,600                                                    | Prevents overslashing and validators "escaping" and getting their nominators slashed with no repercussions to themselves                         |
| Slash Cancellation Vote | Requires 3/4 of Council to Approve |                                                            |                                                                                                                                                  |

## 治理 

| Democracy        | Time   | Slots   | Description                                                                                                                                                  |
| ---------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Voting period    | 7 days | 100,800 | How long the public can vote on a referendum.                                                                                                                |
| Launch period    | 7 days | 100,800 | How long the public can select which proposal to hold a referendum on. i.e., Every week, the highest-weighted proposal will be selected to have a referendum |
| Enactment period | 8 days | 115,200 | Time it takes for a successful referendum to be implemented on the network.                                                                                  |

| Council       | Time  | Slots | Description                                                          |
| ------------- | ----- | ----- | -------------------------------------------------------------------- |
| Term duration | 1 day | 3,600 | The length of a council member's term until the next election round. |
| Voting period | 1 day | 3,600 | The council's voting period for motions.                             |

## 技术委员会

| 技术委员会     | 时长    | Slots   | 描述                                                                                    |
| -------------| ------- | ------- | ---------------------------------------------------------------------------------------------- |
| 冷静期        | 7 天    | 100,800 | The time a veto from the technical committee lasts before the proposal can be submitted again. |
| 紧急投票期     | 3 小时  | 1,800   | The voting period after the technical committee expedites voting.                              |

## Treasury

| Parameter                   | Value                     | Description                                                                                                                        |
| --------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Budgeting Period**          | 6 days                    | When the treasury can spend again after spending previously.                                                                       |
| Proposal Bond               | 5% and minumum 1000 CRING | The amount required to bond in order to propose a treasury spend. If approved, it is returned, if the proposal fails, it is burnt. |
| Burn unspent treasury funds | Off                       | This deactivates a burn of all  unspent treasury funds at the end of a budgeting period.                                           |

## SS58 地址格式

| 网络名称       | 网络 ID |
| ------------- | -------|
| Crab Network  | 42     |

## Seed Nodes

| Seed Nodes |
| ---------- |
| TBC        |
| TBC        |
| TBC        |
