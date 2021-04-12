import React, { memo, useRef, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import Parallax from "parallax-js";
import clsx from 'clsx';

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import useBaseUrl from '@docusaurus/useBaseUrl';
import Translate, { translate } from '@docusaurus/Translate';
import BrowserOnly from '@docusaurus/BrowserOnly';

import Animate from '../utils/Animate';
import Divider from '../components/Divider';
import styles from './styles.module.scss';

import crabClawDesktop from './img/crab-claw-desktop.png';
import crabClawMobile from './img/crab-claw-mobile.png';
import crabDesktop from './img/crab-desktop.png';
import crabMobile from './img/crab-mobile.png';
import kusamaDesktop from './img/kusama-desktop.png';
// import kusamaMobile from './img/kusama-mobile.png';
import lockIcon from './img/lock-icon.png';
import saveIcon from './img/save-icon.png';
import cringIcon from './img/cring-icon.png';
import participate01 from './img/participate-01.png';
import participate02 from './img/participate-02.png';
import sloganCNDesktop from './img/slogan-cn-desktop.png';
import sloganCNMobile from './img/slogan-cn-mobile.png';
import sloganENDesktop from './img/slogan-en-desktop.png';
import sloganENMobile from './img/slogan-en-mobile.png';

const isLocaleCN = () => {
  return location.pathname.startsWith('/zh-CN/');
};

const CrabHome = () => {
  const ref = useRef();
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  useEffect(() => {
    if (ref.current) {
      new Parallax(ref.current, {
        hoverOnly: true,
        pointerEvents: true,
      });
    }
  }, [ref]);

  return (
    <Layout
      title={`Home for ${siteConfig.title}`}
      keywords='polkadot kusama darwinia blockchain bridge dapps solidity bitcoin ethereum'
      description='Darwinia Crab network is the canary network for Darwinia. It is the first cross-chain NFT blockchain in the Polkadot ecology, and provides the smart contract solution. Crab is going to participate in the Kusama Parachain Slot Auction.'
    >
      <div className={styles.pageRoot}>
        <Container>
          <div className={styles.sloganDesktop} ref={ref}>
            <div className={styles.parallaxSpace}></div>
            <img data-depth="0.2" alt='...' src={isLocaleCN() ? sloganCNDesktop : sloganENDesktop} className={clsx(styles.sloganTitle, isLocaleCN() ? styles.isCn : '')} />
            <img data-depth="0.1" alt='' src={crabDesktop} className={styles.crabImg} />
          </div>
          <div className={styles.sloganMobile}>
            <img alt='...' src={isLocaleCN() ? sloganCNMobile : sloganENMobile} className={clsx(styles.sloganTitle)} />
            <img alt='...' src={crabMobile} className={styles.crabImg} />
          </div>

          <div className={styles.crabDesc}>
            <Translate
              id='crabnet.description'
              description='Crab Network description'
            >
              {'Darwinia Crab network is the canary network for Darwinia. It is the first cross-chain NFT blockchain in the Polkadot ecology, and provides the smart contract solution. Crab is going to participate in the Kusama Parachain Slot Auction.'}
            </Translate>
          </div>

          <div className={styles.economicModel}>
            <img alt='...' src={crabClawDesktop} className={styles.crabClawDesktop} />
            <img alt='...' src={crabClawMobile} className={styles.crabClawMobile} />
            <div className={styles.contentWrap}>
              <Animate delay={50} className={styles.contentTitle}>
                <Translate
                  id='economic.title'
                  description='Economic model title'
                >
                  {'Economic Model'}
                </Translate>
              </Animate>
              <Animate delay={100} className={styles.contentText}>
                <Translate
                  id='economic.content01'
                  description='Economic model content p1'
                >
                  {'Crab Network is a long-term valuable network. Some RINGs are allocated to Crab Network as backing assets to make it serve as a canary network having real economic incentives and massive gaming theory testing, not just working a testnet.'}
                </Translate>
              </Animate>
              <Animate delay={150} className={styles.contentText}>
                <Translate
                  id='economic.content02'
                  description='Economic model content p2'
                >
                  {'Crab has the same parameters as Darwinia Mainnet, and use the same Staking mechanism and inflation model. Crab’s tokens are CRING and CKTON, the initial supply of CRING is 2000M, and the supply of CKTON is 0.'}
                </Translate>
              </Animate>
              <Animate delay={200} className={styles.btnWrap}>
                <Button className={styles.btnEconomic} href='https://crab.network/zh-CN/docs/crab-tut-validator'>
                  {translate({
                    id: 'economic.btn01',
                    description: 'Economic model first button',
                    message: 'Become a Validator',
                  })}
                </Button>
                <Button className={styles.btnEconomic} href='https://crab.network/zh-CN/docs/crab-tut-nominator'>
                  {translate({
                    id: 'economic.btn02',
                    description: 'Economic model second button',
                    message: 'Become a Nominator',
                  })}
                </Button>
              </Animate>
            </div>
          </div>
        </Container>

        <Divider />
        <div className={styles.kusamaWrap}>
          <Container>
            <Animate delay={50} className={styles.auctionTitle}>
              <span><Translate
                id='kusama.auctionTitle'
                description='Kusama auction title'
              >
                {'Kusama Parachain Slot Auction'}
              </Translate></span>
            </Animate>

            <Animate delay={100} className={styles.crowdloaningSubTitle}>
              <a target="_blank" rel="noopener noreferrer" href={isLocaleCN() ? '/zh-CN/docs/crab-crowdloan' : '/docs/crab-crowdloan'}>
                {translate({
                  id: 'kusama.crowdloaningSubTitle',
                  message: 'Crowdloaning',
                  description: 'Kusama crowdloaning subtitle',
                })}
              </a>
            </Animate>

            <div className={styles.crowdloaningBoxWrap}>
              <Animate delay={150} className={styles.crowdloaningBox}>
                <img alt='...' src={lockIcon} />
                <span><Translate
                  id='kusama.crowloaningLock'
                  description='Kusama crowloaning lock'
                >
                  {'KSM holders lock their tokens on Kusama for a period of time (6, 12 or 24 months) to help Darwinia rent a slot. In return for these KSM holders, participants will receive CRING, NFT, etc. as rewards.'}
                </Translate></span>
              </Animate>
              <Animate delay={200} className={styles.crowdloaningBox}>
                <img alt='...' src={saveIcon} />
                <span><Translate
                  id='kusama.crowloaningSave'
                  description='Kusama crowloaning save'
                >
                  {"Your token lock takes place on the chain in a decentralized manner and will be returned to the holder after the lock-up period, so you don’t have to worry about the security of the token. The user's KSM will not leave their wallet (except for those hosted by the exchange)."}
                </Translate></span>
              </Animate>
              <Animate delay={250} className={styles.crowdloaningBox}>
                <img alt='...' src={cringIcon} />
                <span><Translate
                  id='kusama.crowloaningCring'
                  description='Kusama crowloaning cring'
                >
                  {"CRING is the token of the Crab network. Holding CRINGs can participate in the staking and on-chain governance of the Crab network."}
                </Translate></span>
              </Animate>
            </div>
          </Container>

          <div className={styles.participateWrapMobile}>
            <Container>
              <Animate delay={50} className={styles.participateSubTitle}>
                <span><Translate
                  id='kusama.participateSubTitle'
                  description='Kusama participate subtitle'
                >
                  {'How to participate'}
                </Translate></span>
              </Animate>

              <div className={styles.participateBoxWrap}>
                <Animate delay={100} className={styles.participateBox}>
                  <img alt='...' src={participate01} />
                  <span><Translate
                    id='kusama.participateContent01'
                    description='Kusama participate first content'
                  >
                    {'Prepare your KSMs. If it is in the bond state, the unbond operation must be performed at least 14 days in advance.'}
                  </Translate></span>
                </Animate>
                <Animate delay={150} className={styles.participateBox}>
                  <img alt='...' src={participate02} />
                  <span><Translate
                    id='kusama.participateContent02'
                    description='Kusama participate second content'
                    values={{
                      polkadot: <Link to='https://polkadot.js.org/apps'>polkadot.js.org</Link>,
                      apps: <Link to='https://apps.darwinia.network/'>apps</Link>
                    }}
                  >
                    {'Participate in crowdloaning. After the crowdloaning starts, you can participate in the crowdloaning through {polkadot} and {apps}'}
                  </Translate></span>
                </Animate>
              </div>
            </Container>
          </div>

          <div className={clsx(styles.kusamaCrabBg)}>
            <Container>
              <div className={styles.participateWrapDesktop}>
                <Animate delay={50} className={styles.participateSubTitle}>
                  <span><Translate
                    id='kusama.participateSubTitle'
                    description='Kusama participate subtitle'
                  >
                    {'How to participate'}
                  </Translate></span>
                </Animate>

                <div className={styles.participateBoxWrap}>
                  <Animate delay={100} className={styles.participateBox}>
                    <img alt='...' src={participate01} />
                    <span><Translate
                      id='kusama.participateContent01'
                      description='Kusama participate first content'
                    >
                      {'Prepare your KSMs. If it is in the bond state, the unbond operation must be performed at least 14 days in advance.'}
                    </Translate></span>
                  </Animate>
                  <Animate delay={150} className={styles.participateBox}>
                    <img alt='...' src={participate02} />
                    <span><Translate
                      id='kusama.participateContent02'
                      description='Kusama participate second content'
                      values={{
                        polkadot: <Link to='https://polkadot.js.org/apps'>polkadot.js.org</Link>,
                        apps: <Link to='https://apps.darwinia.network/'>apps</Link>
                      }}
                    >
                      {'Participate in crowdloaning. After the crowdloaning starts, you can participate in the crowdloaning through {polkadot} and {apps}'}
                    </Translate></span>
                  </Animate>
                </div>
              </div>

              <div className={styles.kusamaDesc}>
                <Animate delay={50} className={styles.descTitle}><img alt='...' src={kusamaDesktop} /></Animate>
                <Animate delay={100} className={styles.descContentText}>
                  <Translate
                    id='kusama.descContent01'
                    description='Kusama description first content'
                  >
                    {'Kusama is a multi-chain network. Parachains can be accessed through slots. Parachains and Kusama jointly form an interoperable blockchain network. Kusama guarantees the security of the entire network, while parachains provide a variety of capabilities for the entire network. All parachains must participate in the parachain auction to obtain the right to rent a slot.'}
                  </Translate>
                </Animate>
                <Animate delay={150} className={styles.descContentText}>
                  <Translate
                    id='kusama.descContent02'
                    description='Kusama description second content'
                  >
                    {'The Crab network needs to crowdloan enough KSMs to win the parachain auction. Crab Network chooses to crowdloan KSMs in a trustless way. During Crab’s parachain lease, these KSMs will be “locked” in the Kusama relay chain.'}
                  </Translate>
                </Animate>
                <Button className={styles.btnDesc} href='https://kusama.network/'>
                  <span>
                    {translate({
                      id: 'kusama.descBtn',
                      description: 'Kusama description button',
                      message: 'Read More',
                    })}
                  </span>
                </Button>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </Layout>
  )
};

const CrabHomeWithWrap = () => (
  <BrowserOnly fallback={<div></div>}>
    {() => (<CrabHome />)}
  </BrowserOnly>
);

export default memo(CrabHomeWithWrap);
