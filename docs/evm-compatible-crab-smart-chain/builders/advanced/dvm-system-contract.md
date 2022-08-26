---
id: dvm-system-contract
title: System contracts
sidebar_label: System contracts
sidebar_position: 2
---

System contract is a special smart contract with a fixed contract address, similar to an ethereum pre-compiled contract.

The system contracts are deployed in various networks as follows.

## For Pangolin Smart Chain

Ethereum compatible:

- `0x0000000000000000000000000000000000000001`: ECRecover
- `0x0000000000000000000000000000000000000002`: Sha256
- `0x0000000000000000000000000000000000000003`: Ripemd160
- `0x0000000000000000000000000000000000000004`: Identity
- `0x0000000000000000000000000000000000000005`: Modexp
- `0x0000000000000000000000000000000000000006`: Bn128Add
- `0x0000000000000000000000000000000000000007`: Bn128Mul
- `0x0000000000000000000000000000000000000008`: Bn128Pairing
- `0x0000000000000000000000000000000000000009`: Blake2F

Darwinia dedicated:

- `0x0000000000000000000000000000000000000400`: StateStorage
    - This contract is used to get the storage values from substrate modules by storage key.
    - Function signature: `state_storage(bytes)`
    - Params: the substrate storage key
- `0x0000000000000000000000000000000000000401`: Dispatch
    - This contract is used to dispatch the substrate dispatch calls.
    - Function signature: `(bytes)`
    - Params: scale encoded substrate dispatch call
- `0x0000000000000000000000000000000000000402`: KTON
    - KTON contract which compatible with the Ethereum ERC20 protocol.

## For Crab Smart Chain

Ethereum compatible:

- `0x0000000000000000000000000000000000000001`: ECRecover
- `0x0000000000000000000000000000000000000002`: Sha256
- `0x0000000000000000000000000000000000000003`: Ripemd160
- `0x0000000000000000000000000000000000000004`: Identity
- `0x0000000000000000000000000000000000000005`: Modexp
- `0x0000000000000000000000000000000000000006`: Bn128Add
- `0x0000000000000000000000000000000000000007`: Bn128Mul
- `0x0000000000000000000000000000000000000008`: Bn128Pairing
- `0x0000000000000000000000000000000000000009`: Blake2F

Darwinia dedicated:

- `0x0000000000000000000000000000000000000400`: StateStorage
    - This contract is used to get the storage values from substrate modules by storage key.
    - Function signature: `state_storage(bytes)`
    - Params: the substrate storage key
- `0x0000000000000000000000000000000000000401`: Dispatch
    - This contract is used to dispatch the substrate dispatch calls.
    - Function signature: `(bytes)`
    - Params: scale encoded substrate dispatch call
- `0x0000000000000000000000000000000000000402`: KTON
    - KTON contract which compatible with the Ethereum ERC20 protocol.