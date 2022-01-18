import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import { Modal } from 'antd';

const ComfirmModalButton = ({
  text='OK',
  onClick=()=>{},
  disabled=false,
}) => (
  <button className={clsx(styles.btnComfirmModal)} onClick={onClick} disabled={disabled}>
    <span>{text}</span>
  </button>
)

const ComfirmModal = ({
  visible=false,
  title=null,
  footer=null,
  children=null,
}) => {
  return (
    <Modal
      visible={visible}
      title={title}
      footer={footer}
      className={clsx(styles.comfirmModal)}
    >
      {children}
    </Modal>
  );
};

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(true);

  const handleClickLoginWithGithub = (e: Event) => {
    e.preventDefault();
    setVisibleComfirmModal(true);
  }

  return (
    <>
      <div className={clsx(className)}>
        <button className={clsx(styles.btnLoginWithGihub)} onClick={handleClickLoginWithGithub}>
          <span>Log in with Github</span>
        </button>
      </div>
      <ComfirmModal
        visible={visibleComfirmModal}
        footer={<ComfirmModalButton onClick={() => setVisibleComfirmModal(false)} disabled={true} />}
      />
    </>
  );
};

export default React.memo<Props>(ClaimAirdrop);
