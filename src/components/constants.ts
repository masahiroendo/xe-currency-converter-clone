import { CurrencyType } from "./types";

export const currencies: CurrencyType[] = [
  { symbol: "USD", text: "US dollar", sign: "$", flag: "πΊπΈ" },
  { symbol: "EUR", text: "Euro", sign: "β¬", flag: "πͺπΊ" },
  { symbol: "GBP", text: "British Pounds", sign: "Β£", flag: "π¬π§" },
  { symbol: "JPY", text: "Japanese Yen", sign: "Β₯", flag: "π―π΅" },
  { symbol: "CNY", text: "Chinese Yuan Renminbi", sign: "οΏ₯", flag: "π¨π³" },
  { symbol: "RUB", text: "Russian Rouble", sign: "β½", flag: "π·πΊ" },
];

export const currencySymbols = currencies.map((c) => c.symbol);
