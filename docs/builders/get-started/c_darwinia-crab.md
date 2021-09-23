---
title: Connect to Crab
description: How to connect to crab network.
---

# Connect to Crab

## Introduction

Darwinia Crab Network (Crab) is a canary network with real economic value for Darwinia, and its positioning is similar to Polkadot's Kusama Network.

Crab has two endpoints available for users to connect to: one for HTTPS and one for WSS.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="wss"
  values={[
    {label: 'WSS Entry', value: 'wss'},
    {label: 'HTTPS Entry', value: 'https'},
  ]}>
  
  <TabItem value="https">

```
https://crab-rpc.darwinia.network
```

  </TabItem>
  <TabItem value="wss">

```
wss://crab-rpc.darwinia.network
```
    
   </TabItem>
</Tabs>

## Features

- Compatible with EVM, Ethereum contracts, Ethereum contract tools.
- Support ethereum-substrate bi-directional bridge