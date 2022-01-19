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
    timeout: 5000,
  });
};

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [subviewLink, setSubviewLink] = useState('#');
  const [destinationAddress, setDestinationAddress] = useState('0xe59261f6D4088BcD69985A3D369Ff14cC54EF1E5');

  const [visibleLoadingModal, setVisibleLoadingModal] = useState(false);
  const [visibleNotEligibleModal, setVisibleNotEligibleModal] = useState(false);
  const [visibleInputDestinationModal, setVisibleInputDestinationModal] = useState(false);
  const [visibleClaimedModal, setVisibleClaimedModal] = useState(false);
  const [visibleNoneLeftModal, setVisibleNoneLeftModal] = useState(false);
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(false);
  const [visibleCongratulationModal, setVisibleCongratulationModal] = useState(false);

  const handleClickLoginWithGithub = (e: Event) => {
    e.preventDefault();

    if (userInfo) {
      setVisibleComfirmModal(true);
    } else {
      window.open('/connect/github');
    }
  };

  const handleClickClaim = () => {
    console.log('claim');
  };

  const handleClickComfirmAndClaim = () => {
    console.log('comfirm and claim');
  };

  useEffect(() => {
    // getUserInfo()
    //   .then(({ status, data }) => {
    //     if (status === 200 && data.err === 0) {
    //       setUserInfo(data.data);
    //     }
    //   })
    //   .catch((err) => {
    //     console.error('get user info', err);
    //   })
    //   .finally(() => {});
  }, []);

  return (
    <>
      <div className={clsx(className)}>
        <button className={clsx(styles.btnLoginWithGihub)} onClick={handleClickLoginWithGithub}>
          <span>Log in with Github</span>
        </button>
      </div>

      <ComfirmModal
        visible={visibleNotEligibleModal}
        title={<ComfirmModalTitleWithCRAB crabQuantity='0' />}
        footer={<ComfirmModalButton disabled={true} text='Claim CRAB' />}
        onCancel={() => setVisibleNotEligibleModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <SnapshotDataSection githubAccount={userInfo?.name || '***'} registrationTime={userInfo?.created_at?.split('T')[0]?.replace(/-/g, '/') || '2021/12/05'} />
          <DestinationSection isNothingToClaim={true} />
        </Space>
      </ComfirmModal>
      <ComfirmModal
        visible={visibleInputDestinationModal}
        title={<ComfirmModalTitleWithCRAB />}
        footer={<ComfirmModalButton disabled={true} text='Claim CRAB' onClick={handleClickClaim} />}
        onCancel={() => setVisibleInputDestinationModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <SnapshotDataSection githubAccount={userInfo?.name || '***'} registrationTime={userInfo?.created_at?.split('T')[0]?.replace(/-/g, '/') || '2021/12/05'} />
          <DestinationSection />
        </Space>
      </ComfirmModal>
      <ComfirmModal
        visible={visibleClaimedModal}
        title={<ComfirmModalTitleWithCRAB />}
        footer={<ComfirmModalButton disabled={true} text='Claim CRAB' />}
        onCancel={() => setVisibleClaimedModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <SnapshotDataSection githubAccount={userInfo?.name || '***'} registrationTime={userInfo?.created_at?.split('T')[0]?.replace(/-/g, '/') || '2021/12/05'} />
          <DestinationSection isClaimed={true} />
        </Space>
      </ComfirmModal>
      <ComfirmModal
        visible={visibleNoneLeftModal}
        title={<ComfirmModalTitleForSorry />}
        onCancel={() => setVisibleNoneLeftModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <SnapshotDataSection githubAccount={userInfo?.name || '***'} registrationTime={userInfo?.created_at?.split('T')[0]?.replace(/-/g, '/') || '2021/12/05'} />
        </Space>
      </ComfirmModal>
      <ComfirmModal
        visible={visibleComfirmModal}
        title={<ComfirmModalTitleForComfirm />}
        footer={<ComfirmModalButton text='Comfirm and Claim CRAB' onClick={handleClickComfirmAndClaim} />}
        onCancel={() => setVisibleComfirmModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <GithubAccountSection account={userInfo?.name || '***'} />
          <DestinationSection comfirmAddress={destinationAddress} />
          <AmountSection />
        </Space>
      </ComfirmModal>
      <ComfirmModal
        visible={visibleCongratulationModal}
        title={<ComfirmModalTitleForCcongratulation />}
        footer={<SocialLinks />}
        onCancel={() => setVisibleCongratulationModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <CongratulationContent subview={subviewLink} />
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
