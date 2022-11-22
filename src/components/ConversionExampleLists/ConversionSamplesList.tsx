import { FC } from "react";

import { CurrencyType } from "../types";
import { shadowed } from "../../tailwindClasses";
import FormatCurrency from "../FormatCurrency";

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
    <div
      className={`${shadowed} grow rounded-xl flex flex-col justify-center py-6`}
    >
      <div className="text-center pt-6 pb-3 bg-indigo-100 rounded-t-xl">
        <h3 className="text-indigo-800 text-xl font-bold">
          Convert {from.text} to {to.text}{" "}
        </h3>
      </div>
      <table className="table w-full border-collapse">
        <thead className="bg-indigo-100">
          <tr>
            <th className="pb-3">
              {from.flag} {from.symbol}
            </th>
            <th className="pb-3">
              {to.flag} {to.symbol}
            </th>
          </tr>
        </thead>
        <tbody>
          {amounts.map((amount) => {
            return (
              <tr className="text-center">
                <td className="py-3 text-blue-600">
                  <FormatCurrency
                    amount={amount}
                    text={from.symbol}
                    precision={0}
                  />
                </td>
                <td className="py-3">
                  <FormatCurrency
                    amount={amount * rate}
                    text={to.symbol}
                    precision={toPrecision}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ConversionSamplesList;
