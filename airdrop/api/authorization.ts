import type {VercelRequest, VercelResponse} from '@vercel/node';
import * as qs from 'qs';


export default async function (req: VercelRequest, res: VercelResponse) {
  res.statusCode = 302;
  const auth = qs.parse(req.query);
  const accessToken = auth.access_token;
  res.setHeader('Set-Cookie', `x-access-token=${accessToken};httpOnly;secure;path=/;`);
  res.setHeader('Location', '/builders/get-started/darwinia-crab?oauth=github#get-tokens');
  res.end('Redirect /builders/get-started/darwinia-crab?oauth=github#get-tokens');
}
