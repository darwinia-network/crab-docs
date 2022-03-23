import React, { useCallback, useState } from "react";
import { notification } from 'antd';
import { useUserInfo } from '../../../hook';
import type { TokenSymbolT, FaucetClaimResult } from '../../../types';
import { FaucetClaimResultStatus } from '../../../types';
import { sendClaimTrans } from '../../../utils';

import { LoginWithGithub } from '../LoginWithGithub';
import { FaucetClaimModal } from '../ClaimModal';
import { FaucetConfirmModal } from '../ConfirmModal';
import { TxLoadingModal } from '../TxLoadingModal';
import { FaucetClaimResultModal } from '../ClaimResultModal';

const TokenSymbol: TokenSymbolT = 'CRAB';

export const CrabFaucet = () => {
  const { userInfo } = useUserInfo();

  const [txLoadingModalConfig, setTxLoadingModalConfig] = useState({ visible: false });
  const [claimModalConfig, setClaimModalConfig] = useState<{
    visible: boolean; status: FaucetClaimResultStatus.IS_CLAIMED | FaucetClaimResultStatus.NOT_ELIGIBLE | undefined;
  }>({ visible: false, status: undefined });
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    visible: boolean; destination: string;
  }>({ visible: false, destination: '' });
  const [claimResultModalConfig, setClaimResultModalConfig] = useState<{
    visible: boolean; resultInfo: FaucetClaimResult;
  }>({ visible: false, resultInfo: { status: FaucetClaimResultStatus.SUCCESS, amount: 100, subview: '#' } });

  const configClaimModalByUserInfo = () => {
    setClaimModalConfig({
      visible: true,
      status: userInfo.isClaimed ? FaucetClaimResultStatus.IS_CLAIMED : Number((userInfo.created_at as string).split('-')[0]) >= 2022 ? FaucetClaimResultStatus.NOT_ELIGIBLE : undefined
    });
  };

  const handleLoginWithGithub = useCallback(() => {
    userInfo ? configClaimModalByUserInfo() : window.open('/connect/github');
  }, [userInfo]);

  const handleClaimOk = useCallback((address) => {
    setClaimModalConfig(prev => ({ ...prev, visible: false }));
    setConfirmModalConfig({ visible: true, destination: address });
  }, []);

  const handleConfirmOk = useCallback(() => {
    setConfirmModalConfig(prev => ({ ...prev, visible: false }));
    setTxLoadingModalConfig({ visible: true });

    sendClaimTrans(confirmModalConfig.destination)
      .then(({ status, data }) => {
        setTxLoadingModalConfig(prev => ({ ...prev, visible: false }));
        if (data?.err === 0 && status === 200) {
          setClaimResultModalConfig({
            visible: true,
            resultInfo: {
              status: FaucetClaimResultStatus.SUCCESS,
              subview: data?.data?.preview || '#',
              amount: 100,
            },
          });
        }
      })
      .catch((err) => {
        console.error('send claim trans:', err);
        setTxLoadingModalConfig(prev => ({ ...prev, visible: false }));
        if (err?.response?.data) {
          const data = err?.response?.data;
          if (data?.data?.state === 'RECEIVED') {
            setClaimModalConfig({
              visible: true,
              status: FaucetClaimResultStatus.IS_CLAIMED,
            });
          } else if (data?.message === 'All airdrops have ended') {
            setClaimResultModalConfig({
              visible: true,
              resultInfo: {
                status: FaucetClaimResultStatus.POOL_EMPTY,
              },
            });
          } else if (data?.data?.state === 'RATE_LIMIT_IP') {
            setClaimResultModalConfig({
              visible: true,
              resultInfo: {
                status: FaucetClaimResultStatus.IN_GREYLIST,
              },
            });
          } else {
            notification.warning({
              message: 'Oops, something went wrong',
              description: data?.message,
            });
          }
        } else {
          notification.error({
            message: 'Oops, something went wrong',
            description: err.message,
          });
        }
      })
      .finally(() => {
        setTxLoadingModalConfig(prev => ({ ...prev, visible: false }));
      });
  }, [confirmModalConfig]);

  if (userInfo?.isGithubOauth) {
    userInfo?.isOauthSuccess ? configClaimModalByUserInfo() : notification.info({ message: 'Authorize', description: 'Failed to authorize.' });
  }

  return (
    <>
      <LoginWithGithub tokenSymbol={TokenSymbol} onClick={handleLoginWithGithub} />

      <FaucetClaimModal
        visible={claimModalConfig.visible}
        status={claimModalConfig.status}
        tokenSymbol={TokenSymbol}
        amount={100}
        githubAccount={userInfo?.name as string || '***'}
        onCancel={() => setClaimModalConfig(prev => ({ ...prev, visible: false }))}
        onOk={handleClaimOk}
      />
      <FaucetConfirmModal
        visible={confirmModalConfig.visible}
        tokenSymbol={TokenSymbol}
        amount={100}
        githubAccount={userInfo?.name as string || '***'}
        destination={confirmModalConfig.destination}
        onCancel={() => setConfirmModalConfig(prev => ({ ...prev, visible: false }))}
        onBack={() => {
          setConfirmModalConfig(prev => ({ ...prev, visible: false }));
          setClaimModalConfig(prev => ({ ...prev, visible: true }));
        }}
        onOk={handleConfirmOk}
      />
      <TxLoadingModal
        tokenSymbol={TokenSymbol}
        visible={txLoadingModalConfig.visible}
        onCancel={() => setTxLoadingModalConfig(prev => ({ ...prev, visible: false }))}
      />
      <FaucetClaimResultModal
        tokenSymbol={TokenSymbol}
        visible={claimResultModalConfig.visible}
        resultInfo={claimResultModalConfig.resultInfo}
        onCancel={() => setTxLoadingModalConfig(prev => ({ ...prev, visible: false }))}
      />
    </>
  )
};
