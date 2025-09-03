import { getCurrencyName, getCurrencySymbol } from './../utils/index';
import { ExchangeRates, Currency } from '@/types';

const API_BASE_URL = 'https://api.frankfurter.app/latest';

export const fetchExchangeRates = async (baseCurrency: string = 'EUR'): Promise<ExchangeRates> => {
  try {
    const response = await fetch(`${API_BASE_URL}?from=${baseCurrency}`);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return {
      date: data.date,
      base: data.base,
      rates: data.rates
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    throw new Error('Unable to fetch exchange rates. Please try again later.');
  }
};

export const getAvailableCurrencies = (rates: Record<string, number>): Currency[] => {
  return Object.keys(rates).map(code => ({
    code,
    name: getCurrencyName(code),
    symbol: getCurrencySymbol(code)
  }));
};