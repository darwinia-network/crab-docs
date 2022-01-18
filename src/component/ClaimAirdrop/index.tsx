import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.scss';

type Props = {
  className?: string;
}

const ClaimAirdrop: React.FC<Props> = ({ className }) => {
  const handleClickLoginWithGithub = (e: Event) => {
    e.preventDefault();
  }

  return (
    <div className={clsx(className)}>
      <button className={clsx(styles.btnLoginWithGihub)} onClick={handleClickLoginWithGithub}>
        <span>Log in with Github</span>
      </button>
    </div>
  );
};

export default React.memo<Props>(ClaimAirdrop);
