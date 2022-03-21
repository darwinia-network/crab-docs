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

For help with installation, you can follow the Getting Started with the polkadot{.js} extension guide from the [official polkadot{.js} extension documentation](https://github.com/polkadot-js/extension/blob/master/README.md). Once you have installed the polkadot{.js} extension, follow the account creation wizard. **Make sure to store your mnemonic safely and do not share it with anyone**. If you prefer, there is also a video tutorial that you can check out [here.](https://www.youtube.com/watch?v=sy7lvAqyzkY) When the polkadot{.js} extension is fully set up, you’ll have your address displayed at the top of the extension window.

### Connect to Apps

Once you have an account, you can enter [Apps](https://apps.darwinia.network/#/account) and connect to Crab Chain by clicking `Connect Wallet` on the right corner of the top, and you also can switch the chain connected by clicking and choosing through the button on the left upper.

## Migrate From Legacy Apps

If your accounts are in the old version and cannot be found in your polkadot{.js} extension, you can restore account JSON through `Account Migration` and add the JSON to polkadot{.js} extension.

- Go to [Apps](https://apps.darwinia.network/#/account), click `Export JSON` to download JSON file from `Account Migration`
- Add the JSON file to polkadot{.js} extension
  
  > Here is a [video tutorial](https://www.youtube.com/watch?v=sy7lvAqyzkY) that you can check out.


## Use Subkey

The Subkey is recommended for technically advanced users who are comfortable with command line and compiling Rust code. Subkey allows you to generate keys on any device that can compile the code. Subkey may also be useful for automated account generation, using an air-gapped device other than one running iOS or Android or other specific purposes. It is not recommended for general users. There is a tutorial that you can check out [The Subkey Tutorial](https://docs.substrate.io/v3/tools/subkey/).
