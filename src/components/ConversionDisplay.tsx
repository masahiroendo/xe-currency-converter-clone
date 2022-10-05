import { FC } from "react";

import { ConvertedDataType } from "./types";

type ConversionDisplayProps = {
  data: ConvertedDataType;
};

const ConversionDisplay: FC<ConversionDisplayProps> = ({ data }) => {
  if (data.error === "") {
    return (
      <>
        <h4>Couldn't make the conversion</h4>
        <div>{data.error}</div>
      </>
    );
  }

  return (
    <>
      <div>
        Converted amount: {data.result} {data.currency.text}
      </div>
    </>
  );
};

export default ConversionDisplay;
