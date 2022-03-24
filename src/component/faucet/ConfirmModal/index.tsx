import React from 'react';
import type { TokenSymbolT } from '../../../types';
import { FaucetBaseModal } from '../BaseModal';
import style from './style.module.scss';
import { Space, Typography } from 'antd';

type Props = {
  onCancel: () => void;
  onBack: () => void;
  onOk: () => void;
  githubAccount: string;
  destination: string;
  amount: number;
  tokenSymbol: TokenSymbolT;
  visible: boolean;
}

const Component = ({
  onCancel,
  onOk,
  onBack,
  githubAccount,
  destination,
  amount,
  tokenSymbol,
  visible,
}: Props) => {
  return (
    <FaucetBaseModal
      onCancel={onCancel}
      onBack={onBack}
      onOk={onOk}
      tokenSymbol={tokenSymbol}
      okText={`Confirm and Claim ${tokenSymbol}`}
      visible={visible}
      title={
        <div className={style.title}>
          <h3>Confirm Information</h3>
          <p>Please review your destination address </p>
        </div>
      }
    >
      <Space direction='vertical' align='start' size='middle'>
        <section className={style.section}>
          <h5 className={style.label}>Github Account:</h5>
          <span className={style.value}>{githubAccount}</span>
        </section>
        <section className={style.section}>
          <h5 className={style.label}>Destination:</h5>
          <Typography.Text ellipsis className={style.value}>{destination}</Typography.Text>
        </section>
        <section className={style.section}>
          <h5 className={style.label}>Amount:</h5>
          <span className={style.value}>{amount} {tokenSymbol}</span>
        </section>
      </Space>
    </FaucetBaseModal>
  );
};

export const FaucetConfirmModal = React.memo(Component);
