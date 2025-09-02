import { useState, useEffect } from 'react';
import { fetchExchangeRates, getAvailableCurrencies } from '@/services/api';
import { ExchangeRates, Currency } from '@/types';

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const exchangeRates = await fetchExchangeRates();
        setRates(exchangeRates);

        const availableCurrencies = getAvailableCurrencies(exchangeRates.rates);
        setCurrencies(availableCurrencies);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refreshRates = async () => {
    try {
      setLoading(true);
      setError(null);
      const exchangeRates = await fetchExchangeRates();
      setRates(exchangeRates);

      const availableCurrencies = getAvailableCurrencies(exchangeRates.rates);
      setCurrencies(availableCurrencies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    rates,
    currencies,
    loading,
    error,
    refreshRates
  };
};