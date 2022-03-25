import type { VercelRequest, VercelResponse } from "@vercel/node";

function pangolinGrantConfig() {
  const config = require("./pangolin/config/grant.json");
  config.github.key = process.env.PANGOLIN_GITHUB_OAUTH_APP_KEY;
  config.github.secret = process.env.PANGOLIN_GITHUB_OAUTH_APP_SECRET;
  return config;
}

const pangolinGrant = require("grant").vercel({
  config: pangolinGrantConfig(),
  session: { secret: "pangolin-grant" },
});

const crabGrant = require('grant').vercel({
  config: crabGrantConfig(), session: {secret: 'crab-grant'}
})


function crabGrantConfig() {
  const config = require('./crab/config/grant.json');
  config.github.key = process.env.GITHUB_OAUTH_APP_KEY;
  config.github.secret = process.env.GITHUB_OAUTH_APP_SECRET;
  return config;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  console.log(`request url ${req.url}`);
  if ("/connect/github/pangolin" === req.url){
    await pangolinGrant(req, res);
  }else{
    await crabGrant(req, res);
  }
  
}
