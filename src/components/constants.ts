import { CurrencyType } from "./types";

export const currencies: CurrencyType[] = [
  { symbol: "USD", text: "US dollar", sign: "$" },
  { symbol: "EUR", text: "Euro", sign: "€" },
  { symbol: "GBP", text: "British Pounds", sign: "£" },
  { symbol: "JPY", text: "Japanese Yen", sign: "¥" },
  { symbol: "CNY", text: "Chinese Yuan Renminbi", sign: "￥" },
  { symbol: "RUB", text: "Russian Rouble", sign: "₽" },
];

export const currencySymbols = currencies.map((c) => c.symbol);
