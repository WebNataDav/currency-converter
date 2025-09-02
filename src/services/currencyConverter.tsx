import { ExchangeRates } from '@/types';

export const convertCurrency = (
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: ExchangeRates
): { convertedAmount: number; rate: number } => {
  if (fromCurrency === toCurrency) {
    return {
      convertedAmount: amount,
      rate: 1
    };
  }

  const fromRate = rates.rates[fromCurrency];
  const toRate = rates.rates[toCurrency];

  if (!fromRate || !toRate) {
    throw new Error(`Unable to find exchange rates for ${fromCurrency} or ${toCurrency}`);
  }

  const amountInBase = amount / fromRate;
  const convertedAmount = amountInBase * toRate;
  const rate = toRate / fromRate;

  return {
    convertedAmount,
    rate
  };
};