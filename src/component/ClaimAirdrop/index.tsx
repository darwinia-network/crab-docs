import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import {
  LoadingModal,
  ComfirmModal,
  ComfirmModalButton,
  ComfirmModalTitleWithCRAB,
  ComfirmModalTitleForSorry,
  ComfirmModalTitleForComfirm,
  ComfirmModalTitleForCcongratulation,
} from './SubComponent';

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const [visibleLoadingModal, setVisibleLoadingModal] = useState(true);
  const [visibleComfirmModal, setVisibleComfirmModal] = useState(false);

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
        title={<ComfirmModalTitleForCcongratulation />}
        footer={<ComfirmModalButton onClick={() => setVisibleComfirmModal(false)} disabled={true} />}
        onCancel={() => setVisibleComfirmModal(false)}
      />
      <LoadingModal
        visible={visibleLoadingModal}
        onCancel={() => setVisibleLoadingModal(false)}
      />
    </>
  );
};

export default React.memo<Props>(ClaimAirdrop);
