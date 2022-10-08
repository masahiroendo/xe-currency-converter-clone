import { FC } from "react";

import { CurrencyType } from "../types";
import ConversionSamplesList from "./ConversionSamplesList";

type ConversionExampleListsProps = {
  rate: number;
  currencyFrom: CurrencyType;
  currencyTo: CurrencyType;
};

const ConversionExampleLists: FC<ConversionExampleListsProps> = ({
  currencyFrom,
  currencyTo,
  rate,
}) => {
  return (
    <>
      <ConversionSamplesList from={currencyFrom} to={currencyTo} rate={rate} />
      <ConversionSamplesList
        from={currencyTo}
        to={currencyFrom}
        rate={1 / rate}
      />
    </>
  );
};

export default ConversionExampleLists;
