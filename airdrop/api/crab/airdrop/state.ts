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
            data: {
                state: 'NO_LOGIN',
            }
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

