import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';
import {
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
        title={<ComfirmModalTitleForCcongratulation />}
        footer={<ComfirmModalButton onClick={() => setVisibleComfirmModal(false)} disabled={true} />}
        onCancel={() => setVisibleComfirmModal(false)}
      />
    </>
  );
};

export default React.memo<Props>(ClaimAirdrop);
