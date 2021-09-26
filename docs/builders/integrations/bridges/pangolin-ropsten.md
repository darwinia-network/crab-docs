---
id: pangolin-bridge-ropsten
title: Ropsten Bridge
sidebar_position: 1
sidebar_label: Ropsten Bridge
---

## Pangolin > Ropsten

### Relay Contract

1. Relayer sends `Authority Set` change
2. Relayer listens to the `Authority Set` changed event

```
address: 0xD35Bb6F1bc1C84b53E0995c1830454AB7C4147f1
  topic: 0x91d6d149c7e5354d1c671fe15a5a3332c47a38e15e8ac0339b24af3c1090690f
```

### TokenIssuing Contract

User claims RING & KTON

```
address: 0x98fAE9274562FE131e2CF5771ebFB0bB232aFd25
```

## Pangolin < Ropsten

### Burn Contract

1. User destroys RING and KTON
2. Relayer listens to the burn event

```
address: 0x49262b932e439271d05634c32978294c7ea15d0c
  topic: 0xc9dcda609937876978d7e0aa29857cb187aea06ad9e843fd23fd32108da73f10
```
