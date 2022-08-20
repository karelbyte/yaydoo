import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import { getProductListItems } from "~/models/product.server";
import { quantityInCart } from "~/models/cart.server";
import ProductCard from "~/components/productCard";
import NavBar from "~/components/navBar";
import PriceFilter from "~/components/priceFilter";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const searchQuery = searchParams.get("search") || "";
  const products = await getProductListItems(searchQuery);
  if (!products) {
    throw new Response("Products not found :(", { status: 404 });
  }
  const itemsInCart = await quantityInCart();
  return json({ products, itemsInCart });
}

export default function Index() {
  const user = useOptionalUser();
  const { products, itemsInCart } = useLoaderData();
  return (
    <main>
      <NavBar itemsQuantity={itemsInCart} user={user} />
      <Form
        method="get"
        className="flex w-full items-center justify-center pt-20"
      >
        <div className="mt-10 grid xs:w-9/12 xs:grid-cols-1 sm:grid-cols-2 md:w-full md:grid-cols-3 lg:w-9/12 lg:grid-cols-4">
          <input
            name="search"
            placeholder="Find by Name or Sku"
            className="border-grey-500 flex-1 rounded-md border-2 px-3 text-lg leading-loose"
          />
        </div>
      </Form>
      <div className="xs:flex xs:flex-col xs:items-center xs:justify-center sm:grid sm:grid-cols-8 sm:items-start justify-center pt-5 w-full">
        <div className="p-10">
          <PriceFilter></PriceFilter>
        </div>
        <div className="col-span-7 grid justify-items-center gap-6 pr-5 xs:w-full xs:grid-cols-1 sm:grid-cols-2 md:w-full md:grid-cols-3 lg:grid-cols-4 ">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
