---
id: crab-crowdloan
title: Kusama 平行链拍卖众贷
sidebar_label: 众贷
---

Kusama 允许平行链以去中心化的方式筹集 KSM。

## 你能获得什么？

KSM 持有者可以将其通证锁定在 Crowdloan 上一段时间（48周），以帮助 Crab 网络拍卖插槽，作为这些 KSM 持有者的回报，参与者将获得 CRING、RING、NFT 、BTC 作为奖励。

我们会为支持 Crab 网络的用户提供 RING 和 CRING 的代币奖励，以及进化星球建立在 Crab 网络上的 哥伦布大陆、建立在 Heco 网络上的拂晓大陆的 NFT（包括土地、钻头、使徒）奖励。

我们的超级大奖是 1 枚 BTC，最幸运的一位用户可以在获取的土地 NFT 中发现到这枚 BTC 超级“盲盒”大奖。

通过合作交易所支持 Crab 网络的用户也可以获得这些奖励。

* 保底奖励

  用户每支持 1 KSM，可以在竞拍结束后（无论该轮竞拍是否成功）获得参与众贷期间每日 25 CRING（APY: 15%）的基础奖励。CRING 无锁定期，众贷结束时统一发放。

* 成就奖

  达尔文 Crab 竞拍成功，获得插槽时， 成就奖有总计 240,000,000 CRING 及 6,000,000  RING 的奖池，由支持者按照贡献比例分享。

  30% 立即发放，70% 每周线性释放，为期 48 周。

* BTC 乐透大奖

  除了 NFT 奖励外，还有一枚 BTC 的超级大奖藏在大陆的地块中，在拍得平行链后 20 天內，所有参与抽奖并抽中地块的玩家都有机会获得 BTC 乐透大奖～。

更多详情请见： [Kusama 卡槽竞拍计划](https://mp.weixin.qq.com/s/fvQIiQp0xqkgXY4bG8Mskw)

## 如何参与？

### 如果你的KSM在第三方平台的账户上

* [OKEx](./crab-crowdloan-howto-okex.md)

* [Gateio](./crab-crowdloan-howto-gateio.md)

* [Math cloud wallet](./crab-crowdloan-howto-math.md)

* [Hotbit](./crab-crowdloan-howto-hotbit.md)

当然，您可以将 KSM 提取到您的钱包中，然后在钱包中参与，请下看。

### 如果您的 KSM 在您的钱包中

1. [解绑](./crab-crowdloan-howto-unstaking.md)

2. 贡献

    * [通过我们的提供的网页](https://crab.network/plo)

    * [通过 Polkadot.{js}](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/parachains/crowdloan)

      * [教程](./crab-crowdloan-howto-polkadotjs.md)

    * [通过 Nutbox](https://polkadot.nutbox.io/#/crowdloan/kusama/parachain/2006)

      * [教程](https://www.notion.so/Crab-Slot-Auction-7710b022aa8647cca7d782ab90f2aa05)
      
      * [教程(TP)](https://www.notion.so/Crab-Slot-Auction-TP-b62746eb90684d6c8ff96f2e83bb3622)
      
    * [Bounce](https://ksm.bounce.finance/#/)

    * [通过 Atoken](https://atoken-plo.biliangwang.com/plo)


### 关于众贷

任何人都可以为平行链插槽创建新的众筹活动。活动被配置为一系列 slot、众贷上限和持续时间。

一旦众筹活动开启，任何人都可以通过一个特殊的交易来参与。用于参与的 KSM 必须是可转账的，也就是说，不会因任何原因被锁定，包括质押、归属和治理。

> Important: 所有众筹捐款都由众筹模块的逻辑处理，其中活动由索引而不是地址标识。切勿将 KSM 转账到某个地址。

如果众筹活动成功，该平行链将在 Kusama 中上线。筹集的 KSM 将在该平行链的整个活跃期间（大约 1 年，下图中的紫红色条）锁定在该平行链的账户中。

> Important: 用户的 KSM 不会离开他们的钱包（交易所托管的钱包除外）。

参与者将能够通过以下两种方式之一撤回他们的 KSM：

- 如果拍卖成功，那么平行链将在租约结束时进入 retirement 阶段。 在此阶段，参与者可以撤回他们参与的 KSM。

- 如果拍卖不成功，那么这个退出阶段将在众筹配置结束时开始，参与者同样可以撤回他们的 KSM（在浅紫色条的末尾，这是 Crab 的第一个众筹）。

![crowdloan.png](./assets/crowdloan/crowdloan.png)

[如果想了解众贷的更多细节，请看](https://kusama.network/auctions)

