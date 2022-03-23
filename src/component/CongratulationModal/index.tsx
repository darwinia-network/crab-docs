import React from "react";
import { FaucetBaseModal } from '../FaucetBaseModal';
import type { TokenSymbolT } from '../../types';
import { Space } from "antd";
import style from './style.module.scss';

import TwitterIcon from './img/twitter.svg';
import MediumIcon from './img/medium.svg';
import TelegramIcon from './img/telegram.svg';
import DiscordIcon from './img/discord.svg';

type Props = {
  visible: boolean;
  amount: number;
  subview: string;
  onCancel: () => void;
  tokenSymbol: TokenSymbolT;
}

const Component = ({
  visible,
  amount,
  onCancel,
  tokenSymbol,
  subview = '#',
}: Props) => (
  <FaucetBaseModal
    visible={visible}
    onCancel={onCancel}
    tokenSymbol={tokenSymbol}
    footer={null}
    title={
      <div className={style.title}>
        <h3>Congratulations!</h3>
      </div>
    }
  >
    <p className={style.tips}>The airdrop token {amount} {tokenSymbol} has been sent to the destination address that you filled before, please track this transfer through the Subview:</p>
    <p className={style.subview}><a className={style[tokenSymbol.toLowerCase()]} target='_blank' rel='noopener noreferrer' href={subview}>View in Subview Explorer</a></p>
    <div className={style.social}>
      <Space align='center' size='large' >
        <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/DarwiniaNetwork'><TwitterIcon /></a>
        <a target='_blank' rel='noopener noreferrer' href='https://medium.com/@DarwiniaNetwork'><MediumIcon /></a>
        <a target='_blank' rel='noopener noreferrer' href='https://t.me/DarwiniaDev'><TelegramIcon/></a>
        <a target='_blank' rel='noopener noreferrer' href='https://discord.com/channels/456092011347443723/795384466930663434'><DiscordIcon /></a>
      </Space>
    </div>
  </FaucetBaseModal>
);

export const CongratulationModal = React.memo(Component);
