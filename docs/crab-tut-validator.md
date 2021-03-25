---
id: crab-tut-validator
title: How to become a validator
sidebar_label: Become a validator
---

> - Staking is a consensus mechanism based on PoS (Proof of Stake / Proof of Stake). Token holders obtain rewards and benefits through pledge, voting, delegation, and locking.  
> - Before participating in staking, please make sure you have at least **1** Darwinia address. If you hold more tokens or have higher security requirements, it is recommended to prepare **2** Darwinia addresses. If there is no address, please refer to: [How to create an account](crab-tut-create-account.md).  
> - A small amount of CRING must be prepared in Darwinia-Crab Network's address as fee. If you have no CRING, please refer to: [How to get free CRING through faucet](crab-tut-claim-cring.md).

### Run your validator node

You can choose either run node with execute file download before or in docker way. No matter which way you start, please make sure to include `--rpc-methods=Unsafe` in command line to prepare for the generation of session keys.

- Run validator node with existed node binary

  ```sh
  ./darwinia \
    --base-path <YOUR_DATA_DIR> \
    --name <YOUR_NODE_NAME> \
    --chain crab \
    --validator \
    --rpc-methods=Unsafe 
  ```

- Using docker

  ```bash
  docker run -it \
    -v <YOUR_DATA_DIR>:/data \
    -p <YOUR_NODE_HTTP_PORT>:9933 \
    -p <YOUR_NODE_WSS_PORT>:9944 \
    darwinianetwork/darwinia:vx.x.x \
        --base-path /data \
        --name <YOUR_NODE_NAME> \
        --chain crab \
        --validator \
        --rpc-methods=Unsafe
    ```
### Generate your session key

Run the command on the shell where your validator node is running:

```sh
$ curl http://127.0.0.1:9933 -H "Content-Type:application/json;charset=utf-8" -d \
'{
  "jsonrpc":"2.0",
  "id":1,
  "method":"author_rotateKeys",
  "params": []
}'
```

If there is no problem, a result similar to the following will be returned:

```json
{
  "jsonrpc":"2.0", "result":"0xba99ecfb4a87357a44ee3765cf617a6d81adf8f43e522db52e348d2e9d45ccde12d53d562e14bb18523fbc3032b786f44b2b92340f4756386d4baec68bbfb882bbaccce1440c84d7f5b67c8ecb956345130d5dbd07adfeba3d9482f95d9dec6c68d085323e61590f850c38244dd2d2bc4055548d9edfd0471f47da7667c17fe8",
  "id":1}
```

The result is what you need when setting the session key.

### Staking

Enter [Darwinia Wallet](https://apps.darwinia.network) and click the [Staking] column on the left , Click [Start staking].

![nominate-1-en](assets/nominate-1-en.png)

Fill in the staking parameters

![nominate-2-en](assets/nominate-2-en.png)

` Stash account` Account for stashing tokens. Tokens participating in staking will come from this account. The operations of this account are mostly related to changes in stash.

`Controller account`  The controller is the account that will be used to control any nominating or validating actions. Should not match another stash or controller.

> The `Stash account` and `Controller account` can be set to the same account. If you hold more tokens or have higher security requirements, it is recommended to set up different accounts here.

`Value bonded` The total amount of the stash balance that will be at stake in any forthcoming rounds (should be less than the total amount available).  This part of the tokens will be temporarily bonded. bonding takes 14 days to unbond; you can choose to bond CRING or CKTON.

`Payment destination` The destination account for any payment as either a nominator or validator.

`Bond period` Optional; bond CRING promise for 3-36 months to get additional CKTON rewards. (Promise to lock to accept user terms)

> If you unlock CRING in advance within the lock limit, you will be charged  a penalty of 3 times the CKTON reward (In the absence of sufficient CKTON, the CRING can not be used for payment of fines).

After filling in the staking parameters, please click [bond] and [submit]

![nominate-3-en](assets/nominate-3-en.png)

### To be Validator

Click [Set session keys] on this page, completing the generated session keys and submit.

> The session key must be filled with real data, otherwise it will result in missing blocks and be slashed.

![tut-validator-1](assets/tut-validator-1.png)

After confirming, click [sign and submit]

> The identities of the validator and the nominator are mutually exclusive and cannot coexist. If you are running a validator, you need to cancel the validator before proceeding with the nomination.

![tut-validator-2](assets/tut-validator-2.png)

Click [validate] and set the validator parameters

`Reward commission percentage` Set the proportion of the node's priority distribution of income, the range is 0-100. (Example: If a 5% reward commission is set, this node will first receive 5% of the node's revenue, and the remaining 95% of the node's revenue will be distributed in proportion to the amount of mortgages validated by the validator and nominator; Validator's income = node reward commission + mortgage reward share)

![tut-validator-3](assets/tut-validator-3.png)

After confirming, click [sign and submit]」

![tut-validator-4](assets/tut-validator-4.png)

Go to [staking scan] to view information about validators

![tut-validator-5](assets/tut-validator-5.png)

> The operation of validate will take effect after the first epoch of the next era. Prior to this, the validator will be in the [waiting] list.

**(Optional) Rerun your validator node**

For security, you need to remove the rpc unsafe parameters and re-run your node:

   ```bash
   ./darwinia \
      --base-path <YOUR_DATA_DIR> \
      --name <YOUR_NODE_NAME> \
      --chain crab \
      --validator
   ```

## Other Staking operations

There are other operations in staking for the following purposes:

![wiki-tut-validator-6-en](assets/wiki-tut-validator-6-en.png)

`Stop nomination` Cancels all nominees.

`Bond` & `Bond more` Adds bonded tokens for staking to obtain more power.

`Unbond` Unbond tokens for staking, and at the same time the power will be reduced proportionally.

> The 14-day bond period is required to unbond. Tokens that are in the bond period cannot be operated. Please be careful.

`Reward history` Go to Subscan explorer to view historical reward records.

`Claim reward` Manually claim the reward, and the reward will be distributed in units of era.

> Please note: 56 era (about 56 days) will be saved, and you will not be able to claim it if it expires.

![wiki-tut-validator-7-en](assets/wiki-tut-validator-7-en.png)

`Claim Reward` Manually claim the reward, and the reward will be distributed in units of era.

`Bond more funds` Adds bonded tokens for staking to obtain more power.

`Unbond funds` Unbond tokens for staking, and at the same time the power will be reduced proportionally. 

`Lock Extra` Add lock limit for bonded tokens to obtain KTON rewards.

`Rebond funds` Rebond the unbonding funds to earn power.

`Change controller account` Change the account  that will be used to control any nominating or validating actions. Should not match another stash or controller.

`Change reward destination` Change the destination account for any payment as either a nominator or validator.

`Set nominees` Re-nominate validator.

`Change session key` If you want to upgrade to become a validator, you need to fill in this item. 

`Set on-chain identity` Set your personal information, such as display, legal name, email, website, twitter and riot. Other users can view this information and contact you.
