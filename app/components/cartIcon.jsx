import { Link, useLoaderData } from "@remix-run/react";

const CartIcon = () => {
  const { itemsInCart } = useLoaderData();
  const toUrl = itemsInCart > 0 ? "/cart" : "/";
  return (
    <li className="relative cursor-pointer ">
      <Link to={toUrl}>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        <span className="absolute -top-2 left-3">
          {itemsInCart > 0 && <span className="text-white bg-black rounded-2xl p-1 font-extrabold">{itemsInCart}</span>}
        </span>
      </Link>
    </li>
  );
};

export default CartIcon;
