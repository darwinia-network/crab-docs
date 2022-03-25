import React, { useCallback, useEffect, useState } from "react";
import { notification } from "antd";
import { useUserInfo, useCrabClaimState } from "../../../hook";
import type { TokenSymbolT, FaucetClaimResult } from "../../../types";
import { FaucetClaimResultStatus } from "../../../types";
import { sendCrabClaimTrans } from "../../../utils";

import { LoginWithGithub } from "../LoginWithGithub";
import { FaucetClaimModal } from "../ClaimModal";
import { FaucetConfirmModal } from "../ConfirmModal";
import { TxLoadingModal } from "../TxLoadingModal";
import { FaucetClaimResultModal } from "../ClaimResultModal";

const CLAIM_AMOUNT = 10;
const TokenSymbol: TokenSymbolT = "CRAB";

export const CrabFaucet = () => {
  const { userInfo } = useUserInfo();
  const { crabClaimState } = useCrabClaimState();

  const [txLoadingModalConfig, setTxLoadingModalConfig] = useState({
    visible: false,
  });
  const [claimModalConfig, setClaimModalConfig] = useState<{
    visible: boolean;
    status: FaucetClaimResultStatus.IS_CLAIMED | FaucetClaimResultStatus.NOT_ELIGIBLE | undefined;
  }>({ visible: false, status: undefined });
  const [confirmModalConfig, setConfirmModalConfig] = useState<{
    visible: boolean;
    destination: string;
  }>({ visible: false, destination: "" });
  const [claimResultModalConfig, setClaimResultModalConfig] = useState<{
    visible: boolean;
    resultInfo: FaucetClaimResult;
  }>({
    visible: false,
    resultInfo: {
      status: FaucetClaimResultStatus.SUCCESS,
      amount: CLAIM_AMOUNT,
      subview: "#",
    },
  });

  const configClaimModal = (userInfo, crabClaimState) => {
    setClaimModalConfig({
      visible: true,
      status: crabClaimState.isClaimed
        ? FaucetClaimResultStatus.IS_CLAIMED
        : Number((userInfo.created_at as string).split("-")[0]) >= 2022
        ? FaucetClaimResultStatus.NOT_ELIGIBLE
        : undefined,
    });
  };

  const handleLoginWithGithub = useCallback(() => {
    userInfo?.isOauthSuccess ? configClaimModal(userInfo, crabClaimState) : window.open("/connect/github/crab");
  }, [userInfo, crabClaimState]);

  const handleClaimOk = useCallback((address) => {
    setClaimModalConfig((prev) => ({ ...prev, visible: false }));
    setConfirmModalConfig({ visible: true, destination: address });
  }, []);

  const handleConfirmOk = useCallback(() => {
    setConfirmModalConfig((prev) => ({ ...prev, visible: false }));
    setTxLoadingModalConfig({ visible: true });

    sendCrabClaimTrans(confirmModalConfig.destination)
      .then(({ status, data }) => {
        setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }));
        if (data?.err === 0 && status === 200) {
          setClaimResultModalConfig({
            visible: true,
            resultInfo: {
              status: FaucetClaimResultStatus.SUCCESS,
              subview: data?.data?.preview || "#",
              amount: CLAIM_AMOUNT,
            },
          });
        }
      })
      .catch((err) => {
        console.error("send claim trans:", err);
        setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }));
        if (err?.response?.data) {
          const data = err?.response?.data;
          if (data?.data?.state === "RECEIVED") {
            setClaimModalConfig({
              visible: true,
              status: FaucetClaimResultStatus.IS_CLAIMED,
            });
          } else if (data?.message === "All airdrops have ended") {
            setClaimResultModalConfig({
              visible: true,
              resultInfo: {
                status: FaucetClaimResultStatus.POOL_EMPTY,
              },
            });
          } else if (data?.data?.state === "RATE_LIMIT_IP") {
            setClaimResultModalConfig({
              visible: true,
              resultInfo: {
                status: FaucetClaimResultStatus.IN_GREYLIST,
              },
            });
          } else {
            notification.warning({
              message: "Oops, something went wrong",
              description: data?.message,
            });
          }
        } else {
          notification.error({
            message: "Oops, something went wrong",
            description: err.message,
          });
        }
      })
      .finally(() => {
        setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }));
      });
  }, [confirmModalConfig]);

  useEffect(() => {
    if (userInfo?.isGithubOauth) {
      userInfo?.isOauthSuccess
        ? configClaimModal(userInfo, crabClaimState)
        : notification.info({
            message: "Authorize",
            description: "Failed to authorize.",
          });
    }
  }, [userInfo, crabClaimState]);

  return (
    <>
      <LoginWithGithub tokenSymbol={TokenSymbol} onClick={handleLoginWithGithub} />

      <FaucetClaimModal
        visible={claimModalConfig.visible}
        status={claimModalConfig.status}
        tokenSymbol={TokenSymbol}
        amount={CLAIM_AMOUNT}
        githubAccount={(userInfo?.name as string) || "***"}
        registrationTime={(userInfo?.created_at as string)?.split("T")[0]?.replace(/-/g, "/") || "2021/12/05"}
        onCancel={() => setClaimModalConfig((prev) => ({ ...prev, visible: false }))}
        onOk={handleClaimOk}
      />
      <FaucetConfirmModal
        visible={confirmModalConfig.visible}
        tokenSymbol={TokenSymbol}
        amount={CLAIM_AMOUNT}
        githubAccount={(userInfo?.name as string) || "***"}
        destination={confirmModalConfig.destination}
        onCancel={() => setConfirmModalConfig((prev) => ({ ...prev, visible: false }))}
        onBack={() => {
          setConfirmModalConfig((prev) => ({ ...prev, visible: false }));
          setClaimModalConfig((prev) => ({ ...prev, visible: true }));
        }}
        onOk={handleConfirmOk}
      />
      <TxLoadingModal
        tokenSymbol={TokenSymbol}
        visible={txLoadingModalConfig.visible}
        onCancel={() => setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }))}
      />
      <FaucetClaimResultModal
        tokenSymbol={TokenSymbol}
        visible={claimResultModalConfig.visible}
        resultInfo={claimResultModalConfig.resultInfo}
        onCancel={() => setClaimResultModalConfig((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
};
