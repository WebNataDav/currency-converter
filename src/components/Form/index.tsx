import { useState, useEffect, useCallback } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import { Currency } from '@/types';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { convertCurrency } from '@/services/currencyConverter';
import { SwitchButton } from '../common/SwitchButton/index';
import Result from '../Result/index';
import { getStoredPreferences, setStoredPreferences, StoredPreferences } from '@/utils/localStorage';
import { debounce } from '@/utils/debounce';
import styles from './styles.module.scss';

const Form: React.FC = () => {
  const [inputAmount, setInputAmount] = useState('1');
  const [calculationAmount, setCalculationAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const { rates, currencies, loading, error, isOnline } = useExchangeRates();

  const debouncedSetCalculationAmount = useCallback(
    debounce((amount: string) => {
      setCalculationAmount(amount);
    }, 250),
    []
  );

  const handleAmountChange = (amount: string) => {
    setInputAmount(amount);
    debouncedSetCalculationAmount(amount);
  };

  useEffect(() => {
    if (currencies.length > 0 && !hasLoadedFromStorage) {
      const savedPreferences = getStoredPreferences();

      if (savedPreferences) {
        setInputAmount(savedPreferences.amount);
        setCalculationAmount(savedPreferences.amount);

        const savedFromCurrency = currencies.find(currency => currency.code === savedPreferences.fromCurrency);
        const savedToCurrency = currencies.find(currency => currency.code === savedPreferences.toCurrency);

        if (savedFromCurrency && savedToCurrency) {
          setFromCurrency(savedFromCurrency);
          setToCurrency(savedToCurrency);
          setHasLoadedFromStorage(true);
          return;
        }
      }

      const usd = currencies.find(currency => currency.code === 'USD');
      const eur = currencies.find(currency => currency.code === 'EUR');

      setFromCurrency(usd || currencies[0]);
      setToCurrency(eur || currencies[1]);
      setHasLoadedFromStorage(true);
    }
  }, [currencies, hasLoadedFromStorage]);

  useEffect(() => {
    if (fromCurrency && toCurrency && hasLoadedFromStorage) {
      const preferences: StoredPreferences = {
        amount: inputAmount,
        fromCurrency: fromCurrency.code,
        toCurrency: toCurrency.code,
        lastUpdated: Date.now()
      };
      setStoredPreferences(preferences);
    }
  }, [inputAmount, fromCurrency, toCurrency, hasLoadedFromStorage]);

  useEffect(() => {
    if (rates && fromCurrency && toCurrency && calculationAmount) {
      try {
        const numericAmount = parseFloat(calculationAmount.replace(',', '.'));
        if (!isNaN(numericAmount)) {
          const result = convertCurrency(
            numericAmount,
            fromCurrency.code,
            toCurrency.code,
            rates
          );
          setConvertedAmount(result.convertedAmount);
          setExchangeRate(result.rate);
        } else {
          setConvertedAmount(null);
          setExchangeRate(null);
        }
      } catch (err) {
        setConvertedAmount(null);
        setExchangeRate(null);
      }
    } else {
      setConvertedAmount(null);
      setExchangeRate(null);
    }
  }, [calculationAmount, fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    if (fromCurrency && toCurrency) {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading currencies...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  if (!fromCurrency || !toCurrency) {
    return <div className={styles.loading}>Initializing currencies...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Input
          id="amount"
          label="Amount"
          value={inputAmount}
          onChange={handleAmountChange}
          type="text"
          placeholder="1"
        />
        <div className={styles.currencySelectors}>
          <Select
            label="From"
            value={fromCurrency}
            options={currencies}
            onChange={setFromCurrency}
            disabled={loading}
          />

          <SwitchButton onClick={handleSwap} />

          <Select
            label="To"
            value={toCurrency}
            options={currencies}
            onChange={setToCurrency}
            disabled={loading}
          />
        </div>
      </form>
      <Result
        amount={calculationAmount ? parseFloat(calculationAmount.replace(',', '.')) || 0 : 0}
        fromCurrency={fromCurrency.code}
        toCurrency={toCurrency.code}
        convertedAmount={convertedAmount}
        exchangeRate={exchangeRate}
        ratesDate={rates?.date}
        isUsingCachedData={!isOnline}
      />
    </div>
  );
};

export default Form;

