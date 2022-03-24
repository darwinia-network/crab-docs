import React, { useCallback } from "react";
import { notification } from 'antd';
import type { TokenSymbolT } from '../../../types';
import { LoginWithGithub } from '../LoginWithGithub';

const TokenSymbol: TokenSymbolT = 'PRING';

export const PangolinFaucet = () => {
  const handleLoginWithGithub = useCallback(() => {
    notification.info({
      message: 'JayJayDebug',
      description: 'Login with Github',
    });
  }, []);

  return (
    <>
      <LoginWithGithub tokenSymbol={TokenSymbol} onClick={handleLoginWithGithub} />
    </>
  );
};
