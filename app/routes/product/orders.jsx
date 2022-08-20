import { Link } from "@remix-run/react";

export default function OrdePage() {
  return (
    <div className="flex h-full items-center justify-center flex-col">
      <img src="../orders.jpg" alt="Yaydoo Logo" />
      <Link
        to="/product/inventory"
        className="block rounded mt-20 text-lg  text-gray-700 hover:bg-gray-100  md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700"
      >
       Click here Go to <b>inventory</b> to set up your store
      </Link>
    </div>
  );
}
