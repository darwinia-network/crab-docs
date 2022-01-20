import type {VercelRequest, VercelResponse} from '@vercel/node';
import {Octokit} from '@octokit/rest';
import * as qs from 'qs';
import is from 'is_js';
import Web3 from 'web3';

const Redis = require('ioredis');

const AMOUNT = 10;



// request
export default async function (req: VercelRequest, res: VercelResponse) {
  const data = qs.parse(req.body);

  res.setHeader('content-type', 'application/json');

  // check data
  if (!data) {
    res.statusCode = 400;
    const body = {
      err: 1,
      message: 'Not have data'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  // check address
  if (is.not.truthy(data.address)) {
    res.statusCode = 400;
    const body = {
      err: 1,
      message: 'No address found, please type receiver address'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

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
      message: 'Authorization failed. please try login again'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  // check account registry time
  const created_at = new Date(user.created_at);
  const end = new Date('2021-12-30T00:00:00Z');
  if (+created_at > +end) {
    res.statusCode = 400;
    const body = {
      err: 1,
      message: 'Your account does not meet the rules'
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }



  const client = redis();
  // const chainName = data.chain.toUpperCase().trim();
  const chainName = 'CRAB';
  const cacheKey = `${chainName}-${user.id}`;

  const record = await client.get(cacheKey);

  // check already sent
  if (record != null) {
    res.statusCode = 400;
    const body = {
      err: 1,
      message: 'You have already received',
      data: {
        state: 'RECEIVED',
        time: record,
      }
    };
    res.end(JSON.stringify(body, null, 2));
    return;
  }

  try {
    // transfer
    const result = await transfer(chainName, data.address);
    if (result == null) {
      res.statusCode = 400;
      const body = {
        err: 1,
        message: 'Transfer failed. please connect team',
      };
      res.end(JSON.stringify(body, null, 2));
      return;
    }
    if (result instanceof String || (typeof result == 'string')) {
      res.statusCode = 400;
      const body = {
        err: 1,
        message: result,
      };
      res.end(JSON.stringify(body, null, 2));
      return;
    }

    // put sent time for user
    await client.set(cacheKey, +new Date());

    res.statusCode = 200;
    const body = {
      err: 0,
      data: result,
    };
    res.end(JSON.stringify(body, null, 2));

  } catch (e) {
    res.statusCode = 400;
    const body = {
      err: 1,
      message: 'Transfer failed: ' + e.message,
    };
    res.end(JSON.stringify(body, null, 2));
  }
}


async function transfer(chain: String, address: String): Promise<TransferReceipt | String | null> {
  const chainName = chain.toUpperCase();
  console.log(`Transfer chain ${chainName} to ${address}`);
  switch (chainName) {
    case 'CRAB':
      return await _transferCrab(address);
    default:
      return `Not support this chain: ${chainName}`;
  }
}


async function _transferCrab(address: String): Promise<TransferReceipt | String> {
  const web3 = crabSmartApi();
  const chain = require('../config/chain.safe.json').crab_smart;

  let receipt;
  try {
    const balanceFrom = web3.utils.fromWei(
      await web3.eth.getBalance(chain.address),
      'ether'
    );
    // const balanceTo = web3.utils.fromWei(
    //   await web3.eth.getBalance(address.toString()),
    //   'ether'
    // );
    if (balanceFrom == null) {
      return 'Not have more balance to transfer';
    }
    if (+balanceFrom <= AMOUNT) {
      return 'All airdrops have ended';
    }

    const tx = await web3.eth.accounts.signTransaction({
      from: chain.address,
      to: address.toString(),
      value: web3.utils.toWei(AMOUNT.toString(), 'ether'),
      gas: 40000,
    }, chain.seed);

    receipt = await web3.eth.sendSignedTransaction(tx.rawTransaction);
  } catch (err) {
    console.error(err);
    return 'Failed to sign transactions: ' + err.message;
  }
  const hash = receipt.transactionHash;

  return {tx: hash, preview: `https://crab.subview.xyz/tx/${hash}`,}
}





let _redis;

function redis() {
  if (_redis) return _redis;
  const config = require('../config/redis.safe.json');
  _redis = new Redis(`redis://:${config.password}@${config.host}:${config.port}`);
  return _redis;
}


let _crabSmartApi;

function crabSmartApi(): Web3 {
  if (_crabSmartApi) return _crabSmartApi;

  const chain = require('../config/chain.safe.json').crab_smart;
  _crabSmartApi = new Web3(chain.endpoint);
  return _crabSmartApi;
}


class TransferReceipt {
  tx: String;
  preview: String;
}
