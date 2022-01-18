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
  CongratulationContent,
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
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(false);

  // const handleClickLoginWithGithub = (e: Event) => {
  //   e.preventDefault();
  //   setVisibleComfirmModal(true);
  // }

  return (
    <>
      <div className={clsx(className)}>
        <a className={clsx(styles.btnLoginWithGihub)} href="/api/connect/github">
          <span>Log in with Github</span>
        </a>
      </div>
      <ComfirmModal
        visible={visibleComfirmModal}
        title={<ComfirmModalTitleForCcongratulation />}
        // footer={<ComfirmModalButton onClick={() => setVisibleComfirmModal(false)} text='Comfirm and Claim CRAB' disabled={false} />}
        footer={<SocialLinks />}
        onCancel={() => setVisibleComfirmModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <CongratulationContent />
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
