import type { VercelRequest, VercelResponse } from "@vercel/node";

function grantConfig() {
  const config = require("./grantConfig.json");
  config.github.key = process.env.PANGOLIN_GITHUB_OAUTH_APP_KEY;
  config.github.secret = process.env.PANGOLIN_GITHUB_OAUTH_APP_SECRET;
  return config;
}

const grant = require("grant").vercel({
  config: grantConfig(),
  session: { secret: "grant" },
});

export default async function (req: VercelRequest, res: VercelResponse) {
  await grant(req, res);
}
