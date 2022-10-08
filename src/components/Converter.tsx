import { ChangeEvent, FC, FormEvent, useState } from "react";

import { currencies, currencySymbols } from "./constants";
import ConversionDisplay from "./ConversionDisplay";
import ConversionExampleLists from "./ConversionExampleLists";
import { ConversionApiCallFunctionType, ConvertedDataType } from "./types";

type ConverterProps = {
  conversionApiCall: ConversionApiCallFunctionType;
};

const Converter: FC<ConverterProps> = ({ conversionApiCall }) => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("JPY");
  const [convertedData, setConvertedData] = useState<ConvertedDataType | null>(
    null
  );

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") {
      setAmount(0);
      return;
    }

    if (Number.isNaN(v)) {
      return;
    }

    setAmount(parseFloat(v));
  };

  const fromCurrencySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const toCurrencySelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkIfFormIsValid()) {
      return;
    }

    // call exchange api
    const convertedData = await conversionApiCall({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
    setConvertedData(convertedData);
  };

  const checkIfFormIsValid = (): boolean => {
    return (
      amount !== 0 &&
      currencySymbols.includes(fromCurrency) &&
      currencySymbols.includes(toCurrency) &&
      fromCurrency !== toCurrency
    );
  };

  const isFormValid = checkIfFormIsValid();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            name="amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <label htmlFor="fromCurrency">From</label>
          <select
            name="fromCurrency"
            id="fromCurrency"
            value={fromCurrency}
            onChange={fromCurrencySelectHandler}
          >
            {currencies.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.text}
              </option>
            ))}
          </select>

          <button type="button" onClick={swapCurrency}>
            {"<- Change ->"}
          </button>

          <label htmlFor="toCurrency">To</label>
          <select
            name="toCurrency"
            id="toCurrency"
            value={toCurrency}
            onChange={toCurrencySelectHandler}
          >
            {currencies.map((c) => (
              <option key={c.symbol} value={c.symbol}>
                {c.text}
              </option>
            ))}
          </select>
          <button disabled={!isFormValid}>Convert</button>
        </form>
      </div>
      {convertedData && <ConversionDisplay data={convertedData} />}
      {convertedData && (
        <ConversionExampleLists
          rate={convertedData.rate}
          currencyFrom={convertedData.currencyFrom}
          currencyTo={convertedData.currencyTo}
        />
      )}
    </>
  );
};

export default Converter;
