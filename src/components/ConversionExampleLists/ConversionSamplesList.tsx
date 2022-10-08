import { FC } from "react";
import { CurrencyType } from "../types";

const amounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000, 50000];

type ConversionSamplesListProps = {
  from: CurrencyType;
  to: CurrencyType;
  rate: number;
};

const ConversionSamplesList: FC<ConversionSamplesListProps> = ({
  from,
  rate,
  to,
}) => {
  const toPrecision: number = rate >= 1 ? 3 : 8;

  return (
    <>
      <h3>
        Convert {from.text} to {to.text}{" "}
      </h3>
      <div>
        {amounts.map((amount) => {
          return (
            <div key={amount}>
              <span>
                {amount} {from.symbol}{" "}
              </span>
              <span>
                {(amount * rate).toFixed(toPrecision)} {to.symbol}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ConversionSamplesList;
