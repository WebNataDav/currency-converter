import { useState, useEffect } from 'react';
import { fetchExchangeRates, getAvailableCurrencies } from '@/services/api';
import { ExchangeRates, Currency } from '@/types';
import { getCachedRates, setCachedRates } from '@/utils/localStorage';
import { useNetworkStatus } from './useNetworkStatus';

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    const loadRates = async () => {
      try {
        setLoading(true);
        setError(null);

        const cachedRates = getCachedRates();

        if (cachedRates && !isOnline) {
          console.log('Using cached rates (offline mode)');
          setRates({
            date: cachedRates.date,
            base: cachedRates.base,
            rates: cachedRates.rates
          });

          const availableCurrencies = getAvailableCurrencies(cachedRates.rates);
          setCurrencies(availableCurrencies);
          return;
        }

        if (!isOnline) {
          throw new Error('Offline - no cached rates available');
        }

        const exchangeRates = await fetchExchangeRates();
        setRates(exchangeRates);

        setCachedRates(exchangeRates.rates, exchangeRates.base, exchangeRates.date);

        const availableCurrencies = getAvailableCurrencies(exchangeRates.rates);
        setCurrencies(availableCurrencies);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        console.error('Failed to load exchange rates:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRates();
  }, [isOnline]);

  const refreshRates = async () => {
    if (!isOnline) {
      setError('Cannot refresh while offline');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const exchangeRates = await fetchExchangeRates();
      setRates(exchangeRates);

      setCachedRates(exchangeRates.rates, exchangeRates.base, exchangeRates.date);

      const availableCurrencies = getAvailableCurrencies(exchangeRates.rates);
      setCurrencies(availableCurrencies);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    rates,
    currencies,
    loading,
    error,
    refreshRates,
    isOnline
  };
};