---
id: crab-faqs
title: FAQs
sidebar_label: FAQs
sidebar_position: 5
---

# What is the difference between the address formats in Crab network?

You will find different address formats(account formats) in the blockchain domain, which is sometimes confusing to users. In Crab, there are two address formats but they come in three names in different contexts.

## Substrate Address

Substrate-based blockchains such as Polkadot and Crab adopt the address format of SS58, which is usually referred to as ***Substrate address***.

## Smart Address

Smart Contract-based blockchains adopt the address format of Ethereum format address, a 42-character hexadecimal address that starts with "0x". In our documentation, we name this address format as ***Smart address***.

## DVM Address

The address will not change if you switch to other networks on MetaMask. For example, when we try to connect to the Crab Network, which is ***Ethereum-compatible***, you will see the address stays the same, and that is what we call a ***DVM address.*** 

> Example: When we connect to ***Ethereum Mainnet***, the displayed address is `0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5`.
> 

![01](../assets/crab-network/crab-faqs-address-format-01.png)

> And if we switch network to ***Crab***, the displayed address is also `0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5`. And this address is a ***Smart address*** first.
> 

![02](../assets/crab-network/crab-faqs-address-format-02.png)

> When we go to the [Apps](https://apps.darwinia.network/#/toolbox/dvmaddress), switch to ***Crab*** network, click the `Toolbox`, and paste the smart address `0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5` to convert it into a substrate address. 
The address `5ELRpquT7C3mWtjesm99Kqzm4yHZ66uXnJXPNKLBcc89aTHS` is a ***Substrate address***. This substrate address is unique and can only be converted from this ***Smart address*** `0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5`. A smart address that has a corresponding substrate address within the same chain is what we call a ***DVM address***. In this case, this address `0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5` can be called a DVM address.
> 

![03](../assets/crab-network/crab-faqs-address-format-03.png)

The DVM address format is consistent with that in Ethereum, so is the generation method. The difference is that each DVM address corresponds to a unique Substrate address. In other words, the DVM address is first an Ethereum address, but it also corresponds to a Substrate address. Since the DVM and the Ethereum virtual machines are compatible with the underlying specifications, users can use the wallets from the existing Ethereum ecosystem to manage their assets, such as Metamask. 

You can refer to the form below to facilitate understanding:

|  | Crab DVM Address | Crab Address  | Ethereum Address |
| --- | --- | --- | --- |
| Ethereum Address Format |               ✅ |            ❌ |                ✅ |
| Substrate Address Format |               ✅ |            ✅ |                ❌ |

For more details about the address formats in Darwinia, please refer [here](https://darwinianetwork.medium.com/build-on-darwinia-2-1-address-formats-in-darwinia-e964cc91fccc).