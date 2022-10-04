import { FC, FormEvent } from "react";

const Converter: FC = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("conversion");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="amount">Amount</label>
        <input id="amount" name="amount" />
        <label htmlFor="FromCurrency">From</label>
        <select name="FromCurrency" id="FromCurrency">
          <option value="USD">US - US dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="JPN">JPY - Japanese Yen</option>
          <option value="CNY">CNY - Chinese Yuan Renminbi</option>
        </select>
        <button type="button">{"<- Change ->"}</button>
        <label htmlFor="ToCurrency">To</label>
        <select name="ToCurrency" id="ToCurrency">
          <option value="USD">US - US dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="JPN">JPY - Japanese Yen</option>
          <option value="CNY">CNY - Chinese Yuan Renminbi</option>
        </select>
        <button>Convert</button>
      </form>
    </div>
  );
};

export default Converter;
