import type { VercelRequest, VercelResponse } from '@vercel/node';

const grant = require('grant').vercel({
  config: grantConfig(), session: {secret: 'grant'}
})



function grantConfig() {
  const config = require('./config/grant.json');
  config.github.key = process.env.PANGOLIN_GITHUB_OAUTH_APP_KEY;
  config.github.secret = process.env.PANGOLIN_GITHUB_OAUTH_APP_SECRET;
  return config;
}

export default async function (req: VercelRequest, res: VercelResponse) {
  
  await grant(req, res)
}
