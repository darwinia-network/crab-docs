import React from 'react';
import clsx from 'clsx';
import styles from '../styles.module.scss';
import { Modal } from 'antd';

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
