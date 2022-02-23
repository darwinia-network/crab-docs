---
id: crab-faqs-network-rpc
title: Network RPC
sidebar_label: Network RPC
sidebar_position: 3
---

You can connect to Crab or Pangolin networks either automatically or manually. 

## Add the Network RPC Automatically

Go to [https://docs.crab.network/](https://docs.crab.network/) and click the `Connect Wallet` on the right upper corner, then you can see the RPC configuration parameters of the Pangolin Test Network and Crab Network, click and then the corresponding network RPC will be added automatically.

## Add the Network RPC Manually

### Crab Network configuration parameters

<aside>

`Network Name` : Crab

`New RPC URL`: [https://crab-rpc.darwinia.network](https://crab-rpc.darwinia.network/)

`Chain ID`: 44

`Currency`: CRAB

`Block Explorer URL`: [https://crab.subscan.io/](https://crab.subscan.io/)

</aside>

### Pangolin Test Network configuration parameters

<aside>

`Network Name` : Pangolin

`New RPC URL`: [https://pangolin-rpc.darwinia.network](https://pangolin-rpc.darwinia.network/)

`Chain ID`: 43

`Currency`: PRING

`Block Explorer URL`: [https://pangolin.subscan.io/](https://pangolin.subscan.io/)

</aside>

## Public Endpoints

Crab-based networks have two endpoints available for users to connect to: one for HTTPS and one for WSS.

The endpoints in this section are for development purposes only and are not meant to be used in production applications.

### HTTPS

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="https"
  values={[
    {label: 'OnFinality', value: 'https'},
  ]}>

  <TabItem value="https">

```
https://darwinia-crab.api.onfinality.io/public/
```

  </TabItem>

</Tabs>


### WSS

<Tabs
  defaultValue="wss"
  values={[
    {label: 'OnFinality', value: 'wss'},
  ]}>

  <TabItem value="wss">

```
wss://pangolin-rpc.darwinia.network
```

  </TabItem>

</Tabs>