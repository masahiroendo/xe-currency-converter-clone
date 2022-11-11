import { FC } from "react";

import { getConversionAmountAndRate } from "./api/exchangerate-api";
import Converter from "./components/Converter";

const App: FC = () => {
  return (
    <>
      <div className="h-[25vh] flex justify-center items-center bg-hero">
        <h1 className="text-3xl">Currency Converter</h1>
      </div>
      <Converter conversionApiCall={getConversionAmountAndRate} />
    </>
  );
};

export default App;
