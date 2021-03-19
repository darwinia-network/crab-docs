import React, { useRef, useEffect } from 'react';
import {
    Button,
    Container
} from 'react-bootstrap';
import Parallax from "parallax-js";
import { useTranslation } from 'react-i18next';

import Animate from '../../utils/Animate';
import Divider from '../../components/Divider';

import '../../locales/i18n';
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
    const ref = useRef();
    const { t, i18n } = useTranslation();

    const DesktopTitleCN = (
        <div data-depth="0.2" className={styles.containerTitleCN}>
            <div className={styles.title}>Crab Network</div>
            <div className={styles.subtitle}>KUSAMA 的跨链枢纽</div>
        </div>
    );

    const DesktopTitleEN = (
        <img data-depth="0.2" alt='...' src={desktopCrabTitleImg} className={styles.crabTitleImgDesktop} />
    );

    useEffect(() => {
        if (ref.current) {
            new Parallax(ref.current, {
                hoverOnly: true,
                pointerEvents: true,
            });
        }
    }, [ref]);

    return (
        <div className={styles.layout}>
            <PageHeader />

            <div className={styles.constent}>

                {/* Title */}
                <Container>
                    {/* Mobile */}
                    <img alt='...' src={mobileCrabImg} className={styles.crabImg} />
                    <img alt='...' src={mobileCrabTitleImg} className={styles.crabTitleImg} />

                    {/* Parallax on desktop */}
                    <div className={styles.parallaxContainer} ref={ref} >
                        <img data-depth="0.1" alt='crab' src={desktopCrabImg} className={styles.crabImgDesktop} />
                        {i18n.language && i18n.language.toLowerCase() === 'zh-cn' ? DesktopTitleCN : DesktopTitleEN}
                    </div>
                </Container>

                {/* CrabNet summary */}
                <Container>
                    <Animate>
                        <div className={styles.crabNetSumary}>
                            {t('home_page:crabnet_sumary')}
                        </div>
                    </Animate>
                </Container>

                {/* Econmic Model */}

                <Container className={styles.visibleOnMobile}>
                    <Animate>
                        <div className='d-flex justify-content-center'>
                            <img alt='crab cool' src={mobileCrabCoolImg} className={styles.crabCoolImg} />
                        </div>
                    </Animate>

                    <Animate delay={50}>
                        <div className='d-flex justify-content-center'>
                            <div className={styles.economicTitle}>
                                {t('home_page:economic_title')}
                            </div>
                        </div >
                    </Animate>

                    <Animate delay={50}>
                        <div className={styles.economicDesc}>
                            <div className={styles.desc1} >{t('home_page:economic_content_p1')}</div>
                            <div className={styles.desc2} >{t('home_page:economic_content_p2')}</div>
                        </div>
                    </Animate>

                    <Animate delay={50}>
                        <div className='d-flex justify-content-center'>
                            <Button variant='light' className={styles.readMoreBtn}
                                href='https://darwinia.network/economic_model/'
                            >
                                <span className={styles.content}>{t("home_page:read_more")}</span>
                            </Button>
                        </div>
                    </Animate>
                </Container>

                <Container >
                    <div className={`${styles.visibleOnDesktop} ${styles.economicWrapper}`}>
                        <Animate>
                            <img alt='...' src={desktopCrabCoolImg} style={{ height: '800px', maxWidth: 'none', marginLeft: '-600px' }} />
                        </Animate>
                        <div className='d-sm-flex flex-sm-column justify-content-sm-center align-items-sm-start'>
                            <Animate delay={100}>
                                <div className={styles.economicTitle}>
                                    {t('home_page:economic_title')}
                                </div>
                            </Animate>
                            <Animate delay={200}>
                                <div className={styles.economicDesc}>
                                    <div className={styles.desc1} >{t('home_page:economic_content_p1')}</div>
                                    <div className={styles.desc2} >{t('home_page:economic_content_p2')}</div>
                                </div>
                            </Animate>
                            <Animate delay={300}>
                                <Button variant='light' className={styles.readMoreBtn}
                                    href='https://darwinia.network/economic_model/'
                                >
                                    <span className={styles.content}>{t("home_page:read_more")}</span>
                                </Button>
                            </Animate>
                            <div style={{ height: '30%' }}></div>
                        </div>
                    </div>
                </Container>

                <div className={styles.visibleOnMobile} style={{ height: '40px' }}></div>

                <div className={styles.wareShadowWrapper}>
                    <Divider />
                    <div className={styles.wareShadow}>
                        {/* Parachain Auction */}

                        <Container className={styles.visibleOnMobile}>
                            <Animate delay={50}>
                                <div className='d-flex justify-content-center'>
                                    <div className={styles.parachainAuction}>
                                        {t("home_page:parachain_auction")}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={50}>
                                <div className='d-flex justify-content-center'>
                                    <div className={styles.crowdfunding}>
                                        {t("home_page:crowdfunding")}
                                    </div>
                                </div>
                            </Animate>

                            <Animate delay={50}>
                                <div className={styles.auctionCard}>
                                    <img alt='...' src={mobileTokenLockImg} />
                                    <div className={styles.content}>
                                        {t("home_page:crowdfunding_content1")}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={50}>
                                <div className={styles.auctionCard}>
                                    <img alt='...' src={mobileTokenSaveImg} />
                                    <div className={styles.content}>
                                        {t("home_page:crowdfunding_content2")}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={50}>
                                <div className={styles.auctionCard}>
                                    <img alt='...' src={mobileTokenCringImg} />
                                    <div className={styles.content}>
                                        {t("home_page:crowdfunding_content3")}
                                    </div>
                                </div>
                            </Animate>
                        </Container>

                        <Container className={`${styles.visibleOnDesktop}`}>
                            <Animate delay={100}>
                                <div className='d-md-flex justify-content-center'>
                                    <div className={styles.parachainAuction}>
                                        {t("home_page:parachain_auction")}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={200}>
                                <div className='d-md-flex justify-content-center'>
                                    <div className={styles.crowdfunding}>
                                        {t("home_page:crowdfunding")}
                                    </div>
                                </div>
                            </Animate>

                            <Animate delay={300}>
                                <div className='d-md-flex' style={{ overflow: 'auto' }}>
                                    <div className={styles.auctionCard}>
                                        <img alt='...' src={desktopTokenLockImg} />
                                        <div className={styles.content}>
                                            {t("home_page:crowdfunding_content1")}
                                        </div>
                                    </div>
                                    <div className={styles.auctionCard} style={{ marginLeft: '20px', marginRight: '20px' }}>
                                        <img alt='...' src={desktopTokenSaveImg} />
                                        <div className={styles.content}>
                                            {t("home_page:crowdfunding_content2")}
                                        </div>
                                    </div>
                                    <div className={styles.auctionCard}>
                                        <img alt='...' src={desktopTokenCringImg} />
                                        <div className={styles.content}>
                                            {t("home_page:crowdfunding_content3")}
                                        </div>
                                    </div>
                                </div>
                            </Animate>
                        </Container>

                        {/* How to participate */}

                        <Container className={styles.visibleOnMobile}>
                            <Animate delay={50}>
                                <div className='d-flex justify-content-center'>
                                    <div className={styles.participate}>
                                        {t('home_page:how_to_participate')}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={50}>
                                <div className={styles.contentBox}>
                                    <div className={styles.content}>
                                        {t('home_page:participate_content1')}
                                    </div>
                                </div>
                            </Animate>
                            <Animate delay={100}>
                                <div className={styles.contentBox}>
                                    {i18n.language && i18n.language.toLowerCase() === 'en-us' ?
                                        <div className={styles.content}>
                                            {t('home_page:participate_content2_0')}
                                            <a target="_blank" rel="noopener noreferrer" href='https://polkadot.js.org/apps'> polkadot.js.org </a>
                                            {t('home_page:and')}
                                            <a target="_blank" rel="noopener noreferrer" href='https://apps.darwinia.network/'> apps </a>
                                        </div> :
                                        <div className={styles.content}>
                                            {t('home_page:participate_content2_0')}
                                            <a target="_blank" rel="noopener noreferrer" href='https://polkadot.js.org/apps'> polkadot.js.org </a>
                                            {t('home_page:and')}
                                            <a target="_blank" rel="noopener noreferrer" href='https://apps.darwinia.network/'> apps </a>
                                            {t('home_page:participate_content2_1')}
                                        </div>
                                    }
                                </div>
                            </Animate>
                        </Container>

                        <div className={`${styles.visibleOnMobile} ${styles.kusama}`}>
                            <Container>
                                <Animate delay={50}>
                                    <div className='d-flex justify-content-center'>
                                        <img alt='...' src={mobileKusamaImg} />
                                    </div>
                                </Animate>
                                <Animate delay={50}>
                                    <div className={styles.content}>
                                        {t('home_page:kusama_p1')}
                                    </div>
                                    <div className={styles.content}>
                                        {t('home_page:kusama_p2')}
                                    </div>
                                </Animate>
                                <Animate delay={50}>
                                    <div className='d-flex justify-content-center'>
                                        <Button variant='light' className={styles.readMoreBtn}
                                            href='https://kusama.network/'
                                        >
                                            <span className={styles.content}>{t('home_page:read_more')}</span>
                                        </Button>
                                    </div>
                                </Animate>
                            </Container>
                        </div>

                        <div className={`${styles.visibleOnDesktop} ${styles.participateZoom}`}>
                            <Container>
                                <Animate delay={100}>
                                    <div className='d-md-flex justify-content-center'>
                                        <div className={styles.participate}>
                                            {t('home_page:how_to_participate')}
                                        </div>
                                    </div>
                                </Animate>

                                <Animate delay={200}>
                                    <div className={styles.contentBoxWrapper}>
                                        <div className={styles.contentBox}>
                                            <img alt='...' src={desktopParticipate01} />
                                            <div className={styles.content}>
                                                {t('home_page:participate_content1')}
                                            </div>
                                        </div>
                                        <div className={styles.contentBox} >
                                            <img alt='...' src={desktopParticipate02} />
                                            {i18n.language && i18n.language.toLowerCase() === 'en-us' ?
                                                <div className={styles.content}>
                                                    {t('home_page:participate_content2_0')}
                                                    <a target="_blank" rel="noopener noreferrer" href='https://polkadot.js.org/apps'> polkadot.js.org </a>
                                                    {t('home_page:and')}
                                                    <a target="_blank" rel="noopener noreferrer" href='https://apps.darwinia.network/'> apps </a>
                                                </div> :
                                                <div className={styles.content}>
                                                    {t('home_page:participate_content2_0')}
                                                    <a target="_blank" rel="noopener noreferrer" href='https://polkadot.js.org/apps'> polkadot.js.org </a>
                                                    {t('home_page:and')}
                                                    <a target="_blank" rel="noopener noreferrer" href='https://apps.darwinia.network/'> apps </a>
                                                    {t('home_page:participate_content2_1')}
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </Animate>

                                <div className={styles.kusama}>
                                    <Animate delay={100}>
                                        <div className='d-md-flex justify-content-center'>
                                            <img alt='...' src={desktopKusamaImg} />
                                        </div>
                                    </Animate>
                                    <Animate delay={200}>
                                        <div className={styles.content}>
                                            {t('home_page:kusama_p1')}
                                        </div>
                                        <div className={styles.content}>
                                            {t('home_page:kusama_p2')}
                                        </div>
                                        <div className='d-md-flex justify-content-center'>
                                            <Button variant='light' className={styles.readMoreBtn}
                                                href='https://kusama.network/'
                                            >
                                                <span className={styles.content}>{t('home_page:read_more')}</span>
                                            </Button>
                                        </div>
                                    </Animate>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

            <PageFooter />
        </div>
    )
};

// const AsyncHome = () => {
//     return (
//         <Suspense fallback={<Spin size='large' style={{ marginTop: '40%' }} /> }>
//             {lazy(() => )}
//         </Suspense>
//     )
// }

export default Home;
