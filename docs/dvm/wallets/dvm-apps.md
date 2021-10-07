---
id: dvm-apps
title: Apps
sidebar_label: Apps
sidebar_position: 1
---

As every DVM account has a corresponding Substrate address, the balance of a DVM account can be checked at [Web Apps](https://apps.darwinia.network/#/account).

## Address Conversion

The way to generate the corresponding Substrate address of a DVM account. See [address conversion](/dvm/overview/dvm-address.md).

For example, the DVM account address `0x6Be02d1d3665660d22FF9624b7BE0551ee1Ac91b` has a Substrate address `2qSbd2umtD4KmV2X6UEyn3zQ6jFT13jZEybLwc3hn5kiMmeD`.

## Query Balance

Click on `Toolbox` > `RPC Requests` > `balances` and enter:
    
- accountId： Substrate account id
- tokentype： 0 for RING balance, 1 for KTON balance

![dvm](../../assets/dvm/apps/d1.png)
