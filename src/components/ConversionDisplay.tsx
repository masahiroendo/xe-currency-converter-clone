import { FC } from "react";

import { ConvertedDataType } from "./types";
import FormatCurrency from "./FormatCurrency";

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
    <div className="mt-6">
      <p className="font-bold text-md text-gray-500 leading-[1.7]">
        <FormatCurrency amount={data.amount} text={data.currencyFrom.text} />
      </p>
      <p className="font-bold text-3xl text-gray-700 leading-[51px] mb-6">
        <FormatCurrency amount={data.result} text={data.currencyTo.text} />
      </p>
      <div className="text-sm text-gray-600">
        <p>
          1 {data.currencyFrom.symbol} = {data.rate.toFixed(toPrecision)}{" "}
          {data.currencyTo.symbol}
        </p>
        <p>
          1 {data.currencyTo.symbol} = {(1 / data.rate).toFixed(fromPrecision)}{" "}
          {data.currencyFrom.symbol}
        </p>
      </div>
      <div className="text-xs text-gray-500 flex flex-row-reverse">
        <p>
          <>
            <a href="/#" className="text-blue-500">
              {data.currencyFrom.text}
            </a>{" "}
            to{" "}
            <a href="/#" className="text-blue-500">
              {data.currencyTo.text}
            </a>{" "}
            conversion — Last update {new Date().toUTCString()}
          </>
        </p>
      </div>
    </div>
  );
};

export default ConversionDisplay;
