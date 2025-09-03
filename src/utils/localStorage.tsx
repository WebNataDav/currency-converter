export interface StoredPreferences {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  lastUpdated: number;
}

export interface CachedRates {
  rates: Record<string, number>;
  base: string;
  date: string;
  timestamp: number;
}

const PREFERENCES_KEY = 'currencyConverterPreferences';
const RATES_CACHE_KEY = 'currencyConverterRatesCache';
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

export const getStoredPreferences = (): StoredPreferences | null => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    if (!stored) return null;

    const preferences = JSON.parse(stored);

    if (preferences &&
      typeof preferences.amount === 'string' &&
      typeof preferences.fromCurrency === 'string' &&
      typeof preferences.toCurrency === 'string') {
      return preferences;
    }

    return null;
  } catch (error) {
    console.warn('Failed to read preferences from localStorage:', error);
    return null;
  }
};

export const setStoredPreferences = (preferences: StoredPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save preferences to localStorage:', error);
  }
};

export const getCachedRates = (): CachedRates | null => {
  try {
    const cached = localStorage.getItem(RATES_CACHE_KEY);
    if (!cached) return null;

    const ratesCache: CachedRates = JSON.parse(cached);

    const now = Date.now();
    if (now - ratesCache.timestamp > CACHE_EXPIRY_MS) {
      clearCachedRates();
      return null;
    }

    if (ratesCache && ratesCache.rates && ratesCache.base && ratesCache.date) {
      return ratesCache;
    }

    return null;
  } catch (error) {
    console.warn('Failed to read rates cache from localStorage:', error);
    return null;
  }
};

export const setCachedRates = (rates: Record<string, number>, base: string, date: string): void => {
  try {
    const cache: CachedRates = {
      rates,
      base,
      date,
      timestamp: Date.now()
    };
    localStorage.setItem(RATES_CACHE_KEY, JSON.stringify(cache));
  } catch (error) {
    console.warn('Failed to save rates cache to localStorage:', error);
  }
};

export const clearCachedRates = (): void => {
  try {
    localStorage.removeItem(RATES_CACHE_KEY);
  } catch (error) {
    console.warn('Failed to clear rates cache from localStorage:', error);
  }
};