import React from 'react';
import { Modal, Button } from 'antd';
import style from './style.module.scss';
import type { TokenSymbolT } from '../../types';

import CloseIcon from './img/close.svg';
import CloseDarkIcon from './img/close-dark.svg';
import BackIcon from './img/back.svg';

type FooterProps = {
  tokenSymbol: TokenSymbolT;
  onOk?: () => void;
  okText?: string;
  disableOk?: boolean;
};

const Footer = ({
  tokenSymbol,
  onOk,
  okText,
  disableOk,
}: FooterProps) => (
  <Button onClick={onOk} disabled={disableOk} className={`${style.onOkBtn} ${style[tokenSymbol.toLowerCase()]}`}>{okText}</Button>
);

type TitleProps = {
  children: React.ReactNode;
  onBack?: () => void;
};

const Title = ({
  children,
  onBack,
}: TitleProps) => (
  <>
    {onBack && (
      <button onClick={onBack} className={style.onBackBtn}><BackIcon /></button>
    )}
    {children}
  </>
);

type Props = {
  title?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  visible: boolean;
  width?: number;
  onCancel?: () => void;
} & TitleProps & FooterProps;

const Component = ({
  children,
  visible,
  title,
  onBack,
  onCancel,
  disableOk,
  tokenSymbol ='CRAB',
  width = 518,
  okText = 'OK',
  onOk = () => {},
  footer = <Footer disableOk={disableOk} tokenSymbol={tokenSymbol} onOk={onOk} okText={okText} />,
}: Props) => {
  return (
    <Modal
      maskClosable={false}
      destroyOnClose={true}
      visible={visible}
      title={title && <Title onBack={onBack}>{title}</Title>}
      footer={footer}
      width={width}
      closeIcon={title ? <CloseIcon /> : <CloseDarkIcon />}
      onCancel={onCancel}
      className={`${style.main} ${style[tokenSymbol.toLowerCase()]}`}
    >
      {children}
    </Modal>
  );
};

export const FaucetBaseModal = React.memo(Component);
