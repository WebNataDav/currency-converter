import { useState, useEffect } from 'react';
import { fetchExchangeRates, getAvailableCurrencies } from '@/services/api';
import { ExchangeRates, Currency } from '@/types';
import { getCachedRates, setCachedRates, CachedRates } from '@/utils/localStorage';
import { useNetworkStatus } from './useNetworkStatus';

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { isOnline } = useNetworkStatus();

  const RATES_CACHE_KEY = 'currencyConverterRatesCache';

  useEffect(() => {

    const loadRates = async () => {
      try {
        setLoading(true);
        setError(null);

        const cachedRates = getCachedRates();

        if (!isOnline) {
          const anyCachedRates = localStorage.getItem(RATES_CACHE_KEY);

          if (anyCachedRates) {
            try {
              const parsedRates: CachedRates = JSON.parse(anyCachedRates);
              console.log('Using cached rates (offline mode - may be expired)');
              setRates({
                date: parsedRates.date,
                base: parsedRates.base,
                rates: parsedRates.rates
              });

              const availableCurrencies = getAvailableCurrencies(parsedRates.rates);
              setCurrencies(availableCurrencies);
              setLoading(false);
              return;
            } catch (parseError) {
            }
          }

          throw new Error('Offline - no cached rates available');
        }

        if (cachedRates) {
          console.log('Using cached rates (online mode)');
          setRates({
            date: cachedRates.date,
            base: cachedRates.base,
            rates: cachedRates.rates
          });

          const availableCurrencies = getAvailableCurrencies(cachedRates.rates);
          setCurrencies(availableCurrencies);
          setLoading(false);
          return;
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