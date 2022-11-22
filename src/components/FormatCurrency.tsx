import accounting from "accounting";
import { FC } from "react";

type FormatCurrencyProps = {
  amount: number;
  text: string;
  precision?: number;
};

const FormatCurrency: FC<FormatCurrencyProps> = ({
  amount,
  text,
  precision = 2,
}) => {
  const formattedAmount = accounting.formatMoney(amount, {
    symbol: text,
    format: "%v %s",
    decimal: ".",
    precision,
    thousand: ",",
  });
  return <span>{formattedAmount}</span>;
};

export default FormatCurrency;
