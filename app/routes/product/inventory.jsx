import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";
import ProductCard from "~/components/productCard";
import SellerFilters from "~/components/sellerFilter";
import {
  getProductListItemsForUser,
  getProductListItems,
} from "~/models/product.server";
import { getUsersList } from "~/models/user.server";

export async function loader({ request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  let searchQuery = searchParams.getAll("sellers") || [];
  const user = await requireUser(request);
  const isAdminUser = user.role == "admin";
  let productListItems = [];
  if (user.role == "admin") {
    if (searchQuery.length > 0) {
      searchQuery.push(user.id);
      productListItems = await getProductListItemsForUser({
        users: searchQuery,
      });
    } else {
      productListItems = await getProductListItems();
    }
  } else {
    productListItems = await getProductListItemsForUser({ users: user.id });
  }

  const users = await getUsersList();
  const userToFilter = users
    // .filter((uitem) => uitem.id !== user.id) // exclude current user admin
    .map((uitem) => ({ id: uitem.id, name: uitem.email.split("@")[0] }));
  return json({ productListItems, userToFilter, isAdminUser });
}

export default function ProductIndexPage() {
  const { productListItems, userToFilter, isAdminUser } = useLoaderData();
 // const submit = useSubmit();
  return (
    <div className="flex flex-col">
      <Link
        to="/product/new"
        className="mr-2 mb-2 w-40 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        + New Product
      </Link>
      <div className="flex w-full">
        <div className="w-48 p-3">
          <Link className="text-blue-700 underline" to="/product/inventory">
            Clear filters
          </Link>
          <Form
            className="mt-6"
            method="get"
           // onChange={(e) => submit(e.currentTarget)}
          >
            {isAdminUser &&
              userToFilter.map((user) => (
                <SellerFilters
                  key={user.id}
                  param="sellers"
                  name={user.name}
                  value={user.id}
                />
              ))}
          </Form>
        </div>
        <div className="col-span-8 grid justify-items-center gap-6 pr-5 xs:w-full xs:grid-cols-1 sm:grid-cols-2 md:w-full md:grid-cols-3 lg:grid-cols-4 ">
          {productListItems.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
