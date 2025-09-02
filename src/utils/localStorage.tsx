export interface StoredPreferences {
  amount: string;
  fromCurrency: string;
  toCurrency: string;
  lastUpdated: number;
}

const STORAGE_KEY = 'currencyConverterPreferences';

export const getStoredPreferences = (): StoredPreferences | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return null;
  }
};

export const setStoredPreferences = (preferences: StoredPreferences): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

export const clearStoredPreferences = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
};