import React from "react";
import type { TokenSymbolT } from '../../../types';
import style from './style.module.scss';
import { FaucetBaseModal } from '../BaseModal';
import { Spin } from 'antd';

type Props = {
  visible: boolean;
  tokenSymbol: TokenSymbolT;
  onCancel: () => void;
};

const Component = ({
  visible,
  tokenSymbol,
  onCancel,
}: Props) => (
  <FaucetBaseModal
    visible={visible}
    tokenSymbol={tokenSymbol}
    onCancel={onCancel}
    footer={null}
  >
    <div className={`${style.waiting}`}>
      <Spin size='large' className={style.spin} indicator={<div className={`${style.indicator} ${style[tokenSymbol.toLowerCase()]}`} />} />
      <p>Waiting For Confirmation</p>
    </div>
  </FaucetBaseModal>
);

export const TxLoadingModal = React.memo(Component);
