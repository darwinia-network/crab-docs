import { useState, useEffect, useCallback } from 'react';
import type { UserInfoT, CrabClaimStateT, PangolinClaimStateT } from '../types';
import { getUserInfo, getCrabClaimState, getPangolinClaimState, isGithubOauth } from '../utils';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoT | undefined>();

  const refreshUserInfo = useCallback(() => {
    const oauthFromGithub = isGithubOauth();
    getUserInfo()
      .then(({ status, data }) => {
        if (status === 200 && data.err === 0 && data?.data) {
          setUserInfo({
            ...data.data,
            isOauthSuccess: true,
            isGithubOauth: oauthFromGithub,
          });
        } else if (oauthFromGithub) {
          setUserInfo({ isClaimed: false, isGithubOauth: true, isOauthSuccess: false });
        }
      })
      .catch((err) => {
        console.error('get user info', err);
      })
      .finally(() => {});
  }, []);

  useEffect(() => {
    refreshUserInfo();
  }, []);

  return { userInfo, refreshUserInfo };
};

export const useCrabClaimState = () => {
  const [crabClaimState, setCrabClaimState] = useState<CrabClaimStateT>({ isClaimed: false });

  const refreshCrabClaimState = useCallback(() => {
    getCrabClaimState()
      .then(() => {
        setCrabClaimState({ isClaimed: false });
      })
      .catch((err) => {
        if (err?.response?.data?.data?.state === 'RECEIVED') {
          setCrabClaimState({ isClaimed: true });
        }
      });
  }, []);

  useEffect(() => {
    refreshCrabClaimState();
  }, []);

  return { crabClaimState, refreshCrabClaimState };
};

export const usePangolinClaimState = () => {
  const [pangolinClaimState, setPangolinClaimState] = useState<PangolinClaimStateT>({ isRateLimit: false });

  const refreshPangolinClaimState = useCallback(() => {
    getPangolinClaimState()
      .then(() => {
        setPangolinClaimState({ isRateLimit: false });
      })
      .catch((err) => {
        if (err?.response?.data?.data?.state === 'RATE_LIMIT_IP') {
          setPangolinClaimState({ isRateLimit: true });
        }
      });
  }, []);

  useEffect(() => {
    refreshPangolinClaimState();
  }, []);

  return { pangolinClaimState, refreshPangolinClaimState };
};
