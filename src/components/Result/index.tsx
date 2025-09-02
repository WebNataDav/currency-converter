import styles from './styles.module.scss';
import { siteConfig } from '@/config/site.config';
import { Title } from '../common/Title/index';
import { formatRate } from '@/utils/index';
import { formatCurrency } from '@/utils/index';

interface ResultProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number | null;
  exchangeRate: number | null;
}

const Result: React.FC<ResultProps> = ({
  amount,
  fromCurrency,
  toCurrency,
  convertedAmount,
  exchangeRate
}) => {
  const inverseRate = exchangeRate ? 1 / exchangeRate : null;

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

  return (
    <div className={styles.wrapper}>
      <Title level={3}>
        {siteConfig.resultTitle}
      </Title>
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
        <p className={styles.rateInfoText}>{siteConfig.rateInfo}</p>
      </div>
    </div>
  )
};

export default Result;