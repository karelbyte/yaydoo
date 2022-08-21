import { useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { useOptionalUser } from "~/utils";
import { getProductListItems } from "~/models/product.server";
import { addToCart, quantityInCart } from "~/models/cart.server";
import ProductCard from "~/components/productCard";
import NavBar from "~/components/navBar";
import { PriceFilter}  from "~/components/priceFilter";
import { Search } from "~/components/search";
import { getUserId } from "~/session.server";

export async function loader({ request, params }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const searchQuery = searchParams.get("search") || "";
  const price = searchParams.get("price") || "";
  const products = await getProductListItems(searchQuery, price);
  if (!products) {
    throw new Response("Products not found :(", { status: 404 });
  }
  const userId = await getUserId(request);
  const itemsInCart = await quantityInCart(userId);
  return json({ products, itemsInCart, price });
}

export async function action({ request }) {
  const form = await request.formData();
  const product = form.get("product");
  const userId = await getUserId(request);
  await addToCart(product, userId);
  return redirect('/')
}

export default function Index() {
  const user = useOptionalUser();
  const { products } = useLoaderData();
  return (
    <main>
      <NavBar user={user} />
      <Search></Search>
      <div className="w-full justify-center pt-5 xs:flex xs:flex-col xs:items-center xs:justify-center sm:grid sm:grid-cols-8 sm:items-start">
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
