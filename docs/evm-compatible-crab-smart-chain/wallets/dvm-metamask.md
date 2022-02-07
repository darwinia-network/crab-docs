---
id: dvm-metamask
title: Metamask
sidebar_label: Metamask
sidebar_position: 2
---

MetaMask is the most widely used wallet in the Ethereum ecosystem. We have deployed the DVM module in Crab Network and other testnets, which provides Ethereum compatibility. Users can connect to Crab Network and other testnets with MetaMask. There is a corresponding standard Substrate address for every Ethereum-like address, which is called a DVM address. Both addresses point to the same account but are used in different scenarios.

> Detailed explanation of address formats can be found in [DVM Address](../builders/advanced/dvm-address.md).

### Connect with Metamask

1. Install the Metamask plugin, download and install it yourself. 
2. Add a custom network, here is an example of adding a Pangolin test network, different networks have different configuration parameters.
+ Click `Custom RPC`.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-01.png)

+ Add Pangolin Test Network configuration parameters.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-02.png)

+ After the connection is successful, as shown in the figure below.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-03.png)

### Network Configuration

The different network configuration are as follows.

| Network  | RPC URL                             | ChainID | Currency| Block Explorer URL |
| ---------| ------------------------------------ | -------| --------|---------- |
| Pangolin | https://pangolin-rpc.darwinia.network | 43     | PRING   | https://pangolin.subscan.io/ |
| Crab     | https://crab-rpc.darwinia.network     | 44     | CRAB   | https://crab.subscan.io/      |   

### Address Conversion

Use Apps tool to generate the Substrate address corresponding to the DVM address.
1. Copy the DVM address.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-04.png)

2. Address conversion can be done by using the [Apps](https://apps.darwinia.network/#/toolbox/dvmaddress) tool. Click on `Toolbox`, `DVM Address`, enter the address of the copied DVM account.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-05.png)

3. This address is the only Substrate address corresponding to the DVM address. Click the upper right corner to copy the Substrate address.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-06.png)

4. You can apply for the test token from the Faucet through the generated Substrate address. For details, please refer to the following.

### Apply for the test token

1. Join the Telegram group named ["Darwinia Faucet Official"](https://t.me/darwiniafaucet_official).

2. Send `/faucet@darwinia_faucet_bot`.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-07.png)

3. Send `Faucet`+ the copied Substrate address corresponding to the DVM account address.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-08.png)

4. You can open the link of the Darwinia_bot to check the transaction on Subscan. 

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-09.png)
![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-10.png)

5. Since this Substrate address corresponds to a specific DVM address, when the test token is sent to the Substrate address, the corresponding DVM address can be managed through Metamask to achieve the purpose of managing this Substrate address.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-11.png)

6. When querying the DVM address through Subscan, you can see its corresponding Substrate address at the same time.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-12.png)

### Transfer

Demonstrating how to use Metamask to transfer and query transactions in a DVM on the Pangolin test network.

1. Click `Send` and enter the transfer parameters. 

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-13.png)
![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-14.png)

2. Click `Confirm` to send transaction.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-15.png)

3. The transfer executed successfully.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-16.png)

4. View details of the transaction execution in your browser.

![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-17.png)
![dvm](../../assets/evm-compatible-crab-smart-chain/wallets/metamask-18.png)
