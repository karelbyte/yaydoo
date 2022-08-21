
import { Form, useSubmit, useLoaderData  } from "@remix-run/react";

export const PriceFilter = () => {
  const submit = useSubmit();
  const { price } = useLoaderData();
  function handleChange(event) {
    submit(event.currentTarget, { replace: false });
  }

  return (
    <Form method="get" onChange={handleChange} action="?">
      <label
        htmlFor="small-range"
        className="mb-2 flex justify-between  text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span>Price</span>
        <span className="text-sky-600">$ {price}</span>
      </label>
      <input
        name="price"
        id="small-range"
        type="range"
        min="100"
        max="5000"
        defaultValue="100"
        className="range-sm mb-6 h-1 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      ></input>
      <label
        htmlFor="small-range"
        className="mb-2 flex justify-between  text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span>100</span>
        <span>5000</span>
      </label>
    </Form>
  );
};
