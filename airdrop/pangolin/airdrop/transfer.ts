import type {VercelRequest, VercelResponse} from '@vercel/node';
import { ApiPromise, WsProvider } from '@polkadot/api';
import {typesBundleForPolkadotApps } from "@darwinia/types/mix";
import {} from '@polkadot/api-augment';
import { Keyring } from "@polkadot/keyring";
import {Octokit} from '@octokit/rest';
import * as qs from 'qs';
import is from 'is_js';
// import Web3 from 'web3';

const Redis = require('ioredis');

const AMOUNT = 100;



// request
export default async function (req: VercelRequest, res: VercelResponse) {
  const ip = req.headers['x-forwarded-for'].toString();
  if (!ip) {
    res.statusCode = 403;
    const body = {
      err: 1,
      message: `Sorry, we can't find your ip address.`
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }
  // const

  const data = qs.parse(req.body);

  res.setHeader('content-type', 'application/json');
  
  // check data
  if (!data) {
    res.statusCode = 403;
    const body = {
      err: 1,
      message: 'Not have data'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  // check address
  if (is.not.truthy(data.address)) {
    res.statusCode = 403;
    const body = {
      err: 1,
      message: 'No address found, please type receiver address'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  let client;
  try{
      client = redis();
  }catch(e){
      res.statusCode = 501;
      const body = {
           err:1,
           message: 'Connection Redis failed',
           data:{
               state: ''
           }
      }
      res.end(JSON.stringify(body, null, 2));
      return;
  }

  // const cacheKeyIp = `IP-${ip}`;
  // const recordIp = await client.get(cacheKeyIp);
  // if (!recordIp) {
  //   const lastClaimTime = +recordIp;
  //   const now = +new Date();
  //   if ((now - lastClaimTime) <= 1000 * 60 * 60 * 12) {
  //     res.statusCode = 403;
  //     const body = {
  //       err: 1,
  //       message: 'Please wait for the restriction to be lifted',
  //       data: {
  //         state: 'RATE_LIMIT_IP',
  //         time: lastClaimTime,
  //       },
  //     };
  //     res.end(JSON.stringify(body, null, 2));
  //     return;
  //   }
  // }


  // query github account info
  let user;
  try {
    const cookies = req.cookies;
    const accessToken = cookies['x-access-token'];
    const octokit = new Octokit({
      auth: accessToken,
    });
    const {data} = await octokit.request("/user");
    user = data;
  } catch (e) {
    res.statusCode = 401;
    const body = {
      err: 1,
      message: 'Authorization failed. please try login again',
      data: {
        state: 'NO_LOGIN',
      }
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  // check account registry time
  // const created_at = new Date(user.created_at);
  // const end = new Date('2021-12-30T00:00:00Z');
  // if (+created_at > +end) {
  //   res.statusCode = 403;
  //   const body = {
  //     err: 1,
  //     message: 'Your account does not meet the rules'
  //   };
  //   res.end(JSON.stringify(body, null, 2));
  //   return;
  // }


  // const chainName = data.chain.toUpperCase().trim();
  const chainName = 'PANGOLIN';
 // const cacheKeyClaimed = `${chainName}-${user.id}`;

 // const recordClaimed = await client.get(cacheKeyClaimed);

  // check already sent
  // if (recordClaimed != null) {
  //   res.statusCode = 403;
  //   const body = {
  //     err: 1,
  //     message: 'You have already received',
  //     data: {
  //       state: 'RECEIVED',
  //       time: recordClaimed,
  //     }
  //   };
  //   res.end(JSON.stringify(body, null, 2));
  //   return;
  // }

  try {
    // transfer
    const result = await transfer(chainName, data.address);
    if (result == null) {
      res.statusCode = 403;
      const body = {
        err: 1,
        message: 'Transfer failed. please connect team',
      };
      res.end(JSON.stringify(body, null, 2));
      return;
    }
    if (result instanceof String || (typeof result == 'string')) {
      res.statusCode = 403;
      const body = {
        err: 1,
        message: result,
      };
      res.end(JSON.stringify(body, null, 2));
      return;
    }

    // put sent time for user
    const now = +new Date();
    const cacheKeyClaimed = `${chainName}-${user.id}-${ip}`
    await client.set(cacheKeyClaimed, now);
    // await client.set(cacheKeyIp, now);

    res.statusCode = 200;
    const body = {
      err: 0,
      data: result,
    };
    res.end(JSON.stringify(body, null, 2));

  } catch (e) {
    res.statusCode = 403;
    const body = {
      err: 1,
      message: 'Transfer failed: ' + e.message,
    };
    res.end(JSON.stringify(body, null, 2));
  }
}


async function transfer(chainName: String, address: String): Promise<TransferReceipt | String | null> {
  chainName = chainName.toUpperCase();
  // pangolin todo 
 
  const chain = require('../config/chain.json').pangolin_smart
  chain.seed = process.env.PANGOLIN_SMART_SEED;
  const wsProvider = new WsProvider(chain.endpoint);
  
 
  console.log(`Check account ${chain.address} balance`);
  
  let hash;
  try{
      const  api = await ApiPromise.create({provider: wsProvider, typesBundle: typesBundleForPolkadotApps});
      const {nonce, data: balance} = await api.query.system.account(chain.address);
      console.log(`free balance ${balance.free} of address ${chain.address}`)
      if (balance.free <= AMOUNT*1000000000) {
        return "All airdrops have ended"
      }

      console.log(`Transfer chain ${chainName} to ${address.toString()}`);

      const keyring = new Keyring({ type: 'sr25519' });
      const faucetAccount = keyring.addFromUri(chain.seed);

      await  api.tx.balances.transfer(address.toString(), AMOUNT*1000000000)
      .signAndSend(faucetAccount, ({ events = [], status }) => {
        console.log(`Current status is ${status.type}`);

        if (status.isInBlock){
            hash = status.asInBlock.toHex();
            console.log('transaction with hash ' + status.asInBlock.toHex());

        }
        if (status.isFinalized) {
          console.log(`Transaction included at blockHash ${status.asFinalized}`);
          // Loop through Vec<EventRecord> to display all events
          // events.forEach(({ phase, event: { data, method, section } }) => {
          //   console.log(`\t' ${phase}: ${section}.${method}:: ${data}`);
          // });
        }
      });

  }catch(err){
    console.error(err);
    return 'Failed to sign transactions: ' + err.message;
  }
   
  return {tx: hash, preview: `https://pangolin.subscan.io/extrinsic/${hash}`,}



  // switch (chainName) {
  //   case 'CRAB':
  //     return await _transferCrab(address);
  //   default:
  //     return `Not support this chain: ${chainName}`;
  // }


}


// async function _transferCrab(address: String): Promise<TransferReceipt | String> {
//   const web3 = crabSmartApi();
//   const chain = require('../config/chain.json').crab_smart;
//   chain.seed = process.env.CRAB_SMART_SEED;

//   let receipt;
//   try {
//     const balanceFrom = web3.utils.fromWei(
//       await web3.eth.getBalance(chain.address),
//       'ether'
//     );
//     // const balanceTo = web3.utils.fromWei(
//     //   await web3.eth.getBalance(address.toString()),
//     //   'ether'
//     // );
//     if (balanceFrom == null) {
//       return 'Not have more balance to transfer';
//     }
//     if (+balanceFrom <= AMOUNT) {
//       return 'All airdrops have ended';
//     }

//     const tx = await web3.eth.accounts.signTransaction({
//       from: chain.address,
//       to: address.toString(),
//       value: web3.utils.toWei(AMOUNT.toString(), 'ether'),
//       gas: 40000,
//     }, chain.seed);

//     receipt = await web3.eth.sendSignedTransaction(tx.rawTransaction);
//   } catch (err) {
//     console.error(err);
//     return 'Failed to sign transactions: ' + err.message;
//   }
//   const hash = receipt.transactionHash;

//   return {tx: hash, preview: `https://crab.subview.xyz/tx/${hash}`,}
// }





let _redis;

function redis() {
  if (_redis) return _redis;
  const config = require('../config/redis.json');
  config.url = process.env.REDIS_CONNECT_URL;
  _redis = new Redis(config.url);
  return _redis;
}


// let _crabSmartApi;

// function crabSmartApi(): Web3 {
//   if (_crabSmartApi) return _crabSmartApi;

//   const chain = require('../config/chain.json').crab_smart;
//   chain.seed = process.env.CRAB_SMART_SEED;
//   _crabSmartApi = new Web3(chain.endpoint);
//   return _crabSmartApi;
// }


class TransferReceipt {
  tx: String;
  preview: String;
}
