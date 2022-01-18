import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import {
  LoadingModal,
  ComfirmModal,
  ComfirmModalButton,
  SnapshotDataSection,
  DestinationSection,
  GithubAccountSection,
  AmountSection,
  SocialLinks,
  ComfirmModalTitleWithCRAB,
  ComfirmModalTitleForSorry,
  ComfirmModalTitleForComfirm,
  ComfirmModalTitleForCcongratulation,
} from './SubComponent';
import { Space } from 'antd';

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
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
        title={<ComfirmModalTitleForComfirm onBack={() => setVisibleComfirmModal(false)} />}
        footer={<ComfirmModalButton onClick={() => setVisibleComfirmModal(false)} text='Comfirm and Claim CRAB' disabled={false} />}
        onCancel={() => setVisibleComfirmModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <GithubAccountSection />
          <DestinationSection comfirmAddress='0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5' />
          <AmountSection />
        </Space>
      </ComfirmModal>
      <LoadingModal
        visible={visibleLoadingModal}
        onCancel={() => setVisibleLoadingModal(false)}
      />
    </>
  );
};

export default React.memo<Props>(ClaimAirdrop);
