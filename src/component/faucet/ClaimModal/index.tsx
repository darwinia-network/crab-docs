import React, { useState, useCallback, ChangeEvent } from 'react';
import { Space, Input } from 'antd';
import { FaucetClaimResultStatus } from '../../../types';
import type { TokenSymbolT } from '../../../types';
import { FaucetBaseModal } from '../BaseModal';
import style from './style.module.scss';
import { ethers } from 'ethers';
import { isValidAddressPolkadotAddress } from '../../../utils';

type Props = {
  visible: boolean;
  tokenSymbol: TokenSymbolT;
  amount: number;
  status?: FaucetClaimResultStatus.IS_CLAIMED | FaucetClaimResultStatus.NOT_ELIGIBLE;
  githubAccount: string;
  registrationTime?: string;
  onCancel: () => void;
  onOk: (address: string) => void;
}

const Component = ({
  visible,
  amount,
  status,
  tokenSymbol,
  githubAccount,
  registrationTime,
  onCancel,
  onOk,
}: Props) => {
  const [address, setAddress] = useState('');
  const [isValidAddress, setIsValidAddress] = useState(true);

  const handleDestinationChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    if (tokenSymbol === 'CRAB') {
      if (!ethers.utils.isAddress(address) || !address.startsWith('0x')) {
        setIsValidAddress(false);
        return;
      }
    } else if (tokenSymbol === 'PRING') {
      if (!isValidAddressPolkadotAddress(address) || !address.startsWith('5')) {
        setIsValidAddress(false);
        return;
      }
    }

    setAddress(address);
    setIsValidAddress(true);
  }, []);

  const handleOkClick = () => {
    onOk && onOk(address);
  };

  return (
    <FaucetBaseModal
      visible={visible}
      tokenSymbol={tokenSymbol}
      okText={`Claim ${tokenSymbol}`}
      disableOk={!address || !isValidAddress || !!status}
      onCancel={onCancel}
      onOk={handleOkClick}
      title={
        <div className={style.title}>
          <p>{`Claim ${tokenSymbol} Token`}</p>
          <h3>{`${amount} ${tokenSymbol}`}</h3>
        </div>
      }
    >
      <Space direction='vertical' size='large'>
        <section className={style.section}>
          <h5 className={style.label}>Snapshot Data:</h5>
          <div className={style.valueWrap   }>
            <p className={style.value}>{`Github Account: ${githubAccount}`}</p>
            {registrationTime && <p className={style.value}>{`Registration Time: ${registrationTime}`}</p>}
          </div>
        </section>
        <section className={style.section}>
          {status === FaucetClaimResultStatus.IS_CLAIMED ? (
            <p className={style.claimed}>Address has already claimed</p>
          ) : status === FaucetClaimResultStatus.NOT_ELIGIBLE ? (
            <p className={style.noteligible}>Address has no available claim</p>
          ) : (
            <>
              <h5 className={style.label}>Destination:</h5>
              <Input
                onChange={handleDestinationChange}
                className={`${style.destination} ${style[tokenSymbol.toLowerCase()]}`}
                placeholder={tokenSymbol === 'CRAB' ? 'Please enter your Crab Smart Address which starts with 0x' : 'Please enter a substrated-based Pangolin Chain address starting with 5'}
              />
              {tokenSymbol === 'CRAB' ? (
                isValidAddress ? (
                  <span className={`${style.extraNormal} ${style[tokenSymbol.toLowerCase()]}`}>Please enter your Crab Smart Address to claim token CRAB, learn more about Crab Smart Address, please refer <a target='_blank' rel='noopener noreferrer' href='https://docs.crab.network/tutorials/wormhole_user_guide/crab-tut-wormhole-darwinia2crabsmart#3-what-does-the-dvm-address-mean-what-is-the-difference-between-crab-address-and-crab-dvm-address'>here</a>.</span>
                ) : (
                  <span className={`${style.extraWarning} ${style[tokenSymbol.toLowerCase()]}`}>Please enter a valid Crab Smart Address, learn more about Crab Smart Address, please refer <a target='_blank' rel='noopener noreferrer' href='https://docs.crab.network/tutorials/wormhole_user_guide/crab-tut-wormhole-darwinia2crabsmart#3-what-does-the-dvm-address-mean-what-is-the-difference-between-crab-address-and-crab-dvm-address'>here</a>.</span>
                )
              ) : (
                <span className={`${isValidAddress ? style.extraNormal : style.extraWarning} ${style[tokenSymbol.toLowerCase()]}`}>Please enter a substrated-based Pangolin Chain address. And you can use <a target='_blank' rel='noopener noreferrer' href='https://wormhole.darwinia.network/'>Wormhole</a> to transfer your PRING between Pangolin Chain and Pangolin Smart Chain.</span>
              )}
            </>
          )}
        </section>
      </Space>
    </FaucetBaseModal>
  );
};

export const FaucetClaimModal = React.memo(Component);
