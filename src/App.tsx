import { FC } from "react";

import { getConversionAmountAndRate } from "./api/exchangerate-api";
import Converter from "./components/Converter";

const App: FC = () => {
  return <Converter conversionApiCall={getConversionAmountAndRate} />;
};

export default App;
