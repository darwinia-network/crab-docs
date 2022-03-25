import React, { useEffect, useState, useCallback } from "react";
import { notification } from "antd";
import { useUserInfo, usePangolinClaimState } from "../../../hook";
import type { TokenSymbolT, FaucetClaimResult } from "../../../types";
import { FaucetClaimResultStatus } from "../../../types";
import { sendPangolinClaimTrans } from "../../../utils";

import { LoginWithGithub } from "../LoginWithGithub";
import { FaucetClaimModal } from "../ClaimModal";
import { FaucetConfirmModal } from "../ConfirmModal";
import { TxLoadingModal } from "../TxLoadingModal";
import { FaucetClaimResultModal } from "../ClaimResultModal";

const TokenSymbol: TokenSymbolT = "PRING";

export const PangolinFaucet = () => {
  const { userInfo } = useUserInfo();
  const { pangolinClaimState } = usePangolinClaimState();

  const [txLoadingModalConfig, setTxLoadingModalConfig] = useState({
    visible: false,
  });
  const [claimModalConfig, setClaimModalConfig] = useState<{
    visible: boolean;
  }>({ visible: false });
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
      amount: 100,
      subview: "#",
    },
  });

  const handleLoginWithGithub = useCallback(() => {
    userInfo?.isOauthSuccess
      ? pangolinClaimState.isRateLimit
        ? setClaimResultModalConfig({
            visible: true,
            resultInfo: {
              status: FaucetClaimResultStatus.IN_GREYLIST,
            },
          })
        : setClaimModalConfig({ visible: true })
      : window.open("/connect/github/pangolin");
  }, [userInfo, pangolinClaimState]);

  const handleClaimOk = useCallback((address) => {
    setClaimModalConfig((prev) => ({ ...prev, visible: false }));
    setConfirmModalConfig({ visible: true, destination: address });
  }, []);

  const handleConfirmOk = useCallback(() => {
    setConfirmModalConfig((prev) => ({ ...prev, visible: false }));
    setTxLoadingModalConfig({ visible: true });

    sendPangolinClaimTrans(confirmModalConfig.destination)
      .then(({ status, data }) => {
        setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }));
        if (data?.err === 0 && status === 200) {
          setClaimResultModalConfig({
            visible: true,
            resultInfo: {
              status: FaucetClaimResultStatus.SUCCESS,
              subview: data?.data?.preview || "#",
              amount: 100,
            },
          });
        }
      })
      .catch((err) => {
        console.error("send claim trans:", err);
        setTxLoadingModalConfig((prev) => ({ ...prev, visible: false }));
        if (err?.response?.data) {
          const data = err?.response?.data;
          if (data?.message === "All airdrops have ended") {
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
        ? setClaimModalConfig({ visible: true })
        : notification.info({
            message: "Authorize",
            description: "Failed to authorize.",
          });
    }
  }, [userInfo]);

  return (
    <>
      <LoginWithGithub tokenSymbol={TokenSymbol} onClick={handleLoginWithGithub} />

      <FaucetClaimModal
        visible={claimModalConfig.visible}
        tokenSymbol={TokenSymbol}
        amount={100}
        githubAccount={(userInfo?.name as string) || "***"}
        onCancel={() => setClaimModalConfig((prev) => ({ ...prev, visible: false }))}
        onOk={handleClaimOk}
      />
      <FaucetConfirmModal
        visible={confirmModalConfig.visible}
        tokenSymbol={TokenSymbol}
        amount={100}
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
