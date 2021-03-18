import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Button,
    Container,
    Navbar, Nav, NavDropdown
} from 'react-bootstrap';
import { Drawer } from 'antd';

import styles from './style.module.scss';

import logoMobile from './img/logo-mobile.png';
import logoDesktop from './img/logo-desktop.png';

import languageImg from './img/language.png';
import sideBarCloseImg from './img/sidebar-close.png';
import sideBarLogo from './img/sidebar-logo.png';
import sideBarLangImg from './img/sidebar-lang.png';

const SideBar = ({ visible, onClose, onLngChange }) => {
    const { t, i18n } = useTranslation();

    const handleLngClick = () => {
        if (i18n.language && i18n.language.toLowerCase() === 'en-us') {
            onLngChange('zh-cn');
        } else {
            onLngChange('en-us');
        }
    }

    return (
        <div id="basic-navbar-nav">
            <Drawer
                drawerStyle={{ background: 'linear-gradient(315deg, #FF0050 0%, #7000FF 71%, #0027FF 100%)' }}
                placement="right"
                onClose={onClose}
                visible={visible}
                closeIcon={<img alt='...' src={sideBarCloseImg} style={{ height: '16.73px' }} />}
            >
                <div className={styles.sideBarSpace}></div>
                <div className={styles.sideBarContent}>
                    <img alt='sidebar logo' src={sideBarLogo} style={{ width: '160px' }} />
                    <div className={styles.sideBarLink}>
                        <Nav.Link href='/' className={styles.sideBarDocs} >{t('header:docs')}</Nav.Link>
                        <Nav.Link href='/' className={styles.sideBarGithub} >{t('header:github')}</Nav.Link>
                        <Nav.Link href='/' className={styles.sideBarWhitePaper} >{t('header:whitepaper')}</Nav.Link>
                    </div>
                    <Button variant="light" onClick={handleLngClick} className={styles.sideBarLangBtn}>
                        <img alt='...' src={sideBarLangImg} className={styles.sideBarLangImg} />
                        <span className={styles.sideBarLangWord}>{t('header:lang_demo')}</span>
                    </Button>
                </div>
            </Drawer>
        </div>
    )
};

const PageHeader = () => {
    const { t, i18n } = useTranslation();
    const [visibleSideBar, setVisibleSideBar] = useState(false);

    const handleCloseSideBar = () => {
        setVisibleSideBar(false);
    };

    const handleClickShowSideBar = () => {
        setVisibleSideBar(true);
    };

    const handleClickChangeLng = lng => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);

        // let app = document.getElementsByTagName('body')[0];
        // if (lng === 'zh-cn') {
        //     app.setAttribute('class', 'zh-font');
        // } else {
        //     app.setAttribute('class', '');
        // }
    };

    return (
        <>
            <SideBar visible={visibleSideBar} onClose={handleCloseSideBar} onLngChange={handleClickChangeLng} />
            <div className={styles.container}>
                <Container className={styles.containerWrapper}>
                    <div className={styles.row}>
                        <div >
                            <div className={styles.logoMobile}>
                                <a target="_blank" rel="noopener noreferrer" href='/'>
                                    <img alt='...' src={logoMobile} style={{ height: '35px' }} />
                                </a>
                            </div>
                            <div className={styles.logoDesktop}>
                                <a target="_blank" rel="noopener noreferrer" href='/'>
                                    <img alt='...' src={logoDesktop} style={{ height: '50px' }} />
                                </a>
                            </div>
                        </div>
                        <Navbar bg="white" expand="md" className={`${styles.navBar} cs-header`}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleClickShowSideBar} className={styles.toggler} />
                            <Navbar.Collapse className={styles.visibleOnDesktop}>
                                <Nav className={styles.nav}>
                                    <div><Nav.Link href="/" className={styles.docs} >{t('header:docs')}</Nav.Link></div>
                                    <div><Nav.Link href="/" className={styles.github} >{t('header:github')}</Nav.Link></div>
                                    <div><Nav.Link href="/" className={styles.whitePaper} >{t('header:whitepaper')}</Nav.Link></div>
                                    <div>
                                        <NavDropdown id="basic-nav-dropdown" className={styles.lngMenu}
                                            title={<div className={styles.lngMenuTitle}>
                                                <img alt='...' src={languageImg} className={styles.lngImg} />
                                                <span className={styles.lngWord}>{t('header:lang_demo')}</span>
                                            </div>}
                                        >
                                            <NavDropdown.Item onClick={() => handleClickChangeLng('en-us')} eventKey="4.1" >{t('header:en')}</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleClickChangeLng('zh-cn')} eventKey="4.2" >{t('header:zh')}</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </Container>
            </div>
        </>
    )
};

export default PageHeader;
