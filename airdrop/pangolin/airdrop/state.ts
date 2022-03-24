import type {VercelRequest, VercelResponse} from '@vercel/node';
import {Octokit} from '@octokit/rest';


const Redis = require('ioredis');

export default async function (req: VercelRequest, res: VercelResponse) {
    res.setHeader('content-type', 'application/json');

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
    
    // const chainName = data.chain.toUpperCase().trim();
    // const chainName = 'PANGOLIN';
    // const cacheKey = `${chainName}-${user.id}`;

    // const record = await client.get(cacheKey);

    // // check already sent 
    // if (record != null) {
    //     res.statusCode = 400;
    //     const body = {
    //         err: 1,
    //         message: 'You have already received',
    //         data: {
    //             state: 'RECEIVED',
    //             time: record,
    //         }
    //     };
    //     res.end(JSON.stringify(body, null, 2));
    //     return;
    // }

    // check sending rules
    const ip = req.headers['x-forwarded-for'].toString();
    if (!ip) {
      res.statusCode = 403;
      const body = {
        err: 1,
        message: `Sorry, we can't find your ip address`
      };
      res.end(JSON.stringify(body, null, 2));
      return;
    }

    const chainName = 'PANGOLIN';
    const cacheKeyIp = `${chainName}-${user.id}-${ip}`;
    
    const recordIp = await client.get(cacheKeyIp);
    if (recordIp != null) {
      const lastClaimTime = +recordIp;
      const now = +new Date();
      if ((now - lastClaimTime) <=  1000 * 60 * 60 * 12) {
        res.statusCode = 429;
        const body = {
          err: 1,
          message: 'Please wait 12 hours to get dropped',
          data: {
            state: 'RATE_LIMIT_IP',
            time: lastClaimTime,
          },
        };
        res.end(JSON.stringify(body, null, 2));
        return;
      }
    }


    res.statusCode = 200;
    const body = {
        err: 0,
    };
    res.end(JSON.stringify(body, null, 2));
}


let _redis;

function redis() {
    if (_redis) return _redis;
    const config = require('../config/redis.json');
    config.url = process.env.REDIS_CONNECT_URL;
    _redis = new Redis(config.url);
    return _redis;
}

