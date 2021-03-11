import styles from './style.module.scss';

const PageFooter = () => {
    return (
        <div className={styles.footerContainer}>
            <div className={styles.footerContent}>
                <span>Copyright@2021 Crab.Network</span>
            </div>
        </div>
    )
};

export default PageFooter;
