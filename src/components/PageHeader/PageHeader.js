import { useTranslation } from 'react-i18next';
import {
    Container, Row, Col,
    Navbar, Nav, NavDropdown
} from 'react-bootstrap';

import styles from './style.module.scss';
import pageLogo from './img/logo-page.png';
import pageLangImg from './img/lang.png';

const PageHeader = () => {
    const { t, i18n } = useTranslation();

    const handleClickChangeLng = lng => {
        i18n.changeLanguage(lng);
        localStorage.setItem("lng", lng);

        let app = document.getElementsByTagName('body')[0];
        if (lng === 'zh-cn') {
            app.setAttribute('class', 'zh-font');
        } else {
            app.setAttribute('class', '');
        }
    };

    return (
        <div className={styles.headerContainer}>
            <Container>
                <Row>
                    <Col
                        xs={4}
                        sm={5}
                    >
                        <a target="_blank" rel="noopener noreferrer" href='/'>
                            <img alt='page logo' src={pageLogo} className={styles.pageLogo} />
                        </a>
                    </Col>
                    <Col
                        xs={{ span: 6, offset: 2 }}
                        sm={{ span: 5, offset: 2 }}
                    >
                        <Navbar bg="light" expand="sm" className={styles.navBar}>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className={styles.navigators}>
                                    <div><Nav.Link href="#todo" className={styles.pageDocs} >{t('header:docs')}</Nav.Link></div>
                                    <div><Nav.Link href="#todo" className={styles.pageGithub} >{t('header:github')}</Nav.Link></div>
                                    <div><Nav.Link href="#todo" className={styles.pageWhitePaper} >{t('header:whitepaper')}</Nav.Link></div>
                                    <div>
                                        <NavDropdown id="basic-nav-dropdown" className={styles.pageLang}
                                            title={<>
                                                <img alt='page lang' src={pageLangImg} className={styles.pageLangImg} />
                                                <span className={styles.pageLangWord}>{t('header:lang_demo')}</span>
                                            </>}
                                        >
                                            <NavDropdown.Item onClick={() => handleClickChangeLng('en-us')} eventKey="4.1" >{t('header:en')}</NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleClickChangeLng('zh-cn')} eventKey="4.2" >{t('header:zh')}</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};

export default PageHeader;
