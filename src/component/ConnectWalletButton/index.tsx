import React, { useRef, useState } from "react";
import clsx from "clsx";

import { Modal, Button, notification } from "antd";
import detectEthereumProvider from "@metamask/detect-provider";

import styles from "./styles.module.scss";

interface AddEthereumChainParameter {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

const chainsParameter: AddEthereumChainParameter[] = [
  {
    chainId: "0x2c",
    chainName: "Crab Smart Chain",
    nativeCurrency: {
      name: "CRAB",
      symbol: "CRAB",
      decimals: 18,
    },
    rpcUrls: ["https://crab-rpc.darwinia.network/"],
    blockExplorerUrls: ["https://crab.subscan.io/"],
  },
  {
    chainId: "0x2b",
    chainName: "Pangolin Smart Chain",
    nativeCurrency: {
      name: "PRING",
      symbol: "PRING",
      decimals: 18,
    },
    rpcUrls: ["https://pangolin-rpc.darwinia.network/"],
    blockExplorerUrls: ["https://pangolin.subscan.io/"],
  },
];

const ellipsisAddress = (address: string): string => {
  return `${address.substr(0, 6)}...${address.substring(address.length - 4)}`;
};

type Props = {
  className?: string;
};

const ConnectWalletButton: React.FC<Props> = ({ className }) => {
  const provider = useRef();
  const [connected, setConnected] = useState<{
    index: number;
    account: string;
    chainName: string;
  } | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleConnectClick = () => {
    setIsVisible(true);
  };

  const handleSelectChainClick = async (index: number) => {
    if (!provider.current) {
      provider.current = await detectEthereumProvider();
    }

    if (provider.current) {
      const chainParameter = chainsParameter[index];
      try {
        const ret = await provider.current.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainParameter.chainId }],
        });
        if (!ret) {
          const accounts = await provider.current.request({
            method: "eth_requestAccounts",
          });
          setConnected({
            index,
            account: accounts[0],
            chainName: chainParameter.chainName,
          });
        }
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            const ret = await provider.current.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: chainParameter.chainId,
                  chainName: chainParameter.chainName,
                  nativeCurrency: chainParameter.nativeCurrency,
                  rpcUrls: [...chainParameter.rpcUrls],
                  blockExplorerUrls: [...chainParameter.blockExplorerUrls],
                },
              ],
            });
            if (!ret) {
              const accounts = await provider.current.request({
                method: "eth_requestAccounts",
              });
              setConnected({
                index,
                account: accounts[0],
                chainName: chainParameter.chainName,
              });
            }
          } catch (addError) {
            notification.error({
              message: "Oops, something wrong",
              description: (addError as Error).message,
            });
          }
        } else {
          notification.error({
            message: "Oops, something wrong",
            description: (switchError as Error).message,
          });
        }
      }
    } else {
      notification.info({
        message: "Oops, something is not quite right.",
        description: (
          <p>
            It looks like MetaMask hasn't been installed. Please{" "}
            <a target="_blank" rel="noopener noreferrer" href="https://metamask.io/download.html">
              install MetaMask
            </a>{" "}
            and try again.
          </p>
        ),
      });
    }
  };

  return (
    <>
      <Modal
        visible={isVisible}
        title={<div className={styles.chainSelectModalTitle}>Please select a network to connect:</div>}
        footer={null}
        onCancel={() => setIsVisible(false)}
        className={styles.chainSelectModal}
      >
        <ul className={styles.chainSelectList}>
          {chainsParameter.map((chain, index) => (
            <li key={index}>
              {connected && connected.index === index ? (
                <span className={styles.chainSelected}>
                  Connected to {connected.chainName}: {ellipsisAddress(connected.account)}
                </span>
              ) : (
                <button className={styles.chainSelectBtn} onClick={() => handleSelectChainClick(index)}>
                  <span>{chain.chainName}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </Modal>
      <button className={clsx(styles.mainBtn, className)} onClick={handleConnectClick}>
        <span>Connect Wallet</span>
      </button>
    </>
  );
};

export default React.memo<Props>(ConnectWalletButton);
