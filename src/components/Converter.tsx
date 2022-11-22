import { ChangeEvent, FC, FormEvent, useState } from "react";
import Select, { SingleValue } from "react-select";
import { BsArrowLeftRight, BsInfoCircle } from "react-icons/bs";

import { currencies, currencySymbols } from "./constants";
import ConversionDisplay from "./ConversionDisplay";
import ConversionExampleLists from "./ConversionExampleLists";
import { ConversionApiCallFunctionType, ConvertedDataType } from "./types";
import {
  findCurrencyFromSymbol,
  unknownCurrency,
} from "../api/exchangerate-api";
import { mainContainer, tablesContainer } from "../tailwindClasses";

type ConverterProps = {
  conversionApiCall: ConversionApiCallFunctionType;
};

const labelStyle = "mb-3 block font-bold";

const Converter: FC<ConverterProps> = ({ conversionApiCall }) => {
  const [amount, setAmount] = useState<number>(1);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [convertedData, setConvertedData] = useState<ConvertedDataType | null>(
    null
  );
  const [fromSign, setFromSign] = useState("");

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

  const updateFromCurrencySign = (symbol: string): void => {
    const newCurrency = findCurrencyFromSymbol(symbol);
    setFromSign(() => newCurrency.sign);
  };

  const fromCurrencySelectHandler = (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    if (!option) {
      return;
    }
    setFromCurrency(() => option.value);
    updateFromCurrencySign(option.value);
  };

  const toCurrencySelectHandler = (
    option: SingleValue<{ label: string; value: string }>
  ) => {
    if (!option) {
      return;
    }
    setToCurrency(option.value);
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
    setConvertedData(() => convertedData);
  };

  const swapCurrency = () => {
    setFromCurrency(() => toCurrency);
    setToCurrency(() => fromCurrency);
    updateFromCurrencySign(toCurrency);
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
      fromCurrency !== toCurrency &&
      !!fromCurrency &&
      !!toCurrency
    );
  };

  const getReactSelectValueFromSymbol = (
    symbol: string
  ): { label: string; value: string } | null => {
    const curr = findCurrencyFromSymbol(symbol);
    if (curr === unknownCurrency) {
      return null;
    }
    return {
      label: `${curr.flag} ${curr.text}`,
      value: curr.symbol,
    };
  };

  const isFormValid = checkIfFormIsValid();
  const options = currencies.map((c) => ({
    label: `${c.flag} ${c.text}`,
    value: c.symbol,
  }));
  return (
    <>
      <div className={`min-h-[25vh] ${mainContainer}`}>
        <form onSubmit={handleSubmit}>
          <div className="max-md:flex max-md:flex-col md:items-center md:grid md:grid-cols-[minmax(100px,_1fr)_minmax(100px,_1fr)_auto_minmax(100px,_1fr)] gap-3">
            <div className="flex flex-col">
              <label className={labelStyle} htmlFor="amount">
                Amount
              </label>
              <div className="flex relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  <button className="p-1 focus:outline-none focus:shadow-outline">
                    <span>{fromSign}</span>
                  </button>
                </span>
                <input
                  className="grow rounded-md font-bold border py-2 pl-7 text-[#6B7280] outline-none duration-200 focus:border-blue-500 focus:shadow-md"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={handleAmountChange}
                />
              </div>
            </div>
            <div>
              <label className={labelStyle} htmlFor="fromCurrency">
                From
              </label>

              <Select
                isSearchable={true}
                options={options}
                value={getReactSelectValueFromSymbol(fromCurrency)}
                onChange={fromCurrencySelectHandler}
                placeholder="Choose from Currency..."
              />
            </div>
            <button
              type="button"
              className="md:self-end inline-flex items-center justify-center max-md:rotate-90 bg-white duration-500 w-12 h-12 border-2 rounded-full border-blue-400 text-2xl text-blue-400 hover:bg-blue-400 hover:text-white"
              onClick={swapCurrency}
            >
              <BsArrowLeftRight />
            </button>

            <div>
              <label className={labelStyle} htmlFor="toCurrency">
                To
              </label>
              <Select
                isSearchable={true}
                options={options}
                value={getReactSelectValueFromSymbol(toCurrency)}
                onChange={toCurrencySelectHandler}
                placeholder="Choose target currency ..."
              />
            </div>
          </div>
          <div className="flex justify-between md:items-end mt-6 max-md:gap-3 max-md:flex-col-reverse">
            <div className="p-2 text-gray-500 bg-blue-100 text-xs flex justify-center items-center gap-3 max-w-[480px] rounded">
              <BsInfoCircle size={36} />
              <span>
                We use the mid-market rate for our Converter. This is for
                informational purposes only. You won't receive this rate when
                sending money.{" "}
                <a href="/#" className="text-blue-500">
                  Check send rates
                </a>
              </span>
            </div>
            <button
              className="font-bold bg-blue-600 hover:bg-blue-500 active:bg-blue-800 text-white text-md py-3 px-6 rounded-lg disabled:opacity-50 disabled:bg-gray-400"
              disabled={!isFormValid}
            >
              Convert
            </button>
          </div>
        </form>
        {convertedData && <ConversionDisplay data={convertedData} />}
      </div>
      <div className={tablesContainer}>
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
