export const getCurrencyName = (code: string): string => {
  const currencyNames: Record<string, string> = {
    USD: 'United States Dollar',
    EUR: 'Euro',
    GBP: 'British Pound Sterling',
    JPY: 'Japanese Yen',
    CAD: 'Canadian Dollar',
    AUD: 'Australian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan',
    INR: 'Indian Rupee',
    BRL: 'Brazilian Real',
    RUB: 'Russian Ruble',
    KRW: 'South Korean Won',
    MXN: 'Mexican Peso',
    BGN: 'Bulgarian Lev',
    CZK: 'Czech Koruna',
    DKK: 'Danish Krone',
    HUF: 'Hungarian Forint',
    PLN: 'Polish Zloty',
    RON: 'Romanian Leu',
    SEK: 'Swedish Krona',
    ISK: 'Icelandic Króna',
    NOK: 'Norwegian Krone',
    TRY: 'Turkish Lira',
    HKD: 'Hong Kong Dollar',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli New Shekel',
    MYR: 'Malaysian Ringgit',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    ZAR: 'South African Rand',
  };

  return currencyNames[code] || code;
};

// Helper function to get currency symbols
export const getCurrencySymbol = (code: string): string => {
  const currencySymbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CNY: '¥',
    KRW: '₩',
    RUB: '₽',
    TRY: '₺',
    BRL: 'R$',
  };

  return currencySymbols[code] || code;
};