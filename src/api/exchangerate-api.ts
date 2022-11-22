import { format } from "date-fns";

import { currencies } from "../components/constants";
import {
  ConversionApiCallFunctionType,
  CurrencyType,
} from "../components/types";

type ExchangeApiConvertResponseData = {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  query: { from: string; to: string; amount: number };
  info: { rate: number };
  historical: boolean;
  date: string;
  result: number;
};

export const unknownCurrency = Object.freeze({
  symbol: "N-A",
  text: "N-A",
  sign: "N-A",
});

export const findCurrencyFromSymbol = (symbol: string): CurrencyType => {
  return (
    currencies.find((currency) => currency.symbol === symbol) || unknownCurrency
  );
};

export const getConversionAmountAndRate: ConversionApiCallFunctionType = async (
  params
) => {
  try {
    const date = format(new Date(), "yyyy-MM-dd");
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${params.from}&to=${params.to}&amount=${params.amount}&date=${date}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw Error("Exchangerate api call failed.");
    }

    const data: ExchangeApiConvertResponseData = await response.json();
    return {
      rate: data.info.rate,
      result: data.result,
      date: new Date(data.date),
      error: null,
      amount: params.amount,
      currencyFrom: findCurrencyFromSymbol(params.from),
      currencyTo: findCurrencyFromSymbol(params.to),
    };
  } catch (error) {
    return {
      amount: 0,
      rate: 0,
      result: 0,
      date: new Date(),
      error: "Conversion failed. Reason: " + (error as Error).message,
      currencyFrom: unknownCurrency,
      currencyTo: unknownCurrency,
    };
  }
};
