import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

const BASE_URL = 'https://crab-docs-fewensa-itering.vercel.app';

const getUserInfo = () => {
  return axios.get('/api/user/info', {
    timeout: 3000,
    baseURL: BASE_URL,
  });
};

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(false);

  const handleClickLoginWithGithub = (e: Event) => {
    e.preventDefault();
    // setVisibleComfirmModal(true);
    getUserInfo()
      .then((res) => {
        console.log('user info:', res);
      })
      .catch((err) => {
        console.error('get user info', err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    getUserInfo()
      .then((res) => {
        console.log('init user info:', res);
      })
      .catch((err) => {
        console.error('init get user info', err);
      })
      .finally(() => {});
  }, []);

  return (
    <>
      <div className={clsx(className)}>
        <button className={clsx(styles.btnLoginWithGihub)} onClick={handleClickLoginWithGithub}>
          <span>Log in with Github</span>
        </button>
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
