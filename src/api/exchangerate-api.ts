import { ConversionApiCallFunctionType } from "../component/Converter";

type ExchangeApiConvertResponseData = {
  motd: {
    msg: string;
    url: string;
  };
  success: boolean;
  query: { from: string; to: string; amount: number };
  info: { rate: number };
  historical: boolean;
  date: string;
  result: number;
};

// const data = {
//   motd: {
//     msg: "If you or your company use this project or like what we doing, please consider backing us so we can continue maintaining and evolving this project.",
//     url: "https://exchangerate.host/#/donate",
//   },
//   success: true,
//   query: { from: "USD", to: "EUR", amount: 1250 },
//   info: { rate: 0.846659 },
//   historical: true,
//   date: "2021-09-11",
//   result: 1058.324082,
// };

export const getConversionAmountAndRate: ConversionApiCallFunctionType = async (
  params
) => {
  try {
    const response = await fetch(
      `https://api.exchangerate.host/convert?from=${params.from}&to=${params.to}&amount=${params.amount}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ from, to, amount }),
      }
    );
    if (!response.ok) {
      throw Error("Exchangerate api call failed.");
    }

    const data: ExchangeApiConvertResponseData = await response.json();
    console.log(data);
    return {
      rate: data.info.rate,
      result: data.result,
      date: new Date(data.date),
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      rate: 0,
      result: 0,
      date: new Date(),
      error: "Conversion failed. Reason: " + (error as Error).message,
    };
  }
};
