import { useState, useEffect } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import { Currency } from '@/types';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { convertCurrency } from '@/services/currencyConverter';
import { SwitchButton } from '../common/SwitchButton/index';

import styles from './styles.module.scss';

const Form: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<Currency | null>(null);
  const [toCurrency, setToCurrency] = useState<Currency | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  const { rates, currencies, loading, error } = useExchangeRates();

  useEffect(() => {
    if (currencies.length > 0 && !fromCurrency && !toCurrency) {
      const usd = currencies.find(c => c.code === 'USD');
      const eur = currencies.find(c => c.code === 'EUR');

      setFromCurrency(usd || currencies[0]);
      setToCurrency(eur || currencies[1]);
    }
  }, [currencies, fromCurrency, toCurrency]);

  useEffect(() => {
    if (rates && fromCurrency && toCurrency && amount) {
      try {
        const numericAmount = parseFloat(amount.replace(',', '.'));
        if (!isNaN(numericAmount)) {
          const result = convertCurrency(
            numericAmount,
            fromCurrency.code,
            toCurrency.code,
            rates
          );
          setConvertedAmount(result.convertedAmount);
          setExchangeRate(result.rate);
        }
      } catch (err) {
        setConvertedAmount(null);
        setExchangeRate(null);
      }
    }
  }, [amount, fromCurrency, toCurrency, rates]);

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
    <form className={styles.form}>
      <Input
        id="amount"
        label="Amount"
        value={amount}
        onChange={setAmount}
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
  )
};

export default Form;