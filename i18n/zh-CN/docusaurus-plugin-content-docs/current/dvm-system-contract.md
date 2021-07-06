---
id: dvm-system-contract
title: DVM 系统合约
sidebar_label: 系统合约
---

系统合约是一种特殊的用户智能合约，拥有固定的合约地址，类似于以太坊预编译合约。

系统合约在各网络部署情况如下：

## Pangolin 网络

| 合约           | 地址   |
| ------------- | -------|
| ECRecover     | 0x0000000000000000000000000000000000000001 |
| Sha256        | 0x0000000000000000000000000000000000000002 |
| Ripemd160     | 0x0000000000000000000000000000000000000003 |
| Identity      | 0x0000000000000000000000000000000000000004 |
| Transfer      | 0x0000000000000000000000000000000000000015 |

## Crab 网络

| 合约           | 地址   |
| ------------- | -------|
| ECRecover     | 0x0000000000000000000000000000000000000001 |
| Sha256        | 0x0000000000000000000000000000000000000002 |
| Ripemd160     | 0x0000000000000000000000000000000000000003 |
| Identity      | 0x0000000000000000000000000000000000000004 |
| WithDraw      | 0x0000000000000000000000000000000000000015 |

> Transfer 合约是 Withdraw 合约的超集，Crab 网络的 Withdraw 合约在未来会升级为 Transfer 合约。

## 合约说明

为了尽可能地兼容以太坊，为应用迁移减少负担，系统合约目前共包括两种类型，分别是兼容以太坊的预编译合约（ECRecover，Sha256，Ripemd160，Identity） 和 Pangolin 特有的预编译合约 Transfer。

### Transfer 合约

Transfer 则是 Pangolin 特有的预编译合约，合约地址 `0x0000000000000000000000000000000000000015`（预留地址给以太坊其他合约），用于 在 DVM 账户和 Substrate 账户之间进行价值转移。目前 Transfer 合约的主要功能有两个：

1. DVM PRING 资产转移到 Substrate 账户。
2. PKTON 资产在 DVM 和 Substrate 账户之间转移。

* PRING 资产转移

用户可以通过发交易到 Transfer 合约将资产从 DVM 账户转到 Substrate 账户。示例如下：

```js
{
    // `0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b` 转移 30 PRING 到 723908ee9dc8e509d4b93251bd57f68c09bd9d04471c193fabd8f26c54284a4b。
    ...
    const from = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b";
    // Withdraw Substrate Account
    const to = "723908ee9dc8e509d4b93251bd57f68c09bd9d04471c193fabd8f26c54284a4b";
    const createTransaction = await web3.eth.accounts.signTransaction(
	    {
		    from: from,
		    to: '0x0000000000000000000000000000000000000015',
		    gas: 10000,
		    data: to,
            // Withdraw Value
		    value: web3.utils.toWei("30", "ether"),
	    },
	    privKey
    );
    ...
}
```

说明:
1. `from`: 需要转移 PRING 资产的 DVM 账户
2. `to`: Transfer 合约地址，切记不可填错，否则资产无法找回
3. `data`: Substrate 账户地址
4. `value`: 资产金额

* PKTON 资产转移


同样，用户通过发交易到 Transfer 合约实现 PKTON 资产在 DVM 账户和 Substrate 账户之间转移。与 PRING 资产转移不同的是，PKTON 记账发生在 DVM 合约中，所以在进行资产转移之前，必须要部署一个 [WKTON](https://github.com/evolutionlandorg/token-contracts/blob/dev/src/WCKTON.sol) 合约，并记录该合约地址（很重要，稍后会用到）。

1. PKTON 资产从 DVM 账户转移到 DVM WKTON 合约用户账户

交易格式如下：

```js
{
    // 将 DVM 账户 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b 的 PKTON 转移到 WKTON 合约 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b 用户账户内。
    const from = "0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b";
    const input = ethabi(transfer_and_call(WKTON_ADDRESS, TRANSFER_VALUE));
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: from,
            to: '0x0000000000000000000000000000000000000015',
            gas: 10000,
            data: input,
         },
        conf.privKey
     );
}
```

说明：

* `from`: DVM 账户地址
* `to`: Transfer 合约地址，切记不可填错，否则资产无法找回
* `data`: ethabi(transfer_and_call(WKTON_ADDRESS, TRANSFER_VALUE)) 的结果

2. PKTON 资产从 DVM WKTON 合约用户账户转移到 Substrate 账户

在 WKTON 合约中调用 `withdraw(bytes32 to, uint wad)`，填充 Substrate 账户，转账金额即可。   