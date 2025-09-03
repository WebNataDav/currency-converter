import { useMemo } from 'react';
import { siteConfig } from '@/config/site.config';
import { Title } from '../common/Title/index';
import { formatRate, formatCurrency } from '@/utils/index';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import styles from './styles.module.scss';

interface ResultProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number | null;
  exchangeRate: number | null;
  ratesDate?: string;
  isUsingCachedData?: boolean;
}

const Result: React.FC<ResultProps> = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  exchangeRate,
  ratesDate,
  isUsingCachedData = false
}) => {
  const { isOnline } = useNetworkStatus();

  const inverseRate = useMemo(() =>
    exchangeRate ? 1 / exchangeRate : null
    , [exchangeRate]);

  if (convertedAmount === null || exchangeRate === null) {
    return (
      <div className={styles.wrapper}>
        <Title level={3}>{siteConfig.resultTitle}</Title>
        <div className={styles.placeholder}>
          <p>Enter an amount to see the conversion result</p>
        </div>
      </div>
    );
  }

  const formatCacheDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className={styles.wrapper}>
      <Title level={3}>
        {siteConfig.resultTitle}
      </Title>

      {!isOnline && isUsingCachedData && ratesDate && (
        <div className={styles.cacheNotice}>
          <span className={styles.cacheIcon}>⚠️</span>
          Using cached rates from {formatCacheDate(ratesDate)}
        </div>
      )}

      <div className={styles.currencyResults}>
        <strong className={styles.currencyValue}>
          {formatCurrency(convertedAmount, toCurrency)}
        </strong>
        <p className={styles.currency}>
          {amount} {fromCurrency} =
        </p>
      </div>

      <div className={styles.rateWrapper}>
        <div className={styles.rateInner}>
          <p className={styles.rateTitle}>{siteConfig.exchangeRateTitle}</p>
          <p className={styles.rateValue}>
            1 {fromCurrency} = {formatRate(exchangeRate)} {toCurrency}
          </p>
        </div>
        <div className={styles.rateInner}>
          <p className={styles.rateTitle}>{siteConfig.inverseRateTitle}</p>
          <p className={styles.rateValue}>
            1 {toCurrency} = {inverseRate ? formatRate(inverseRate) : 'N/A'} {fromCurrency}
          </p>
        </div>
      </div>

      <div className={styles.rateInfo}>
        <p className={styles.rateInfoText}>
          {isUsingCachedData ? siteConfig.rateInfoOffline : siteConfig.rateInfo}
        </p>
      </div>
    </div>
  );
};

export default Result;