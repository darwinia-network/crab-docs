---
id: dvm-system-contract
title: DVM System contract
sidebar_label: System contract
---

System contract is a special smart contract with a fixed contract address, similar to an ethereum pre-compiled contract.

The system contracts are deployed in various networks as follows.


## Pangolin Network

| Contract      | Address   |
| ------------- | ----------|
| ECRecover     | 0x0000000000000000000000000000000000000001 |
| Sha256        | 0x0000000000000000000000000000000000000002 |
| Ripemd160     | 0x0000000000000000000000000000000000000003 |
| Identity      | 0x0000000000000000000000000000000000000004 |
| Transfer      | 0x0000000000000000000000000000000000000015 |

## Crab Network

| Contract      | Address   |
| ------------- | ----------|
| ECRecover     | 0x0000000000000000000000000000000000000001 |
| Sha256        | 0x0000000000000000000000000000000000000002 |
| Ripemd160     | 0x0000000000000000000000000000000000000003 |
| Identity      | 0x0000000000000000000000000000000000000004 |
| WithDraw      | 0x0000000000000000000000000000000000000015 |

> The Transfer contract is a superset of the Withdraw contract, and the Crab network's Withdraw contract will be upgraded to the Transfer contract in the future.

## Contract Docs

In order to be as compatible as possible with Ethereum and reduce the burden for application migration, the system contract currently consists of two types, the pre-compiled contracts compatible with Ethereum(ECRecover, Sha256, Ripemd160, Identity) and the Pangolin-specific pre-compiled contract Transfer.

### Transfer Contract

Transfer is a Pangolin-specific pre-compiled contract with address `0x0000000000000000000000000000000000000015` (reserved for other Ethereum contracts) that is used to transfer value between DVM and Substrate account. The current Transfer contract has two main features:

1. Transfer PRING from DVM to Substrate account.
2. Transfer PKTON between DVM and Substrate account.

* PRING Transfer

Users can transfer asset from a DVM account to a Substrate account by sending a transaction to the Transfer contract. An example is as follows.

```js
{
    // `0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b` transfer 30 to 723908ee9dc8e509d4b93251bd57f68c09bd9d04471c193fabd8f26c54284a4b。
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

Description:
1. `from`: The DVM account
2. `to`: Transfer contract address, remember not to be wrong, otherwise the asset cannot be recovered
3. `data`: Substrate account address
4. `value`: Asset amount

* PKTON Transfer

Similarly, users transfer PKTON asset between a DVM account and Substrate account by sending transaction to the Transfer contract. Unlike PRING asset transfers, PKTON is booked in the DVM contract. Thus, before a PKTON asset transfer can be performed, a [WKTON](https://github.com/evolutionlandorg/token-contracts/blob/dev/src/WCKTON.sol) contract must be deployed in advance and the address of that contract must be recorded (important, and will be used later).

1. Transfer PKTON from DVM account to DVM WKTON contract user account

The transaction as follows:

```js
{
    // Transfer 0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b PKTON to WKTON contract  0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b use account.
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

Description:
* `from`: The DVM account
* `to`: Transfer contract address, remember not to be wrong, otherwise the  cannot be recovered
* `data`: The result of ethabi(transfer_and_call(WKTON_ADDRESS, TRANSFER_VALUE)) encode

2. Transfer PKTON asset from DVM WKTON contract user account to Substrate account

Just call `withdraw(bytes32 to, uint wad)` in the WKTON contract, fill in the Substrate account, and the transfer amount.