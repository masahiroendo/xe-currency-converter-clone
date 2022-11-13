import { ChangeEvent, FC, FormEvent, useState } from "react";
import { BsArrowLeftRight } from "react-icons/bs";

import { currencies, currencySymbols } from "./constants";
import ConversionDisplay from "./ConversionDisplay";
import ConversionExampleLists from "./ConversionExampleLists";
import { ConversionApiCallFunctionType, ConvertedDataType } from "./types";

type ConverterProps = {
  conversionApiCall: ConversionApiCallFunctionType;
};

const Converter: FC<ConverterProps> = ({ conversionApiCall }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("JPY");
  const [convertedData, setConvertedData] = useState<ConvertedDataType | null>(
    null
  );

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v === "") {
      setAmount(1);
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

  const checkFormAndCallApiAndUpdateState = async (
    from: string,
    to: string
  ) => {
    if (!checkIfFormIsValid()) {
      return;
    }

    // call exchange api
    const convertedData = await conversionApiCall({ from, to, amount: amount });
    setConvertedData(convertedData);
  };

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    checkFormAndCallApiAndUpdateState(toCurrency, fromCurrency);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    checkFormAndCallApiAndUpdateState(fromCurrency, toCurrency);
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
      <div className="min-h-[25vh] md:w-[1200px] bg-slate-50 shadow-xl hover:shadow-lg duration-200 flex flex-col items-center rounded-xl py-10 mb-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 md:flex-row justify-between items-center"
        >
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

          <button
            type="button"
            className="inline-flex items-center justify-center bg-white duration-500 w-12 h-12 border-2 rounded-full border-blue-400 text-2xl text-blue-400 hover:bg-blue-400 hover:text-white"
            onClick={swapCurrency}
          >
            <BsArrowLeftRight />
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
      <div className="m-10">
        {convertedData && <ConversionDisplay data={convertedData} />}
        {convertedData && (
          <ConversionExampleLists
            rate={convertedData.rate}
            currencyFrom={convertedData.currencyFrom}
            currencyTo={convertedData.currencyTo}
          />
        )}
      </div>
    </>
  );
};

export default Converter;
