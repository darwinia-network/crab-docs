---
id: pangolin-bridge-ropsten
title: Ropsten 桥
sidebar_label: Ropsten 桥
---

## Rangolin > Ropsten

### Relay Contract

1. Relayer 发送 Authority Set 变更
2. Relayer 监听 Authority Set 变更

```
address: 0xD35Bb6F1bc1C84b53E0995c1830454AB7C4147f1
  topic: 0x91d6d149c7e5354d1c671fe15a5a3332c47a38e15e8ac0339b24af3c1090690f
```
	
### TokenIssuing Contract

用户 claim RING & KTON

```
address: 0x98fAE9274562FE131e2CF5771ebFB0bB232aFd25
```

## Rangolin < Ropsten

### Burn Contract

1. 用户 销毁 RING 和 KTON 的合约
2. Relayer 监听销毁事件

```
address: 0x49262b932e439271d05634c32978294c7ea15d0c
  topic: 0xc9dcda609937876978d7e0aa29857cb187aea06ad9e843fd23fd32108da73f10
```