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
import { ethers } from 'ethers';

const getUserInfo = () => {
  return axios.get('/api/user/info', {
    timeout: 5000,
  });
};

const sendClaimTrans = (address='') => {
  return axios({
    url: '/api/airdrop/transfer',
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    data: `address=${address}`,
  });
};

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [subviewLink, setSubviewLink] = useState('#');
  const [destinationAddress, setDestinationAddress] = useState(null);

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
      if (Number(userInfo.created_at.split('-')[0]) >= 2022) {
        setVisibleNotEligibleModal(true);
      } else {
        setVisibleInputDestinationModal(true);
      }
    } else {
      window.open('/connect/github');
    }
  };

  const handleClickClaim = () => {
    setVisibleInputDestinationModal(false);
    setVisibleComfirmModal(true);
  };

  const handleClickComfirmBack = () => {
    setVisibleComfirmModal(false);
    setVisibleInputDestinationModal(true);
  };

  const handleClickComfirmAndClaim = () => {
    if (destinationAddress) {
      setVisibleComfirmModal(false);
      setVisibleLoadingModal(true);

      sendClaimTrans(destinationAddress)
        .then(({ status, data }) => {
          console.log('claim response', status, data);
          setVisibleLoadingModal(false);
          if (data?.err === 0 && status === 200) {
            setSubviewLink(data?.data?.preview);
            setVisibleCongratulationModal(true);
          } else if (data?.data?.state === 'RECEIVED') {
            setVisibleClaimedModal(true);
          } else if (data?.message === 'All airdrops have ended') {
            setVisibleNoneLeftModal(true);
          }
        })
        .catch((err) => {
          console.error('send claim trans:', err);
        })
        .finally(() => {
          setVisibleLoadingModal(false);
        });
    }
  };

  const handleDestinationInputChange = ({ target: { value: address } }) => {
    setDestinationAddress(address);
  };

  useEffect(() => {
    getUserInfo()
      .then(({ status, data }) => {
        if (status === 200 && data.err === 0 && data?.data) {
          setUserInfo(data.data);
        }
      })
      .catch((err) => {
        console.error('get user info', err);
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
        footer={<ComfirmModalButton disabled={!ethers.utils.isAddress(destinationAddress)} text='Claim CRAB' onClick={handleClickClaim} />}
        onCancel={() => setVisibleInputDestinationModal(false)}
      >
        <Space direction='vertical' size='middle' style={{ width: '100%' }}>
          <SnapshotDataSection githubAccount={userInfo?.name || '***'} registrationTime={userInfo?.created_at?.split('T')[0]?.replace(/-/g, '/') || '2021/12/05'} />
          <DestinationSection onAddressChange={handleDestinationInputChange} isValidAddress={!destinationAddress || ethers.utils.isAddress(destinationAddress)} />
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
        title={<ComfirmModalTitleForComfirm onBack={handleClickComfirmBack} />}
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
