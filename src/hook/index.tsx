import { useState, useEffect, useCallback } from 'react';
import type { UserInfoT } from '../types';
import { getUserInfo, getUserState } from '../utils';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfoT | undefined>();

  const refreshUserInfo = useCallback(() => {
    const urlSearchParams = new URLSearchParams((new URL(window.location.href)).search);
    getUserInfo()
      .then(({ status, data }) => {
        if (status === 200 && data.err === 0 && data?.data) {
          let claimed = false;
          getUserState()
            .then(() => {})
            .catch((err) => {
              if (err?.response?.data?.data?.state === 'RECEIVED') {
                claimed = true;
              }
            })
            .finally(() => {
              setUserInfo({
                ...data.data,
                isClaimed: claimed,
                isGithubOauth: urlSearchParams.get('oauth') === 'github',
              });
            });
        } else if (urlSearchParams.get('oauth') === 'github') {
          setUserInfo({ isClaimed: false, isGithubOauth: true });
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
