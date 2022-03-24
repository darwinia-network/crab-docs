import axios from 'axios';

const { decodeAddress, encodeAddress } = require('@polkadot/keyring');
const { hexToU8a, isHex } = require('@polkadot/util');

export const isValidAddressPolkadotAddress = (address: string) => {
  try {
    encodeAddress(
      isHex(address)
        ? hexToU8a(address)
        : decodeAddress(address)
    );
    return true;
  } catch (error) {
    return false;
  }
};

export const getUserInfo = () => {
  return axios.get('/api/user/info', {
    timeout: 5000,
  });
};

export const getCrabClaimState = () => {
  return axios.get('/api/airdrop/state', {
    timeout: 3000,
  });
};

export const getPangolinClaimState = () => {
  return axios.get('/pangolin/airdrop/state', {
    timeout: 3000,
  });
};

export const sendCrabClaimTrans = (address: string = '') => {
  return axios({
    url: '/api/airdrop/transfer',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: `address=${address}`,
  });
};

export const sendPangolinClaimTrans = (address: string = '') => {
  return axios({
    url: '/pangolin/airdrop/transfer',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: `address=${address}`,
  });
};

export const isGithubOauth = () => {
  const urlSearchParams = new URLSearchParams((new URL(window.location.href)).search);
  return urlSearchParams.get('oauth') === 'github';
};
