import { CurrencyType } from "./types";

export const currencies: CurrencyType[] = [
  { symbol: "USD", text: "US dollar", sign: "$", flag: "🇺🇸" },
  { symbol: "EUR", text: "Euro", sign: "€", flag: "🇪🇺" },
  { symbol: "GBP", text: "British Pounds", sign: "£", flag: "🇬🇧" },
  { symbol: "JPY", text: "Japanese Yen", sign: "¥", flag: "🇯🇵" },
  { symbol: "CNY", text: "Chinese Yuan Renminbi", sign: "￥", flag: "🇨🇳" },
  { symbol: "RUB", text: "Russian Rouble", sign: "₽", flag: "🇷🇺" },
];

export const currencySymbols = currencies.map((c) => c.symbol);
