import { useState } from "react";

const PriceFilter = (props) => {
  const [price, setPrice] = useState(200);
  return (
    <div>
      <label
        htmlFor="small-range"
        className="mb-2 flex justify-between  text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span> Price</span>
        <span className="text-sky-600">$ {price}</span>
      </label>
      <input
        id="small-range"
        type="range"
        min="200"
        max="5000"
        onChange={(event) => {
          setPrice(event.target.value);
        }}
        value={price}
        className="range-sm mb-6 h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      ></input>
      <label
        htmlFor="small-range"
        className="mb-2 flex justify-between  text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span>200</span>
        <span>5000</span>
      </label>
    </div>
  );
};

export default PriceFilter;
