---
id: crab-tut-create-account
title: Create an Account
sidebar_label: Create an Account
sidebar_position: 4
---

If you are a user who has never used the polkadot{.js} extension, please refer to the tutorial in the first part of this article; if you are a user who has used the old version of Apps, please refer to the second part of this article to migrate the old account. For technically-advanced users who are comfortable with the command line and compiling Rust code, you can use the subkey to create your account, please refer to the third part of this article, and it is not recommended for general users.

> NOTE: Not all old accounts need to be migrated, and accounts that have been imported into the polkadot{.js} extension do not need to be migrated, meanwhile, these accounts will not be displayed in the `Account Migration`.
> 

## Use Polkadot{.js} Extension

This part will walk you through the process of connecting your [polkadot{.js} extension](https://polkadot.js.org/extension/) to Crab Chain.

### Install the Polkadot{.js} Extension

For help with installation, you can follow the Getting Started with the polkadot{.js} extension guide from the [official polkadot{.js} extension documentation](https://github.com/polkadot-js/extension/blob/master/README.md). Once you have installed the polkadot{.js} extension, follow the account creation wizard. Make sure to store your mnemonic safely and do not share it with anyone. If you prefer, there is also a video tutorial that you can check out [here.](https://www.youtube.com/watch?v=sy7lvAqyzkY) When the polkadot{.js} extension is fully set up, you’ll have your address displayed at the top of the extension window.

### Connect to Apps

Once you have an account, you can enter [Apps](https://apps.darwinia.network/#/account) and connect to Crab Chain by clicking `Connect Wallet` on the right corner of the top, and you also can switch the chain connected by clicking and choosing through the button on the left upper.

## Migrate From Legacy Apps

If your accounts are in the old version and cannot be found in your polkadot{.js} extension, you can restore account JSON through `Account Migration` and add the JSON to polkadot{.js} extension.

- Go to [Apps](https://apps.darwinia.network/#/account), click `Export JSON` to download JSON file from `Account Migration`
- Add the JSON file to polkadot{.js} extension
  
  > Here is a [video tutorial](https://www.youtube.com/watch?v=sy7lvAqyzkY) that you can check out.


## Use Subkey

The Subkey is recommended for technically advanced users who are comfortable with command line and compiling Rust code. Subkey allows you to generate keys on any device that can compile the code. Subkey may also be useful for automated account generation, using an air-gapped device other than one running iOS or Android or other specific purposes. It is not recommended for general users.

To [install Subkey](https://substrate.dev/docs/en/ecosystem/subkey#more-subkey-to-explore), run:

```bash
$ curl https://getsubstrate.io -sSf | bash -s -- --fast
$ cargo install --force --git https://github.com/paritytech/substrate subkey
$ cargo build -p subkey
```

After installing Subkey successfully, run:

```shell
$ subkey -n substrate generate
```

You should see an output something like below- **save all of this information somewhere secure you will not be able to recover your account if you lose your phrase or seed.**

```text
Secret phrase `destroy vague trend estate person civil cattle lab hockey tooth error pigeon` is account:
  Network ID/version: substrate
  Secret seed:        0x58e57817a2ccfa696ed6c3735d4cc4646f894bf7daf51a94f0c4702a92e40710
  Public key (hex):   0x225ce1f9c178189d2a977a195f822ebbfb538b317f23f83ab35605fb009fa438
  Account ID:         0x225ce1f9c178189d2a977a195f822ebbfb538b317f23f83ab35605fb009fa438
  SS58 Address:       2owvscruh7PNbykGLMZPxHyjYdi1Ryanrm4PTxVKh85Ef8Dn
```

> If you previously created an account for other networks other than `substrate` or `crab network`, you need to derive the  correct `Address` from your previous  `secret phrase` or `secret seed`.  You can use `subkey -n substrate inspect "YOUR SECRET PHRASE HERE"` to obtain the Crab network-ID inclusive Address (SS58).

### Storing your key safely

> **DISCLAIMER: Key Security**
Your secret seed is the _only_ way to get access to your account. You must keep
the secret both secure and private. If you share you secret with anyone they
will be able to have full access to your account, including all of your funds.
The secret, for this reason, is a target from hackers and others with bad
intentions to steal your funds. We recommend a variety of account generation
methods that have various convienience and security tradeoffs. Please review
this page carefully before making your address so that you understand the risks
of the account generation method you choose and how to properly mitigate them
in order to keep your funds safe.

The seed is your **key** to the account. Knowing the seed allows you, or anyone
else who knows the seed, to re-generate and control this account.

It is imperative to store the seed somewhere safe, secret, and secure. If
you lose access to your account, you can re-create it by entering the seed. This
also means that somebody else can have control over your account if they have
access to your seed.

For maximum security, the seed should be written down on paper or another non-digital device and stored in a safe place. You may also want to protect your seed from physical damage, as well (e.g. by storing in a sealed plastic bag to prevent water damage, storing it in a fireproof safe, etc.) It is recommended that you store multiple copies of the seed in geographically separate locations (e.g., one in your home safe and one in a safety deposit box at your bank).

You should definitely not store your seed on any kind of computer that has or may have access to the internet in the future.
