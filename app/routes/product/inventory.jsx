import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import ProductCard from "~/components/productCard";
import { requireUser } from "~/session.server";
import {
  getProductListItems,
  getProductListItemsForUser,
} from "~/models/product.server";

export async function loader({ request }) {
  const user = await requireUser(request);
  const productListItems =
    user.role == "admin"
      ? await getProductListItems()
      : await getProductListItemsForUser({ userId: user.id });
  return json({ productListItems });
}

export default function ProductIndexPage() {
  const { productListItems } = useLoaderData();

  return (
    <div className="flex flex-col">
      <Link to="/product/new" className="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        + New Product
      </Link>
      <div className="flex w-full justify-center">
        <div className="grid w-full grid-cols-5 justify-items-center gap-5">
          {productListItems.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
