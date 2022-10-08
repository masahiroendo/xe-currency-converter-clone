import { FC } from "react";

import { ConvertedDataType } from "./types";

type ConversionDisplayProps = {
  data: ConvertedDataType;
};

const ConversionDisplay: FC<ConversionDisplayProps> = ({ data }) => {
  if (data.error === "") {
    return (
      <>
        <h4>Couldn't make the conversion</h4>
        <div>{data.error}</div>
      </>
    );
  }

  const fromPrecision: number = data.rate >= 1 ? 8 : 3;
  const toPrecision: number = data.rate >= 1 ? 3 : 8;

  return (
    <>
      <h4>
        {data.amount} {data.currencyFrom.text} =
      </h4>
      <h2>
        {data.result} {data.currencyTo.text}
      </h2>
      <div>
        1 {data.currencyFrom.symbol} = {data.rate.toFixed(toPrecision)}{" "}
        {data.currencyTo.symbol}
      </div>
      <div>
        1 {data.currencyTo.symbol} = {(1 / data.rate).toFixed(fromPrecision)}{" "}
        {data.currencyFrom.symbol}
      </div>
    </>
  );
};

export default ConversionDisplay;
