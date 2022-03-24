import axios from "axios";

import { decodeAddress, encodeAddress } from "@polkadot/keyring";
import { hexToU8a, isHex } from "@polkadot/util";

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address));
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserInfo = () => {
  return axios.get("/api/crab/user/info", {
    timeout: 5000,
  });
};

export const getCrabClaimState = () => {
  return axios.get("/api/crab/airdrop/state", {
    timeout: 3000,
  });
};

export const getPangolinClaimState = () => {
  return axios.get("/api/pangolin/airdrop/state", {
    timeout: 3000,
  });
};

export const sendCrabClaimTrans = (address: string = "") => {
  return axios({
    url: "/api/crab/airdrop/transfer",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: `address=${address}`,
  });
};

export const sendPangolinClaimTrans = (address: string = "") => {
  return axios({
    url: "/api/pangolin/airdrop/transfer",
    method: "post",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: `address=${address}`,
  });
};

export const isGithubOauth = () => {
  const urlSearchParams = new URLSearchParams(new URL(window.location.href).search);
  return urlSearchParams.get("oauth") === "github";
};
