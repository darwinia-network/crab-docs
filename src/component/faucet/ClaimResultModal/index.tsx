import React from "react";
import { FaucetBaseModal } from "../BaseModal";
import { Space } from "antd";
import { FaucetClaimResultStatus } from "../../../types";
import type { FaucetClaimResult, TokenSymbolT } from "../../../types";
import style from "./style.module.scss";

import TwitterIcon from "./img/twitter.svg";
import MediumIcon from "./img/medium.svg";
import TelegramIcon from "./img/telegram.svg";
import DiscordIcon from "./img/discord.svg";

type Props = {
  visible: boolean;
  onCancel: () => void;
  tokenSymbol: TokenSymbolT;
  resultInfo: FaucetClaimResult;
};

const Component = ({ visible, resultInfo, onCancel, tokenSymbol }: Props) => (
  <FaucetBaseModal
    visible={visible}
    destroyOnClose={true}
    onCancel={onCancel}
    tokenSymbol={tokenSymbol}
    footer={null}
    title={
      <div className={style.title}>
        <h3>{resultInfo.status === FaucetClaimResultStatus.SUCCESS ? "Congratulations!" : "Failed to claim!"}</h3>
      </div>
    }
  >
    {resultInfo.status === FaucetClaimResultStatus.SUCCESS ? (
      <>
        <p className={style.tips}>
          The airdrop token {resultInfo.amount} {tokenSymbol} has been sent to the destination address that you filled
          before, please track this transfer through the explorer:
        </p>
        <p className={style.subview}>
          <a
            className={style[tokenSymbol.toLowerCase()]}
            target="_blank"
            rel="noopener noreferrer"
            href={resultInfo.subview}
          >
            {tokenSymbol === "CRAB" ? "View in Subview Explorer" : "View in Subscan Explorer"}
          </a>
        </p>
      </>
    ) : resultInfo.status === FaucetClaimResultStatus.IN_GREYLIST ? (
      <>
        <p className={style.tips}>You are now in greylist, greylist will reset this IP Address after 12 hours later.</p>
        <p className={style.tipsWarning}>The same IP address can claim once within 12 hours!</p>
      </>
    ) : (
      <p className={style.tips}>
        Sorry, the PRING in the fund pool is empty now. Please wait, we’ll add the fund pool soon.
      </p>
    )}
    <div className={style.social}>
      <Space align="center" size="large">
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/DarwiniaNetwork">
          <TwitterIcon />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://medium.com/@DarwiniaNetwork">
          <MediumIcon />
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://t.me/DarwiniaDev">
          <TelegramIcon />
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://discord.com/channels/456092011347443723/795384466930663434"
        >
          <DiscordIcon />
        </a>
      </Space>
    </div>
  </FaucetBaseModal>
);

export const FaucetClaimResultModal = React.memo(Component);
