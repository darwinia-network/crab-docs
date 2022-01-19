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

const getUserInfo = () => {
  return axios.get('/api/user/info', {
    timeout: 3000,
  });
};

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(false);

  const handleClickLoginWithGithub = (e: Event) => {
    e.preventDefault();

    if (userInfo) {
      setVisibleComfirmModal(true);
    } else {
      window.open('/connect/github');
    }
    // getUserInfo()
    //   .then(({ status, data }) => {
    //     console.log('user info:', status, data);
    //   })
    //   .catch((err) => {
    //     console.error('get user info', err);
    //   })
    //   .finally(() => {});
  };

  useEffect(() => {
    getUserInfo()
      .then(({ status, data }) => {
        console.log('init user info:', status, data);
        if (status === 200) {
          setUserInfo(data.data);
        }
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
