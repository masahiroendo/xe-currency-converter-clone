import { FC } from "react";

import { getConversionAmountAndRate } from "./api/exchangerate-api";
import Converter from "./components/Converter";

const App: FC = () => {
  return (
    <div className="relative">
      <div className="text-white flex flex-col justify-center items-center h-[50vh] md:h-[30vh] bg-hero bg-no-repeat bg-cover">
        <h1 className="text-4xl bold">Currency Converter</h1>
        <h2 className="text-xl bold italic mt-1 mb-8">
          The international unofficial currency Converter
        </h2>
      </div>
      <div className="flex flex-col md:justify-center md:items-center -mt-[80px] mx-4">
        <Converter conversionApiCall={getConversionAmountAndRate} />
      </div>
    </div>
  );
};

export default App;
