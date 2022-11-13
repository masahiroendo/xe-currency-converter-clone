export type CurrencyType = {
  symbol: string;
  text: string;
  sign: string;
};

export type ConvertedDataType = {
  rate: number;
  result: number;
  date: Date;
  error: string | null;
  amount: number;
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
};

export type ConversionApiCallFunctionType = (params: {
  from: string;
  to: string;
  amount: number;
}) => Promise<ConvertedDataType>;

export type ConverterProps = {
  conversionApiCall: ConversionApiCallFunctionType;
};
