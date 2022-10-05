import { FC } from "react";

import { getConversionAmountAndRate } from "./api/exchangerate-api";
import Converter from "./component/Converter";

const App: FC = () => {
  return <Converter conversionApiCall={getConversionAmountAndRate} />;
};

export default App;
