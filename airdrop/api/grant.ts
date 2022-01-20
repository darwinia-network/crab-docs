import type { VercelRequest, VercelResponse } from '@vercel/node';

const grant = require('grant').vercel({
  config: require('./config/grant.safe.json'), session: {secret: 'grant'}
})

export default async function (req: VercelRequest, res: VercelResponse) {
  await grant(req, res)
}
