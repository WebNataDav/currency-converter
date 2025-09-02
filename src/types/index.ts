export interface Currency {
  code: string;
  name: string;
  symbol?: string;
}

export interface ExchangeRates {
  base: string;
  rates: Record<string, number>;
  date: string;
}

export interface ConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  convertedAmount: number;
  rate: number;
  date: string;
}