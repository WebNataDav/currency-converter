import React, { useState } from 'react';
import styles from './styles.module.scss';
import Input from '../common/Input';
import Select from '../common/Select';
import { Currency } from '@/types';
import { SwitchButton } from '../common/SwitchButton/index';

const mockCurrencies: Currency[] = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
];

const Form: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState<Currency>(mockCurrencies[0]);
  const [toCurrency, setToCurrency] = useState<Currency>(mockCurrencies[1]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

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
          options={mockCurrencies}
          onChange={setFromCurrency}
        />

        <SwitchButton onClick={handleSwap} />

        <Select
          label="To"
          value={toCurrency}
          options={mockCurrencies}
          onChange={setToCurrency}
        />
      </div>
    </form>
  )
};

export default Form;