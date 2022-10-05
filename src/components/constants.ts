import { CurrencyType } from "./types";

export const currencies: CurrencyType[] = [
  { symbol: "USD", text: "US dollar" },
  { symbol: "EUR", text: "Euro" },
  { symbol: "JPY", text: "Japanese Yen" },
  { symbol: "CNY", text: "Chinese Yuan Renminbi" },
];

export const currencySymbols = currencies.map((c) => c.symbol);
