import React from 'react';
import clsx from 'clsx';
import { Modal, Spin, Space } from 'antd';

import styles from '../styles.module.scss';
import TwitterIcon from './img/Twitter.svg';
import MediumIcon from './img/Medium.svg';
import TelegramIcon from './img/Telegram.svg';
import DiscordIcon from './img/Discord.svg';

export const ComfirmModalTitleWithCRAB = ({ crabQuantity='100' }) => (
  <div className={clsx(styles.titleComfirmModalWithCRAB)}>
    <span>Claim CRAB Token</span>
    <span>{crabQuantity} CRAB</span>
  </div>
);

export const ComfirmModalTitleForSorry = ({ crabQuantity='200,000' }) => (
  <div className={clsx(styles.titleComfirmModalForSorry)}>
    <span>{`Sorry, ${crabQuantity} CRAB has been distributed.`}</span>
  </div>
);

export const ComfirmModalTitleForComfirm = () => (
  <div className={clsx(styles.titleComfirmModalForComfirm)}>
    <span>Confirm Information</span>
    <span>Please review your destination address</span>
  </div>
);

export const ComfirmModalTitleForCcongratulation = () => (
  <div className={clsx(styles.titleComfirmModalForCongratulation)}>
    <span>Congratulations!</span>
  </div>
);

export const ComfirmModalButton = ({
  text='OK',
  onClick=()=>{},
  disabled=false,
}) => (
  <button className={clsx(styles.btnComfirmModal)} onClick={onClick} disabled={disabled}>
    <span>{text}</span>
  </button>
)

export const ComfirmModal = ({
  visible=false,
  title=null,
  footer=null,
  children=null,
  onCancel=()=>{},
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      footer={footer}
      onCancel={onCancel}
      className={clsx(styles.comfirmModal)}
    >
      {children}
    </Modal>
  );
};

export const LoadingModal = ({
  visible=false,
  onCancel=()=>{},
}) => {
  return (
    <Modal
      visible={visible}
      title={null}
      footer={null}
      onCancel={onCancel}
      className={clsx(styles.loadingModal)}
    >
      <div className={clsx(styles.loadingModalBody)}>
        <Spin size='large' className={clsx(styles.loadingModalSpin)} indicator={<div className={styles.indicator} />} />
        <p>Waiting For Confirmation</p>
      </div>
    </Modal>
  )
};

export const SnapshotDataSection = ({
  githubAccount='***',
  registrationTime='2021/12/05',
}) => (
  <div className={styles.snapshotTimeSection}>
    <h5>Snapshot Data</h5>
    <div className={clsx(styles.wrapContent)}>
      <span>{`Github Account: ${githubAccount}`}</span>
      <span>{`Registration Time: : ${registrationTime}`}</span>
    </div>
  </div>
);

export const DestinationSection = ({
  onAddressChange=(e)=>console.log(e.target.value),
  isValidAddress=true,
  isNothingToClaim=false,
  isClaimed=false,
  comfirmAddress=undefined,
}) => {
  if (isNothingToClaim) {
    return (
      <div className={styles.destinationSection}>
        <p>Address has no available claim</p>
      </div>
    );
  }

  if (isClaimed) {
    return (
      <div className={styles.destinationSection}>
        <h5>Destination</h5>
        <p>Address has already claimed</p>
      </div>
    );
  }

  if (comfirmAddress) {
    return (
      <div className={styles.destinationSection}>
        <h5>Destination</h5>
        <p>{comfirmAddress}</p>
      </div>
    );
  }

  return (
    <div className={styles.destinationSection}>
      <h5>Destination</h5>
      <input placeholder='Please enter your Crab Smart Address which starts with 0x' onChange={onAddressChange} />
      {isValidAddress ? (
        <span>Please enter your Crab Smart Address to claim token CRAB, learn more about Crab Smart Address, please refer <a href='#'>here</a>.</span>
      ) : (
        <span className={styles.warning}>Please enter a valid Crab Smart Address, learn more about Crab Smart Address, please refer <a href='#'>here</a>.</span>
      )}
    </div>
  );
};

export const SocialLinks = () => (
  <div>
    <Space size='large'>
      <a href='#'><img alt='...' src={TwitterIcon} /></a>
      <a href='#'><img alt='...' src={MediumIcon} /></a>
      <a href='#'><img alt='...' src={TelegramIcon} /></a>
      <a href='#'><img alt='...' src={DiscordIcon} /></a>
    </Space>
  </div>
);
