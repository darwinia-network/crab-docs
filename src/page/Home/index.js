import {
    Button,
    // Container, Row, Col
} from 'react-bootstrap';

import styles from './style.module.scss';
import { PageHeader } from '../../components/PageHeader';
import { PageFooter } from '../../components/PageFooter';

import mobileCrabImg from './img/mobile-crab.png';
import mobileCrabTitleImg from './img/mobile-crab-title.png';
import mobileCrabCoolImg from './img/mobile-crab-cool.png';
import mobileTokenLockImg from './img/mobile-token-lock.png';
import mobileTokenSaveImg from './img/moble-token-save.png';
import mobileTokenCringImg from './img/mobile-token-cring.png';
import mobileKusamaImg from './img/mobile-kusama.png';

import desktopCrabImg from './img/desktop-crab.png';
import desktopCrabTitleImg from './img/desktop-crab-title.png';
import desktopCrabCoolImg from './img/desktop-crab-cool.png';
import desktopTokenLockImg from './img/desktop-token-lock.png';
import desktopTokenSaveImg from './img/desktop-token-save.png';
import desktopTokenCringImg from './img/desktop-token-cring.png';
import desktopKusamaImg from './img/desktop-kusama.png';
import desktopParticipate01 from './img/participate-content-01.png';
import desktopParticipate02 from './img/participate-content-02.png';

const Home = () => {
    return (
        <div className={styles.container}>
            <PageHeader />

            <div className={styles.constent}>
                <img alt='crab' src={mobileCrabImg} className={styles.crabImg} />
                <img alt='crab title' src={mobileCrabTitleImg} className={styles.crabTitleImg} />
                <img alt='crab' src={desktopCrabImg} className={styles.crabImgDesktop} />
                <img alt='crab title' src={desktopCrabTitleImg} className={styles.crabTitleImgDesktop} />

                <div className={styles.crabNetDesc}>
                    Crab Network (Crab for short) is a Canary Network for Darwinia. The positioning of Crab is similar to Polkadot’s Kusama Network. Expect Chaos is a reasonable expectation
                </div>

                {/* Econmic Model */}

                <div className={`d-sm-none`}>
                    <img alt='crab cool' src={mobileCrabCoolImg} className={styles.crabCoolImg} />

                    <div className={styles.economicTitle}>
                        Economic Model
                    </div>

                    <div className={styles.economicDesc}>
                        <div className={styles.desc1} >Crab will be designed as a long-term testnet, but it cannot be ruled out that it will stop running due to unexpected conditions or failures.Crab is a valuable network. Its purpose is mainly to test and perform various radical experiments, and especially to simulate the real economic environment.</div>
                        <div className={styles.desc2} >Crab’s tokens are CRING and CKTON, with the same parameters as Darwinia Mainnet, and use the same Staking mechanism and inflation model(link). The initial supply of CRING is 2000M, and the supply of CKTON is 0.</div>
                    </div>

                    <Button variant='light' className={styles.readMoreBtn}>
                        <span className={styles.content}>Read More</span>
                    </Button>
                </div>

                <div className='d-none d-sm-flex justify-content-center mt-5'>
                    <img alt='crab cool' src={desktopCrabCoolImg} style={{ width: '50%', height: '857px' }} />
                    <div className='d-flex flex-column justify-content-center align-items-start w-50'>
                        <div className={styles.economicTitle}>
                            Economic Model
                        </div>
                        <div className={styles.economicDesc}>
                            <div className={styles.desc1} >Crab will be designed as a long-term testnet, but it cannot be ruled out that it will stop running due to unexpected conditions or failures.Crab is a valuable network. Its purpose is mainly to test and perform various radical experiments, and especially to simulate the real economic environment.</div>
                            <div className={styles.desc2} >Crab’s tokens are CRING and CKTON, with the same parameters as Darwinia Mainnet, and use the same Staking mechanism and inflation model(link). The initial supply of CRING is 2000M, and the supply of CKTON is 0.</div>
                        </div>
                        <Button variant='light' className={styles.readMoreBtn}>
                            <span className={styles.content}>Read More</span>
                        </Button>
                        <div style={{ height: '30%' }}></div>
                    </div>
                </div>

                <div className={styles.wareShadow}>
                    {/* Parachain Auction */}

                    <div className='d-sm-none'>
                        <div className={styles.parachainAuction}>
                            Parachain Auction
                        </div>
                        <div className={styles.crowdfunding}>
                            Crowdfunding
                        </div>

                        <div className={styles.auctionCard}>
                            <img alt='...' src={mobileTokenLockImg} />
                            <div className={styles.content}>
                                KSM holders lock their tokens on Kusama for a period of time (6, 12 or 24 months) to help Darwinia rent a slot. In return for these KSM holders, participants will receive CRINGs as rewards.
                            </div>
                        </div>
                        <div className={styles.auctionCard}>
                            <img alt='...' src={mobileTokenSaveImg} />
                            <div className={styles.content}>
                                Your token lock takes place on the chain in a decentralized manner and will be returned to the holder after the lock-up period, so you don’t have to worry about the security of the token.
                            </div>
                        </div>
                        <div className={styles.auctionCard}>
                            <img alt='...' src={mobileTokenCringImg} />
                            <div className={styles.content}>
                                CRING is the token of the Crab network. Holding CRINGs can participate in the staking and on-chain governance of the Crab network.
                            </div>
                        </div>
                    </div>

                    <div className='d-none d-sm-block'>
                        <div className={styles.parachainAuction}>
                            Parachain Auction
                        </div>
                        <div className={styles.crowdfunding}>
                            Crowdfunding
                        </div>

                        <div className='d-flex justify-content-center align-items-center'>
                            <div className={styles.auctionCard}>
                                <img alt='...' src={desktopTokenLockImg} />
                                <div className={styles.content}>
                                    KSM holders lock their tokens on Kusama for a period of time (6, 12 or 24 months) to help Darwinia rent a slot. In return for these KSM holders, participants will receive CRINGs as rewards.
                                </div>
                            </div>
                            <div className={styles.auctionCard}>
                                <img alt='...' src={desktopTokenSaveImg} />
                                <div className={styles.content}>
                                    Your token lock takes place on the chain in a decentralized manner and will be returned to the holder after the lock-up period, so you don’t have to worry about the security of the token.
                                </div>
                            </div>
                            <div className={styles.auctionCard}>
                                <img alt='...' src={desktopTokenCringImg} />
                                <div className={styles.content}>
                                    CRING is the token of the Crab network. Holding CRINGs can participate in the staking and on-chain governance of the Crab network.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to participate */}

                    <div className='d-sm-none'>
                        <div className={styles.participate}>
                            How to participate
                        </div>

                        <div className={styles.contentBox}>
                            <div className={styles.content}>
                                Prepare your KSMs. If it is in the bond state, the unbond operation must be performed at least seven days in advance.
                            </div>
                        </div>
                        <div className={styles.contentBox}>
                            <div className={styles.content}>
                                Participate in crowdfunding. After the crowdfunding starts, you can participate in the crowdfunding through polkadot.js.org and apps.
                            </div>
                        </div>

                        <div className={styles.kusama}>
                            <img alt='...' src={mobileKusamaImg} className={styles.title} />
                            <div className={styles.content}>
                                Kusama is a multi-chain network. Parachains can be accessed through slots. Parachains and Kusama jointly form an interoperable blockchain network. Kusama guarantees the security of the entire network, while parachains provide a variety of capabilities for the entire network. All parachains must participate in the parachain auction to obtain the right to rent a slot.
                            </div>
                            <div className={styles.content}>
                                The Crab network needs to crowdfund enough KSMs to win the parachain auction. Crab Network chooses to crowdfund KSMs in a trustless way. During Crab’s parachain lease, these KSMs will be “locked” in the Kusama relay chain.
                            </div>
                            <Button variant='light' className={styles.readMoreBtn}>
                                <span className={styles.content}>Read More</span>
                            </Button>
                        </div>
                    </div>

                    <div className={`d-none d-sm-block ${styles.participateZoom}`}>
                        <div className={styles.participate}>
                            How to participate
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div className={styles.contentBox}>
                                <img alt='...' src={desktopParticipate01} />
                                <div className={styles.content}>
                                    Prepare your KSMs. If it is in the bond state, the unbond operation must be performed at least seven days in advance.
                                </div>
                            </div>
                            <div className={styles.contentBox}>
                                <img alt='...' src={desktopParticipate02} />
                                <div className={styles.content}>
                                    Participate in crowdfunding. After the crowdfunding starts, you can participate in the crowdfunding through polkadot.js.org and apps.
                                </div>
                            </div>
                        </div>


                        <div className={styles.kusama}>
                            <img alt='...' src={desktopKusamaImg} />
                            <div className={styles.content}>
                                Kusama is a multi-chain network. Parachains can be accessed through slots. Parachains and Kusama jointly form an interoperable blockchain network. Kusama guarantees the security of the entire network, while parachains provide a variety of capabilities for the entire network. All parachains must participate in the parachain auction to obtain the right to rent a slot.
                            </div>
                            <div className={styles.content}>
                                The Crab network needs to crowdfund enough KSMs to win the parachain auction. Crab Network chooses to crowdfund KSMs in a trustless way. During Crab’s parachain lease, these KSMs will be “locked” in the Kusama relay chain.
                            </div>
                            <Button variant='light' className={styles.readMoreBtn}>
                                <span className={styles.content}>Read More</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <PageFooter />
        </div>
    )
};

export default Home;
