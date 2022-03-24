import type {VercelRequest, VercelResponse} from '@vercel/node';
import {Octokit} from '@octokit/rest';


export default async function (req: VercelRequest, res: VercelResponse) {
  const user = await queryGithubAccountInfo(req);
  res.statusCode = 200
  res.setHeader('content-type', 'application/json')
  const body = {
    err: user == null ? 1 : 0,
    message: user ? 'Ok' : 'Can not get user info, Please login',
    data: user,
  };
  res.end(JSON.stringify(body, null, 2))
}

async function queryGithubAccountInfo(req: VercelRequest): Promise<UserInfo | null> {
  try {
    const cookies = req.cookies;
    const accessToken = cookies['x-access-token'];
    const octokit = new Octokit({
      auth: accessToken,
    });
    const {data} = await octokit.request("/user");
    return {
      id: data.id,
      type: data.type,
      avatar: data.avatar_url,
      name: data.login,
      created_at: data.created_at,
      updated_at: data.updated_at,
    };
  } catch (e) {
    console.error('Failed to query github account info: ' + e.message);
    return null;
  }
}

class UserInfo {
  id: Number;
  // User type
  type: String;
  avatar: String;
  name: String;
  created_at: Date;
  updated_at: Date;
}
