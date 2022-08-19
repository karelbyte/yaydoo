import { useLocation } from "@remix-run/react";

const ProductCard = (props) => {
  const { product } = props;
  const price = parseFloat(product.price).toFixed(2);

  const location = useLocation();

  const setProductInCart = async () => {
    console.log(props);
  };

  return (
    <div className="flex w-full flex-col bg-white shadow-md xs:mb-6 xs:items-center md:m-4 md:justify-between md:rounded-lg">
      <img className="xs:w-full md:w-56" src={props.product.img} alt="Shoe" />
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
              <button
                onClick={setProductInCart}
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Add to cart
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
