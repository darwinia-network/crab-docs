---
id: crab-tut-validator
title: 如何成为验证人
sidebar_label: 成为验证人
---

> - Staking 是基于 PoS（Proof of Stake/权益证明）的共识机制，代币持有人通过质押、投票、委托和锁定等行为获取收益。  
> - 在参与 Staking 之前，请确保有至少拥有 **1** 个 Crab 地址，如果您持有较多代币或对安全性要求较高，建议准备 **2** 个 Crab 地址。没有地址请参考：[如何创建账户](crab-tut-create-account.md)。  
> - Crab 地址内需准备少许 CRING，作为交易手续费。

### 运行验证人节点

你可以选择下载好的可执行文件或者 Docker 的方式运行自己的验证人节点。

- 本地启动验证人节点

  ```bash
  $ ./darwinia \
    --base-path <YOUR_DATA_DIR> \
    --name <YOUR_NODE_NAME> \
    --chain crab \
    --validator \
    --rpc-methods=Unsafe
  ```

> 请确保带有 `--rpc-methods=Unsafe` 参数，为接下来生产 `session keys` 做准备。

- Docker 启动验证人节点

  ```bash
  $ docker run -it \
    -v <YOUR_DATA_DIR>:/data \
    -p <YOUR_NODE_HTTP_PORT>:9933 \
    quay.io/darwinia-network/darwinia:vx.x.x \
      --base-path /data \
      --name <YOUR_NODE_NAME> \
      --chain crab \
      --validator \
      --rpc-methods=Unsafe \
      --rpc-external \
      --rpc-cors all
  ```

> 请确保带有 `--rpc-methods=Unsafe --rpc-external --rpc-cors` 参数，为接下来生产 `session keys` 做准备。


### 生成 session keys

节点运行成功后，执行如下命令：

```sh
$ curl http://127.0.0.1:9933 -H "Content-Type:application/json;charset=utf-8" -d '{ "jsonrpc":"2.0", "id":1, "method":"author_rotateKeys", "params": []}'
```

如果没有问题，那么会返回类似下面的结果：

```json
{
  "jsonrpc":"2.0",
  "result":"0xba99ecfb4a87357a44ee3765cf617a6d81adf8f43e522db52e348d2e9d45ccde12d53d562e14bb18523fbc3032b786f44b2b92340f4756386d4baec68bbfb882bbaccce1440c84d7f5b67c8ecb956345130d5dbd07adfeba3d9482f95d9dec6c68d085323e61590f850c38244dd2d2bc4055548d9edfd0471f47da7667c17fe8",
  "id":1
}
```

result 就是新生成的属于该节点的 session keys。下面会用到。

### 质押

进入 [Darwinia Web Wallet](https://apps.darwinia.network)，点击左侧 `抵押` 栏目，点击 `开始 Staking`

![nominator](assets/tut/staking-norminator/1.png)

填入参数

![nominator](assets/tut/staking-norminator/2.png)

`资金账户` 保管资金的账号，参与 Staking 的代币将来自这个账户，此账户的操作多与资金变动相关。

`控制账户` 管理 Staking 其他操作的账号，如参与投票、参与验证等。

> `资金账户` 和 `控制账户` 可设置为同一账户，如果您持有较多代币或对安全性要求较高，建议此处设置为不同账号。  

`冻结数量` 参与 Staking 的代币数量，这部分代币将被暂时冻结，解冻需要 **14** 天的解冻期；您可以选择冻结 CRING 或 CKTON。

`收益账号` 接收 Staking 收益的账号

`冻结期限` 可选项；将 CRING 承诺冻结 **3-36** 个月，可以获得额外的 CKTON 奖励。(承诺锁定需接受用户条款)

> 如提前赎回有承诺期限的 CRING，需要支付获得奖励 **3** 倍的 CKTON 惩罚 (在 CKTON 不足的情况下，不可以使用 CRING 来代缴罚金)。

填写好 Staking 参数后，请点击 `冻结`，签名并提交

![nominator](assets/tut/staking-norminator/3.png)

### 参选验证人

点击 `session 账号`，输入刚刚生成的 session keys，点击 `设置session keys` 提交。

> session keys 务必填写真实数据，否则会导致漏块，从而收到经济惩罚。

![validator](assets/tut/validator/v1.png)

确认无误后，点击「签名并提交」

![validator](assets/tut/validator/v2.png)

> 验证人和提名人的身份是互斥的，不可并存。如果您正在提名其他验证人，需要取消提名操作后，再进行后续的操作。

点击 `验证`，开始设置验证人参数

`奖励佣金百分比` 设置本节点优先分配收益的比重，范围为 **0-100%**。（例：如设置了 **5%** 的奖励佣金，本节点将优先获得节点收益的 **5%**，剩下 **95%** 的节点收益，将依据验证人和投票人抵押的金额，按比例分配；也就是说，`验证人的收益 = 节点奖励佣金 + 抵押奖励分成`）

![validator](assets/tut/validator/v3.png)

确认无误后，点击 `签名并提交`

![validator](assets/tut/validator/v4.png)

去 `浏览器` 查看当前验证人的相关信息

![validator](assets/tut/validator/v5.png)

> 参选验证人后会进入「候选」队列，在进入下一个 era 的时刻参与选举。

**(可选步骤) 重启正在运行的 validator 节点**

   为了安全起见，最好去掉 rpc unsafe 相关的参数后重启节点：

  ```bash
  ./darwinia \
    --base-path <YOUR_DATA_DIR> \
    --name <YOUR_NODE_NAME> \
    --chain crab \
    --validator
  ```

  ```bash
  docker run -it \
    -v <YOUR_DATA_DIR>:/data \
    quay.io/darwinia-network/darwinia:vx.x.x \
      --base-path /data \
      --name <YOUR_NODE_NAME> \
      --chain crab \
      --validator
  ```

## 其他 Staking 操作

Staking 还有一些其他操作，感兴趣的朋友，可以自行探索，列举如下：

![validator](assets/tut/validator/v6.png)

`停止提名` 取消所有投票。

`质押`  增加 Staking 冻结的代币，用来获得更多的票权（power）。

`解除质押` 解冻 Staking 的代币，与此同时票权（power）也会按比例减少。

> 请注意：取消抵押需要 **14** 天的解冻期，处于解冻期内的代币不能进行任何操作，请谨慎处理。

`收益历史` 去 Subscan 浏览器查看历史收益记录。

`领取收益` 手动领取已获得的收益，收益将以 era 为单位发放。

> 请注意：收益会保存 **56** 个 era（约 **56** 天），超期将无法领取。

![validator](assets/tut/validator/v7.png)

`领取收益` 手动领取已获得的收益，收益将以 era 为单位发放。

`质押更多资金` 增加 Staking 冻结的代币，用来获得更多的票权（power）。

`解除质押资金` 解冻 Staking 的代币，与此同时票权（power）也会按比例减少。

`冻结转锁定` 将冻结的 Staking 代币锁定，并选择锁定期限，可以获得额外的氪石奖励。

`撤销解冻` 将解冻中的资产重新冻结以恢复票权（power）。

`更改控制账户` 更改用于管理 Staking 其他操作的账号，如参与投票、参与验证等。

`更改收益账号` 更改用于接收 Staking 收益的账号。

`设置 session key` 更改 session key，请谨慎操作。

`设置链上身份` 设置您的个人信息，如昵称、邮箱、网站、twitter、riot 等信息，其他用户可查看此信息并联系您。
