import type { VercelRequest, VercelResponse } from "@vercel/node";

function grantConfig() {
  const config = {
    defaults: {
      // "origin": "https://docs.crab.network",
      origin: "https://crab-docs-dev.vercel.app",
      transport: "querystring",
      state: true,
    },
    github: {
      key: "{{ github_oauth_app_key }}",
      secret: "{{ github_oauth_app_secret }}",
      scope: [],
      callback: "/api/crab/authorization",
      overrides: {
        crab: {
          key: process.env.GITHUB_OAUTH_APP_KEY,
          secret: process.env.GITHUB_OAUTH_APP_SECRET,
          callback: "/api/crab/authorization",
        },
        pangolin: {
          key: process.env.PANGOLIN_GITHUB_OAUTH_APP_KEY,
          secret: process.env.PANGOLIN_GITHUB_OAUTH_APP_SECRET,
          callback: "/api/pangolin/authorization",
        },
      },
    },
  };
  return config;
}

const grant = require("grant").vercel({
  config: grantConfig(),
  session: { secret: "grant" },
});

export default async function (req: VercelRequest, res: VercelResponse) {
  await grant(req, res);
}
