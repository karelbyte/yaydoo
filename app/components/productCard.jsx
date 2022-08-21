import { Form, useLocation } from "@remix-run/react";

const ProductCard = (props) => {
  const { product } = props;
  const price = parseFloat(product.price).toFixed(2);
  const location = useLocation();

  return (
    <div className="flex w-full flex-col border border-slate-400 bg-white shadow-md xs:mb-6 xs:items-center md:m-4 md:justify-between md:rounded-lg">
      {location.pathname === "/product/inventory" && (
        <Form method="post" action="/product/delete-product">
          <button type="submit" className="left-[430px] top-[70px]">
            <input type="hidden" name="productId" value={product.id} />
            <svg
              className="relative left-32 top-5 h-6 w-6 cursor-pointer"
              fill="red"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </Form>
      )}
      <img className="xs:w-full md:w-56" src={product.img} alt="Shoe" />
      <div className="w-full px-5 pb-5">
        <div className="flex justify-between">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h5>
          <h5 className="tracking-tight text-gray-900 dark:text-white">
            Sku: <b>{product.sku}</b>
          </h5>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">${price}</span>
          {location.pathname === "/product/inventory" ? (
            <span>
              Quantity: <b>{product.quantity}</b>
            </span>
          ) : (
            location.pathname !== "/product/inventory/" && (
              <Form method="post">
                <input type="hidden" name="product" value={product.id} />
                <button
                  type="submit"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Add to cart
                </button>
              </Form>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
