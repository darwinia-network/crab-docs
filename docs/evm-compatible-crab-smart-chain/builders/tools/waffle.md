---
title: Waffle
sidebar_position: 7
description: Learn how to configure Waffle for testing Solidity smart contracts to either a locally running Darwinia development node or the Pangolin TestNet.
---

# Waffle

## Introduction

[Waffle](https://www.getwaffle.io/) is a popular development framework for testing Solidity smart contracts. Since Pangolin is Ethereum compatible, with a few lines of extra configuration, you can use Waffle as you normally would with Ethereum to develop on Pangolin.

## Configure Waffle to Connect to Pangolin

Assuming you already have a JavaScript or TypeScript project, install Waffle:

```
npm install ethereum-waffle
```

To configure Waffle to run tests against a Darwinia development node or the Pangolin TestNet, within your tests create a custom provider and add network configurations:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs
  defaultValue="JavaScript"
  values={[
    {label: 'JavaScript', value: 'JavaScript'},
    {label: 'TypeScript', value: 'TypeScript'},
  ]}>
  <TabItem value="JavaScript">

```js
describe ('Test Contract', () => {
  // Use custom provider to connect to Pangolin or Darwinia development node
  const pangolinProvider = new ethers.providers.JsonRpcProvider('https://pangolin-rpc.darwinia.network');
  const devProvider = new ethers.providers.JsonRpcProvider('http://localhost:9933');
})
```

  </TabItem>
  <TabItem value="TypeScript">

```typescript
describe ('Test Contract', () => {
  // Use custom provider to connect to Pangolin or Darwinia development node
  const pangolinProvider: Provider = new ethers.providers.JsonRpcProvider('https://pangolin-rpc.darwinia.network');
  const devProvider: Provider = new ethers.providers.JsonRpcProvider('http://localhost:9933');
})
```

  </TabItem>
</Tabs>

## Tutorial

If you are interested in a more detailed step-by-step guide on how to use Waffle, go to our specific tutorial about using [Waffle & Mars](../interact/waffle-mars/) on Pangolin.
