import styles from './styles.module.scss';
import { siteConfig } from '@/config/site.config';
import { Title } from '../common/Title/index';

const Result = () => {
  return (
    <div className={styles.wrapper}>
      <Title level={3}>
        {siteConfig.resultTitle}
      </Title>
      <div className={styles.currencyResults}>
        <strong className={styles.currencyValue}>€0.92</strong>
        <p className={styles.currency}>1 USD = </p>
      </div>
      <div className={styles.rateWrapper}>
        <div className={styles.rateInner}>
          <p className={styles.rateTitle}>{siteConfig.exchangeRateTitle}</p>
          <p className={styles.rateValue}>1 USD = 0.920000 EUR</p>
        </div>
        <div className={styles.rateInner}>
          <p className={styles.rateTitle}>{siteConfig.inverseRateTitle}</p>
          <p className={styles.rateValue}>1 EUR = 1.086957 USD</p>
        </div>
      </div>
      <div className={styles.rateInfo}>
        <p className={styles.rateInfoText}>{siteConfig.rateInfo}</p>
      </div>
    </div>
  )
};

export default Result;